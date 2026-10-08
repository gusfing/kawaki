/**
 * KAWAKI STUDIOS — AI CHATBOT WIDGET
 * Modern conversational agent inspired by HoopAI / Intercom UI
 */

(function () {
  'use strict';

  // Lead State
  const leadData = {
    name: '',
    email: '',
    company: '',
    scope: '',
    budget: '',
    messages: []
  };

  let recognition = null;
  let isListening = false;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

  
  // Load exit intent popup lazily
  function loadExitPopup() {
    if (document.getElementById('kawaki-exit-popup-script')) return;
    const script = document.createElement('script');
    script.id = 'kawaki-exit-popup-script';
    script.src = '/assets/js/exit-popup.js?v=20261007_light_v1';
    script.defer = true;
    document.body.appendChild(script);
  }
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadExitPopup, { timeout: 3500 });
  } else {
    setTimeout(loadExitPopup, 1000);
  }

  function initChatbot() {
    renderChatbotDOM();
    setupChatEvents();
    initVoiceRecognition();
  }

  /* --------------------------------------------------------------------------
     1. DOM INJECTION
     -------------------------------------------------------------------------- */
  function renderChatbotDOM() {
    if (document.getElementById('kawakiChatLauncher')) return;

    const html = `
      <!-- Floating Center Launcher Pill -->
      <div class="kawaki-chat-launcher-pill" id="kawakiChatLauncher" title="Ask Kawaki AI">
        <div class="launcher-pill-left">
          <span class="launcher-pill-dot"></span>
          <span class="launcher-pill-text">Ask Kawaki AI</span>
        </div>
        <button class="launcher-podcast-quick-btn" id="launcherPodcastQuickBtn" type="button" title="Listen to this page as an audio briefing">
          <span class="podcast-btn-icon" id="launcherPodcastIcon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
            </svg>
          </span>
          <span class="podcast-btn-label" id="launcherPodcastQuickLabel">Page Podcast</span>
          <span class="podcast-bars" id="launcherPodcastBars">
            <span class="pbar"></span>
            <span class="pbar"></span>
            <span class="pbar"></span>
          </span>
        </button>
        <div class="launcher-pill-circle" id="launcherPillBtn" aria-label="Open AI Assistant">
          <svg class="launcher-arrow-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
          <svg class="launcher-close-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>

      <!-- Chat Window -->
      <div class="kawaki-chat-window" id="kawakiChatWindow">
        
        <!-- Header -->
        <div class="kawaki-chat-header">
          <div class="kawaki-chat-header-brand">
            <div class="kawaki-chat-logo-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
              </svg>
            </div>
            <div class="kawaki-chat-title-group">
              <span class="kawaki-chat-title">Kawaki Support</span>
              <span class="kawaki-chat-feature-tag">• AI Agent</span>
            </div>
          </div>

          <div class="kawaki-chat-header-actions">
            <button class="kawaki-chat-minimize-btn" id="kawakiChatMinimizeBtn" title="Minimize Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Pinned Podcast Feature Banner -->
        <div class="kawaki-chat-podcast-hero">
          <div class="podcast-hero-left">
            <span class="podcast-hero-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
              </svg>
            </span>
            <div>
              <div class="podcast-hero-title">Page-to-Podcast (Text to Speech)</div>
              <div class="podcast-hero-desc" id="podcastHeroStatus">Listen to an AI audio briefing of this page</div>
            </div>
          </div>
          <button class="podcast-hero-btn" id="podcastHeroPlayBtn" type="button">
            <span id="podcastHeroBtnLabel">▶ Listen</span>
          </button>
        </div>

        <!-- Messages Feed -->
        <div class="kawaki-chat-messages" id="kawakiChatMessages">
          
          <!-- Default AI Greeting -->
          <div class="kawaki-chat-msg ai">
            <div class="kawaki-chat-msg-text">
              Hi there! I'm Kawaki's Studio AI Agent. **Did you know?** I can turn this entire page into an audio podcast briefing with built-in Text-to-Speech! Tap below or speak to listen.
            </div>
          </div>

          <!-- Quick Suggestions Chips -->
          <div class="kawaki-chat-suggestions" id="kawakiChatSuggestions">
            <button class="kawaki-chat-chip" data-query="Turn this page into a podcast">
              🎧 Turn page into an audio briefing (TTS)
            </button>
            <button class="kawaki-chat-chip" data-query="What are Kawaki's top features and services?">
              What are Kawaki's top AI & web features?
            </button>
            <button class="kawaki-chat-chip" data-query="Tell me about your headless commerce work">
              Tell me about your headless Shopify work
            </button>
            <button class="kawaki-chat-chip" data-query="I want to schedule a discovery call">
              Schedule a 15-minute discovery call
            </button>
            <button class="kawaki-chat-chip" data-query="What is your pricing and project timeline?">
              What is your pricing & timeline?
            </button>
          </div>

        </div>

        <!-- Input Bar Area -->
        <div class="kawaki-chat-input-wrapper">
          <div class="kawaki-chat-input-bar">
            <input type="text" class="kawaki-chat-input" id="kawakiChatInput" placeholder="Message..." autocomplete="off">
            
            <button class="kawaki-chat-tool-btn" id="kawakiChatMicBtn" title="Voice Dictation (Speak)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>

            <button class="kawaki-chat-tool-btn" id="kawakiChatAttachBtn" title="Attach details">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
            </button>

            <button class="kawaki-chat-send-btn" id="kawakiChatSendBtn" title="Send Message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     2. EVENT HANDLING
     -------------------------------------------------------------------------- */
  function setupChatEvents() {
    // Quick Podcast Button on floating launcher
    const quickPodcastBtn = document.getElementById('launcherPodcastQuickBtn');
    if (quickPodcastBtn) {
      quickPodcastBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Don't toggle chat window
        playPagePodcast();
      });
    }

    // Pinned Podcast Hero Button in chat
    const heroPlayBtn = document.getElementById('podcastHeroPlayBtn');
    if (heroPlayBtn) {
      heroPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playPagePodcast();
      });
    }

    const launcher = document.getElementById('kawakiChatLauncher');
    const windowEl = document.getElementById('kawakiChatWindow');
    const minimizeBtn = document.getElementById('kawakiChatMinimizeBtn');
    const input = document.getElementById('kawakiChatInput');
    const sendBtn = document.getElementById('kawakiChatSendBtn');
    const micBtn = document.getElementById('kawakiChatMicBtn');
    const attachBtn = document.getElementById('kawakiChatAttachBtn');
    const suggestions = document.getElementById('kawakiChatSuggestions');

    if (launcher && windowEl) {
      launcher.addEventListener('click', (e) => {
        const isOpen = windowEl.classList.toggle('open');
        launcher.classList.toggle('active', isOpen);
        if (isOpen && input) {
          setTimeout(() => input.focus(), 300);
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && windowEl.classList.contains('open')) {
          windowEl.classList.remove('open');
          launcher.classList.remove('active');
        }
      });

      // Close on click outside window & launcher
      document.addEventListener('click', (e) => {
        if (windowEl.classList.contains('open')) {
          if (!windowEl.contains(e.target) && !launcher.contains(e.target)) {
            windowEl.classList.remove('open');
            launcher.classList.remove('active');
          }
        }
      });
    }

    if (minimizeBtn && windowEl && launcher) {
      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        windowEl.classList.remove('open');
        launcher.classList.remove('active');
      });
    }

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => handleSend());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSend();
        }
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => toggleMic());
    }

    if (attachBtn) {
      attachBtn.addEventListener('click', () => {
        if (input) {
          input.value = "Here is my project outline: ";
          input.focus();
        }
      });
    }

    if (suggestions) {
      suggestions.addEventListener('click', (e) => {
        const chip = e.target.closest('.kawaki-chat-chip');
        if (chip) {
          const query = chip.getAttribute('data-query');
          if (query) {
            suggestions.style.display = 'none';
            sendMessage(query, 'user');
            generateAiResponse(query);
          }
        }
      });
    }
  }

  function handleSend() {
    const input = document.getElementById('kawakiChatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    // Hide suggestions once user sends a message
    const suggestions = document.getElementById('kawakiChatSuggestions');
    if (suggestions) suggestions.style.display = 'none';

    sendMessage(text, 'user');
    generateAiResponse(text);
  }

  function sendMessage(text, sender) {
    const feed = document.getElementById('kawakiChatMessages');
    if (!feed) return;

    leadData.messages.push({ sender, text, timestamp: new Date() });

    let formatted = escapeHtml(text);
    // Parse bold **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Parse newlines
    formatted = formatted.replace(/\n/g, '<br>');
    // Parse links [label](url)
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--kawaki-chat-accent); text-decoration: underline;">$1</a>');

    const msgEl = document.createElement('div');
    msgEl.className = `kawaki-chat-msg ${sender}`;
    msgEl.innerHTML = `<div class="kawaki-chat-msg-text">${formatted}</div>`;
    feed.appendChild(msgEl);
    feed.scrollTop = feed.scrollHeight;
  }

  function showTypingIndicator() {
    const feed = document.getElementById('kawakiChatMessages');
    if (!feed) return null;

    const typingEl = document.createElement('div');
    typingEl.className = 'kawaki-chat-typing';
    typingEl.id = 'kawakiTypingIndicator';
    typingEl.innerHTML = `
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    `;
    feed.appendChild(typingEl);
    feed.scrollTop = feed.scrollHeight;
    return typingEl;
  }

  function removeTypingIndicator() {
    const typingEl = document.getElementById('kawakiTypingIndicator');
    if (typingEl) typingEl.remove();
  }

  /* --------------------------------------------------------------------------
     3. CONVERSATIONAL LOGIC & STUDIO ENGINE
     -------------------------------------------------------------------------- */
  
  
  /* --------------------------------------------------------------------------
     PODCAST TEXT-TO-SPEECH (PAGE-TO-AUDIO) ENGINE
     -------------------------------------------------------------------------- */
  let currentPodcastUtterance = null;
  let isPodcastPlaying = false;

  function generatePodcastScript() {
    const rawTitle = document.title || 'Kawaki Studios';
    const pageTitle = rawTitle.split('—')[0].replace('Kawaki Studios', '').trim() || 'Custom Web Development';
    const mainHeading = document.querySelector('h1') ? document.querySelector('h1').innerText.replace(/[\n\r]+/g, ' ').trim() : 'Custom Web Development and Digital Products';
    const metaTag = document.querySelector('meta[name="description"]');
    const metaDesc = metaTag ? metaTag.getAttribute('content') : '';
    
    // Extract key headings from page
    const headings = Array.from(document.querySelectorAll('main h2, main h3'))
      .map(h => h.innerText.replace(/[\n\r]+/g, ' ').trim())
      .filter(t => t.length > 5 && !t.includes('Menu') && !t.includes('Navigation') && !t.includes('Kawaki Support'))
      .slice(0, 4);

    return 'Welcome to the Kawaki Studios Audio Briefing for ' + pageTitle + '. ' + mainHeading + '. ' + metaDesc + '. Key disciplines and focus areas covered on this page include: ' + headings.join(', ') + '. At Kawaki Studios, we combine strategy, design, and engineering to build durable digital systems that look distinctive, perform reliably, and scale without technical debt. To discuss your project or schedule an architectural consultation, contact our senior team at hello at kawaki studios dot com.';
  }

  function playPagePodcast() {
    if (!('speechSynthesis' in window)) {
      sendMessage("Sorry, your browser does not support the Web SpeechSynthesis API.", 'ai');
      return;
    }

    if (isPodcastPlaying) {
      window.speechSynthesis.cancel();
      isPodcastPlaying = false;
      updatePodcastUI(false);
      return;
    }

    window.speechSynthesis.cancel();
    const script = generatePodcastScript();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('David') || v.name.includes('Alex')));
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.onstart = () => {
      isPodcastPlaying = true;
      updatePodcastUI(true);
    };

    utterance.onend = () => {
      isPodcastPlaying = false;
      updatePodcastUI(false);
    };

    utterance.onerror = () => {
      isPodcastPlaying = false;
      updatePodcastUI(false);
    };

    currentPodcastUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function renderPodcastPlayerCard() {
    const feed = document.getElementById('kawakiChatMessages');
    if (!feed) return;

    const existing = document.getElementById('kawakiPodcastCard');
    if (existing) existing.remove();

    const rawTitle = document.title || 'Kawaki Studios';
    const pageTitle = rawTitle.split('—')[0].replace('Kawaki Studios', '').trim() || 'Executive Audio';

    const card = document.createElement('div');
    card.id = 'kawakiPodcastCard';
    card.className = 'kawaki-podcast-card';
    card.innerHTML = 
      '<div class="podcast-card-left">' +
        '<div class="podcast-icon-bubble">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>' +
        '</div>' +
        '<div>' +
          '<div class="podcast-card-title">' + escapeHtml(pageTitle) + ' Podcast</div>' +
          '<div class="podcast-card-status" id="podcastStatusText">Ready to Play &bull; Text to Speech</div>' +
        '</div>' +
      '</div>' +
      '<button class="podcast-play-btn" id="podcastToggleBtn" type="button">' +
        '<span id="podcastBtnLabel">▶ Play Podcast</span>' +
      '</button>';

    feed.appendChild(card);
    feed.scrollTop = feed.scrollHeight;

    const btn = card.querySelector('#podcastToggleBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        playPagePodcast();
      });
    }
  }

  function updatePodcastUI(playing) {
    const heroStatus = document.getElementById('podcastHeroStatus');
    const heroBtnLabel = document.getElementById('podcastHeroBtnLabel');
    const heroPlayBtn = document.getElementById('podcastHeroPlayBtn');
    const quickBtn = document.getElementById('launcherPodcastQuickBtn');
    const quickLabel = document.getElementById('launcherPodcastQuickLabel');

    if (heroStatus) {
      heroStatus.textContent = playing ? '🔊 Narrating page briefing...' : 'Listen to an AI audio briefing of this page';
    }
    if (heroBtnLabel) {
      heroBtnLabel.textContent = playing ? '⏹ Stop' : '▶ Listen';
    }
    if (heroPlayBtn) {
      if (playing) heroPlayBtn.classList.add('playing');
      else heroPlayBtn.classList.remove('playing');
    }
    if (quickBtn) {
      if (playing) {
        quickBtn.classList.add('playing');
        if (quickLabel) quickLabel.textContent = 'Stop Audio';
      } else {
        quickBtn.classList.remove('playing');
        if (quickLabel) quickLabel.textContent = 'Page Podcast';
      }
    }

    const statusText = document.getElementById('podcastStatusText');
    const btnLabel = document.getElementById('podcastBtnLabel');
    const toggleBtn = document.getElementById('podcastToggleBtn');
    if (statusText) {
      statusText.textContent = playing ? '🔊 Narrating page briefing...' : 'Paused &bull; Text to Speech';
    }
    if (btnLabel) {
      btnLabel.textContent = playing ? '⏹ Stop Podcast' : '▶ Play Podcast';
    }
    if (toggleBtn) {
      if (playing) {
        toggleBtn.classList.add('playing');
      } else {
        toggleBtn.classList.remove('playing');
      }
    }
  }

  function syncChatbotLead() {
    if (!leadData.email) return;
    const conversationSummary = leadData.messages
      .map(m => `[${m.sender}]: ${m.text}`)
      .slice(-8)
      .join('\n');

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: leadData.name || 'Chatbot Visitor',
        email: leadData.email,
        contact: leadData.company || 'AI Chatbot Session',
        service: leadData.scope || 'AI Chatbot Inquiry',
        stage: 'Chatbot Lead',
        budget: leadData.budget || 'Unspecified',
        notes: `Lead captured via AI Chatbot.\n\nRecent Messages:\n${conversationSummary}`,
        slot_date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        slot_time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      })
    }).catch(err => console.warn('Chatbot lead sync notice:', err));
  }

  function generateAiResponse(userText) {
    showTypingIndicator();

    const lower = userText.toLowerCase();
    let reply = "";
    let delay = 600 + Math.random() * 400;

    // Email / Contact capture logic
    const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      leadData.email = emailMatch[0];
      syncChatbotLead();
      reply = `Thanks for sharing your email (${leadData.email})! Our partners at Kawaki Studios will reach out with project architecture notes. What company or brand are you building with?`;
    }
    // Features / Capabilities
    // Podcast / Text-to-Speech intent
    else if (lower.includes('podcast') || lower.includes('text to speech') || lower.includes('tts') || lower.includes('audio') || lower.includes('speech') || lower.includes('listen') || lower.includes('read page')) {
      reply = "🎙️ **Page-to-Podcast (Text-to-Speech) Generated!**\n\nI've generated a conversational audio briefing summarizing this page. Click below to start or pause the audio narration:";
      renderPodcastPlayerCard();
      setTimeout(playPagePodcast, 500);
    }
    // Features / Capabilities
    else if (lower.includes('feature') || lower.includes('top feature') || lower.includes('what can you do')) {
      reply = "Here are Kawaki's top studio features & capabilities:\n\n🎙️ **Page-to-Podcast (Text-to-Speech)**: You can turn any page on this site into a narrated audio briefing! Just tap **'Turn page into a podcast'** below.\n⚡ **Custom Web & Next.js Platforms**: Scalable, high-velocity digital engineering.\n🛍️ **Headless Shopify & Commerce**: Sub-second catalog transitions and custom checkouts.\n🤖 **AI Agents & Automated Workflows**: Deterministic AI pipelines that eliminate operational overhead.\n\nWould you like to listen to the audio briefing for this page?";
    }
      
    // Services / Capabilities
    else if (lower.includes('service') || lower.includes('what do you build') || lower.includes('what do you do')) {
      reply = "We craft end-to-end digital flagship systems: from Next.js web platforms and headless Shopify architectures to 3D product visualizers and brand identity systems. Tell me a bit about what you're looking to create!";
    }
    // Pricing / Cost / Budget
    else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('price') || lower.includes('rate') || lower.includes('budget')) {
      reply = "Our bespoke projects typically start around $10,000 for focused flagship web experiences, and scale to $35,000–$60,000+ for enterprise headless commerce builds and custom 3D web applications. What budget and timeline are you targeting?";
    }
    // Schedule Call / Contact
    else if (lower.includes('call') || lower.includes('schedule') || lower.includes('book') || lower.includes('meeting') || lower.includes('contact')) {
      reply = "You can book a 15-minute intro call directly with our technical partners on our [Contact Page](/contact)! Or feel free to drop your email here and we'll reach out directly.";
    }
    // Case Studies / Work / Portfolio
    else if (lower.includes('case stud') || lower.includes('work') || lower.includes('portfolio') || lower.includes('project')) {
      reply = "You can review our architectural blueprints and concept designs in our [Case Studies Section](/case-studies), including Acme Headless E-commerce and modern web architectures.";
    }
    // Location / Team
    else if (lower.includes('where are you') || lower.includes('location') || lower.includes('team') || lower.includes('based')) {
      reply = "Kawaki Studios is based in New Delhi, engineering custom web platforms, Shopify experiences, and automation systems for clients.";
    }
    // Default fallback
    else {
      reply = "Thanks for reaching out! We build bespoke digital platforms, headless Shopify solutions, and 3D web experiences. Could you share your email or brief project scope so our engineering team can assist you?";
    }

    setTimeout(() => {
      removeTypingIndicator();
      sendMessage(reply, 'ai');
    }, delay);
  }

  /* --------------------------------------------------------------------------
     4. VOICE-TO-TEXT RECOGNITION
     -------------------------------------------------------------------------- */
  function initVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('kawakiChatInput');
        if (input && transcript) {
          input.value = transcript;
          handleSend();
        }
      };

      recognition.onend = () => {
        isListening = false;
        const micBtn = document.getElementById('kawakiChatMicBtn');
        if (micBtn) micBtn.classList.remove('listening');
      };

      recognition.onerror = () => {
        isListening = false;
        const micBtn = document.getElementById('kawakiChatMicBtn');
        if (micBtn) micBtn.classList.remove('listening');
      };
    } catch (e) {
      console.warn('Speech recognition not available:', e);
    }
  }

  function toggleMic() {
    if (!recognition) return;
    const micBtn = document.getElementById('kawakiChatMicBtn');

    if (isListening) {
      recognition.stop();
      isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
    } else {
      try {
        recognition.start();
        isListening = true;
        if (micBtn) micBtn.classList.add('listening');
      } catch (e) {
        console.warn('Mic start failed:', e);
      }
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
