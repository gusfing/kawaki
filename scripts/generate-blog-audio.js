const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { getDb, formatBlogRow, FALLBACK_BLOGS } = require('../lib/db-api-handler.js');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const audioDir = path.resolve(publicDir, 'assets', 'audio', 'blog');
const metadataFile = path.resolve(audioDir, 'metadata.json');
const chunksCacheDir = path.resolve(rootDir, 'scratch', 'audio_chunks');

// Ensure directories exist
fs.mkdirSync(audioDir, { recursive: true });
fs.mkdirSync(chunksCacheDir, { recursive: true });

// Narration text transformation
function extractCleanNarration(article) {
  const title = (article.slug === 'what-is-editorial-engineering')
    ? 'What is Editorial Engineering? The Definitive Guide to Modern Web Craft'
    : (article.title || '');

  let raw = article.content || '';

  // 1. Remove HTML figure & diagram blocks
  raw = raw.replace(/<figure[\s\S]*?<\/figure>/gi, '');
  raw = raw.replace(/<img[^>]*>/gi, '');
  raw = raw.replace(/!\[[^\]]*\]\([^)]*\)/gi, '');

  // 2. Remove markdown tables and summarize
  raw = raw.replace(/\|[^\n]+\|\n\|[-:\s|]+\|\n([\s\S]*?)(?=\n\n|\n[#A-Za-z]|$)/g, (match) => {
    return ' As summarized in the architectural comparison table. ';
  });

  // 3. Remove raw code blocks and convert to spoken technical description
  raw = raw.replace(/```[a-z]*\n([\s\S]*?)```/gi, (match, codeSnippet) => {
    return ' The code implementation establishes explicit types, schema validation, and deterministic runtime boundaries. ';
  });

  // 4. Remove inline code backticks, bold, italic
  raw = raw.replace(/`([^`]+)`/g, '$1');
  raw = raw.replace(/\*\*([^*]+)\*\*/g, '$1');
  raw = raw.replace(/\*([^*]+)\*/g, '$1');

  // 5. Clean markdown links: [Text](url) -> Text
  raw = raw.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 6. Clean blockquotes: >
  raw = raw.replace(/^>\s*/gm, '');

  // 7. Clean horizontal rules
  raw = raw.replace(/^---$/gm, '');

  // 8. Normalize headings: ## Title -> Title.
  raw = raw.replace(/^#{1,6}\s+(.+)$/gm, '\n$1.\n');

  // 9. Clean extra whitespace
  const paragraphs = raw.split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0 && !p.startsWith('Figure ') && !p.startsWith('Fig '));

  // Build clean spoken narration
  const intro = `Welcome to this audio overview from Kawaki Studios. ${title}.`;
  const outro = `Thank you for listening to this technical guide from Kawaki Studios. For complete code specifications, system diagrams, and engineering consultations, visit kawaki.co.in.`;

  const spokenBody = [intro, ...paragraphs, outro].join('\n\n');

  return spokenBody;
}

// Compute deterministic content hash
function computeNarrationHash(text) {
  return crypto.createHash('sha256').update(text.trim(), 'utf8').digest('hex');
}

// Semantic chunking: chunk by paragraphs and sentences safely
function chunkNarration(text, maxChars = 800) {
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  const chunks = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + '\n\n' + para).trim().length <= maxChars) {
      currentChunk = currentChunk ? (currentChunk + '\n\n' + para) : para;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = '';
      }

      // If a single paragraph exceeds maxChars, split at sentence boundaries
      if (para.length > maxChars) {
        const sentences = para.match(/[^.!?]+[.!?]+(\s|$)/g) || [para];
        for (const sent of sentences) {
          if ((currentChunk + ' ' + sent).trim().length <= maxChars) {
            currentChunk = currentChunk ? (currentChunk + ' ' + sent.trim()) : sent.trim();
          } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = sent.trim();
          }
        }
      } else {
        currentChunk = para;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Pollinations API Client
async function generateAudioChunk(text, chunkIndex, totalChunks, apiKey, options = {}) {
  const model = options.model || 'openai/tts-1';
  const voice = options.voice || 'alloy';
  const responseFormat = options.responseFormat || 'mp3';

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model,
      input: text,
      voice,
      response_format: responseFormat
    });

    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const req = https.request({
      hostname: 'gen.pollinations.ai',
      port: 443,
      path: '/v1/audio/speech',
      method: 'POST',
      headers
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const bodyBuffer = Buffer.concat(chunks);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(bodyBuffer);
        } else {
          let errMessage = `HTTP ${res.statusCode}`;
          try {
            const errObj = JSON.parse(bodyBuffer.toString('utf8'));
            if (errObj && errObj.error && errObj.error.message) {
              errMessage += `: ${errObj.error.message}`;
            }
          } catch (e) {
            errMessage += `: ${bodyBuffer.toString('utf8').slice(0, 200)}`;
          }
          reject(new Error(errMessage));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(postData);
    req.end();
  });
}

// Concatenate MP3 segments cleanly (stripping ID3 tags from subsequent chunks if present)
function concatenateMp3Buffers(buffers) {
  if (buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];

  const cleanedBuffers = [];
  for (let i = 0; i < buffers.length; i++) {
    let buf = buffers[i];
    // For chunks after the first, strip ID3v2 header if present (starts with 'ID3')
    if (i > 0 && buf.length > 10 && buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) {
      // ID3v2 header size is encoded in bytes 6-9 as syncsafe integer
      const size = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f);
      const tagSize = 10 + size;
      if (buf.length > tagSize) {
        buf = buf.subarray(tagSize);
      }
    }
    cleanedBuffers.push(buf);
  }

  return Buffer.concat(cleanedBuffers);
}

// Approximate MP3 duration from file size and typical bitrate (128 kbps = 16,000 bytes/sec)
function estimateMp3Duration(buffer, bitrateKbps = 128) {
  const bytesPerSec = (bitrateKbps * 1000) / 8;
  const totalSecs = Math.max(1, Math.round(buffer.length / bytesPerSec));
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return {
    seconds: totalSecs,
    formatted: `${mins}:${secs < 10 ? '0' : ''}${secs}`
  };
}

// Load metadata dictionary
function loadMetadata() {
  if (fs.existsSync(metadataFile)) {
    try {
      return JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

// Save metadata dictionary
function saveMetadata(meta) {
  fs.writeFileSync(metadataFile, JSON.stringify(meta, null, 2), 'utf8');
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const targetSlug = args.find(a => !a.startsWith('--'));
  const isAll = args.includes('--all');
  const isForce = args.includes('--force');

  console.log('=== KAWAKI BLOG AUDIO ENGINE (POLLINATIONS TTS) ===\n');

  // Load articles
  const articles = [];
  try {
    const db = getDb();
    if (db) {
      const rows = db.prepare("SELECT * FROM blogs WHERE status = 'published' ORDER BY id ASC").all();
      for (const r of rows) {
        const formatted = formatBlogRow(r);
        if (formatted) articles.push(formatted);
      }
    }
  } catch (e) {
    if (Array.isArray(FALLBACK_BLOGS)) {
      articles.push(...FALLBACK_BLOGS.filter(b => b.status === 'published'));
    }
  }

  if (articles.length === 0) {
    console.error('No published articles found in database or fallback inventory.');
    process.exit(1);
  }

  console.log(`Loaded ${articles.length} published articles.`);

  // Determine articles to process
  let targets = [];
  if (targetSlug) {
    const found = articles.find(a => a.slug === targetSlug);
    if (!found) {
      console.error(`Article with slug "${targetSlug}" not found.`);
      process.exit(1);
    }
    targets = [found];
  } else if (isAll) {
    targets = articles;
  } else {
    // Default to Blog #15 sample as required
    const sample = articles.find(a => a.slug === 'how-ai-search-engines-cite-sources') || articles[0];
    targets = [sample];
    console.log(`No slug or --all flag specified. Defaulting to sample article: ${sample.slug}`);
  }

  const apiKey = process.env.POLLINATIONS_API_KEY || process.env.POLLEN_API_KEY || null;
  const metadata = loadMetadata();

  console.log('\nPollinations Configuration:');
  console.log('Model:             openai/tts-1');
  console.log('Voice:             alloy (calm, technical, professional)');
  console.log('Endpoint:          POST https://gen.pollinations.ai/v1/audio/speech');
  console.log('API Key Status:    ' + (apiKey ? 'Present (via environment variable)' : 'None (testing public access)'));

  for (const article of targets) {
    const slug = article.slug;
    console.log(`\n------------------------------------------------------------`);
    console.log(`Processing: ${slug}`);

    const narration = extractCleanNarration(article);
    const contentHash = computeNarrationHash(narration);
    const existing = metadata[slug];

    console.log(`Narration Characters: ${narration.length}`);
    console.log(`Content Hash:         ${contentHash.slice(0, 16)}...`);

    if (!isForce && existing && existing.contentHash === contentHash && fs.existsSync(path.resolve(publicDir, existing.audioUrl.replace(/^\//, '')))) {
      console.log(`[SKIP] Audio is current and matches content hash (${existing.durationFormatted}, ${existing.audioUrl}).`);
      continue;
    }

    const chunks = chunkNarration(narration, 800);
    console.log(`Semantic Chunks:      ${chunks.length} chunks (avg ~${Math.round(narration.length / chunks.length)} chars/chunk)`);

    // Perform generation
    const chunkBuffers = [];
    let hasFailure = false;
    let failureError = null;

    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      const chunkHash = crypto.createHash('md5').update(chunkText).digest('hex');
      const chunkCacheFile = path.resolve(chunksCacheDir, `${slug}_chunk_${i}_${chunkHash}.mp3`);

      if (fs.existsSync(chunkCacheFile) && fs.statSync(chunkCacheFile).size > 0 && !isForce) {
        chunkBuffers.push(fs.readFileSync(chunkCacheFile));
        process.stdout.write(`.`);
        continue;
      }

      try {
        console.log(`\n  -> Generating chunk ${i + 1}/${chunks.length} (${chunkText.length} chars)...`);
        const buf = await generateAudioChunk(chunkText, i, chunks.length, apiKey, {
          model: 'openai/tts-1',
          voice: 'alloy',
          responseFormat: 'mp3'
        });
        fs.writeFileSync(chunkCacheFile, buf);
        chunkBuffers.push(buf);
      } catch (err) {
        hasFailure = true;
        failureError = err;
        console.error(`\n[ERROR] Chunk ${i + 1}/${chunks.length} failed: ${err.message}`);
        break;
      }
    }

    if (hasFailure) {
      console.error(`\n❌ Generation aborted for "${slug}": ${failureError.message}`);
      if (!apiKey) {
        console.log(`\nNOTE: Pollinations API returned: "${failureError.message}".`);
        console.log(`An API key is required. Please set POLLINATIONS_API_KEY environment variable to proceed.`);
      }
      return { success: false, error: failureError.message, slug };
    }

    // Concatenate buffers
    const finalBuffer = concatenateMp3Buffers(chunkBuffers);
    const finalMp3Path = path.resolve(audioDir, `${slug}.mp3`);
    fs.writeFileSync(finalMp3Path, finalBuffer);

    const duration = estimateMp3Duration(finalBuffer);
    const audioUrl = `/assets/audio/blog/${slug}.mp3`;

    metadata[slug] = {
      slug,
      title: article.title,
      audioUrl,
      fileSize: finalBuffer.length,
      durationSeconds: duration.seconds,
      durationFormatted: duration.formatted,
      voice: 'alloy',
      model: 'openai/tts-1',
      contentHash,
      generatedAt: new Date().toISOString()
    };

    saveMetadata(metadata);
    console.log(`\n✓ Generated ${audioUrl} (${finalBuffer.length} bytes, ~${duration.formatted})`);
  }

  return { success: true };
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal error:', err.message);
    process.exit(1);
  });
}

module.exports = {
  extractCleanNarration,
  computeNarrationHash,
  chunkNarration,
  generateAudioChunk,
  concatenateMp3Buffers,
  estimateMp3Duration
};
