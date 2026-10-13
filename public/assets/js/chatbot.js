/**
 * KAWAKI STUDIOS — CLIENT CHATBOT & LEAD CONSULTANT
 * Professional interactive studio assistant with comprehensive agency knowledge
 * and automated lead qualification.
 */

(function () {
  'use strict';

  // Lead Qualification State
  const leadState = {
    step: 'IDLE', // IDLE | AWAITING_SERVICE | AWAITING_NAME | AWAITING_EMAIL | AWAITING_DETAILS | COMPLETE
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    notes: '',
    messages: []
  };

  let recognition = null;
  let isListening = false;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

  // Lazy load exit intent popup
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
    setTimeout(loadExitPopup, 1200);
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
      <div class="kawaki-chat-launcher-pill" id="kawakiChatLauncher" title="Chat with Kawaki Studios">
        <div class="launcher-pill-left">
          <span class="launcher-pill-dot"></span>
          <span class="launcher-pill-text">Chat with Us</span>
        </div>
        <div class="launcher-pill-circle" id="launcherPillBtn" aria-label="Open Chat">
          <svg class="launcher-arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg class="launcher-close-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
              <span class="kawaki-chat-title">Kawaki Studios</span>
              <span class="kawaki-chat-feature-tag">• Project Consultant</span>
            </div>
          </div>

          <div class="kawaki-chat-header-actions">
            <button class="kawaki-chat-minimize-btn" id="kawakiChatMinimizeBtn" title="Close Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Feed -->
        <div class="kawaki-chat-messages" id="kawakiChatMessages">
          
          <!-- Default Greeting -->
          <div class="kawaki-chat-msg ai">
            <div class="kawaki-chat-msg-text">
              Hello! 👋 Welcome to **Kawaki Studios**. We are a digital product and engineering studio building bespoke web systems, headless Shopify stores, and custom software.<br><br>How can we assist you today?
            </div>
          </div>

          <!-- Quick Suggestions Chips -->
          <div class="kawaki-chat-suggestions" id="kawakiChatSuggestions">
            <button class="kawaki-chat-chip" data-query="Start a Project">
              💬 Start a Project / Get a Quote
            </button>
            <button class="kawaki-chat-chip" data-query="What services do you offer?">
              🛠️ Services & Capabilities
            </button>
            <button class="kawaki-chat-chip" data-query="Show me your case studies">
              💼 Case Studies & Flagship Work
            </button>
            <button class="kawaki-chat-chip" data-query="What is your pricing and timeline?">
              ⏱️ Timelines & Pricing
            </button>
            <button class="kawaki-chat-chip" data-query="How can I contact you?">
              📅 Book a Consultation
            </button>
          </div>

        </div>

        <!-- Input Bar Area -->
        <div class="kawaki-chat-input-wrapper">
          <div class="kawaki-chat-input-bar">
            <input type="text" class="kawaki-chat-input" id="kawakiChatInput" placeholder="Ask a question or enter your message..." autocomplete="off">
            
            <button class="kawaki-chat-tool-btn" id="kawakiChatMicBtn" title="Voice Dictation (Speak)">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>

            <button class="kawaki-chat-send-btn" id="kawakiChatSendBtn" title="Send Message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
    const launcher = document.getElementById('kawakiChatLauncher');
    const windowEl = document.getElementById('kawakiChatWindow');
    const minimizeBtn = document.getElementById('kawakiChatMinimizeBtn');
    const input = document.getElementById('kawakiChatInput');
    const sendBtn = document.getElementById('kawakiChatSendBtn');
    const micBtn = document.getElementById('kawakiChatMicBtn');
    const suggestions = document.getElementById('kawakiChatSuggestions');

    if (launcher && windowEl) {
      launcher.addEventListener('click', () => {
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

    if (suggestions) {
      suggestions.addEventListener('click', (e) => {
        const chip = e.target.closest('.kawaki-chat-chip');
        if (chip) {
          const query = chip.getAttribute('data-query');
          if (query) {
            suggestions.style.display = 'none';
            sendMessage(query, 'user');
            processUserMessage(query);
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

    const suggestions = document.getElementById('kawakiChatSuggestions');
    if (suggestions) suggestions.style.display = 'none';

    sendMessage(text, 'user');
    processUserMessage(text);
  }

  function sendMessage(text, sender) {
    const feed = document.getElementById('kawakiChatMessages');
    if (!feed) return;

    leadState.messages.push({ sender, text, timestamp: new Date() });

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

  function renderInteractiveOptions(options) {
    const feed = document.getElementById('kawakiChatMessages');
    if (!feed || !options || options.length === 0) return;

    const wrap = document.createElement('div');
    wrap.className = 'kawaki-chat-suggestions';
    wrap.style.marginTop = '0.5rem';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'kawaki-chat-chip';
      btn.innerText = opt.label;
      btn.addEventListener('click', () => {
        wrap.remove();
        sendMessage(opt.label, 'user');
        if (opt.value) {
          processUserMessage(opt.value);
        } else {
          processUserMessage(opt.label);
        }
      });
      wrap.appendChild(btn);
    });

    feed.appendChild(wrap);
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
     3. LEAD SYNCHRONIZATION WITH BACKEND API (/api/leads)
     -------------------------------------------------------------------------- */
  function syncLeadToBackend() {
    if (!leadState.email) return;

    const conversationTranscript = leadState.messages
      .map(m => `[${m.sender.toUpperCase()}]: ${m.text}`)
      .join('\n');

    const payload = {
      name: leadState.name || 'Chat Inquiry Visitor',
      email: leadState.email,
      contact: leadState.company || 'Website Live Chat',
      service: leadState.service || 'Web Development Inquiry',
      stage: 'Chatbot Lead',
      budget: leadState.budget || 'Unspecified',
      notes: `Captured via Kawaki Live Chat.\n\nProject Scope: ${leadState.service || 'General'}\nCompany: ${leadState.company || 'N/A'}\nTimeline: ${leadState.timeline || 'N/A'}\n\nTranscript:\n${conversationTranscript}`,
      slot_date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      slot_time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Lead synchronization note:', err));
  }

  /* --------------------------------------------------------------------------
     4. CONVERSATIONAL LOGIC & COMPREHENSIVE STUDIO KNOWLEDGE BASE
     -------------------------------------------------------------------------- */
  function processUserMessage(userText) {
    showTypingIndicator();

    const lower = userText.toLowerCase().trim();
    let reply = "";
    let options = null;
    let delay = 500 + Math.random() * 300;

    // Check for email anywhere in user input
    const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch && !leadState.email) {
      leadState.email = emailMatch[0];
      syncLeadToBackend();
    }

    // STATE MACHINE: Guided Lead Capture Mode
    if (leadState.step === 'AWAITING_SERVICE') {
      leadState.service = userText;
      leadState.step = 'AWAITING_NAME';
      reply = `Excellent choice! We specialize in **${userText}**.\n\nMay I have your **name** so our team knows who we're speaking with?`;
    } 
    else if (leadState.step === 'AWAITING_NAME') {
      leadState.name = userText.replace(/^(my name is|i am|i'm)\s+/i, '').trim();
      leadState.step = 'AWAITING_EMAIL';
      if (leadState.email) {
        leadState.step = 'COMPLETE';
        syncLeadToBackend();
        reply = `Wonderful to meet you, **${leadState.name}**! We have your email (${leadState.email}).\n\nOur engineering team will review your project requirements and prepare architectural notes. Would you also like to share your brand/company name or target launch timeline?`;
      } else {
        reply = `Nice to meet you, **${leadState.name}**! What is the best **email address** to send our project blueprint and consultation details to?`;
      }
    } 
    else if (leadState.step === 'AWAITING_EMAIL') {
      if (emailMatch) {
        leadState.email = emailMatch[0];
        leadState.step = 'COMPLETE';
        syncLeadToBackend();
        reply = `🎉 Thank you, **${leadState.name || 'there'}**! We've recorded your email as **${leadState.email}**.\n\nOur senior engineers will review your **${leadState.service || 'project'}** inquiry and reach out within 24 hours. You can also view our [Case Studies](/case-studies) or schedule a call on our [Contact Page](/contact).`;
      } else {
        reply = "Please share a valid email address (e.g. name@company.com) so we can send over our project estimate and availability.";
      }
    } 
    else if (leadState.step === 'COMPLETE') {
      if (!leadState.company && (lower.includes('company') || lower.includes('brand') || lower.length < 40)) {
        leadState.company = userText;
        syncLeadToBackend();
        reply = `Noted! We've added **${userText}** to your project brief. We'll be in touch shortly!`;
      } else {
        reply = answerKnowledgeQuery(lower, userText);
      }
    } 
    // STANDARD KNOWLEDGE BASE & INTENT ENGINE
    else {
      // 1. User wants to start a project / get a quote / hire us
      if (lower.includes('start a project') || lower.includes('get a quote') || lower.includes('hire') || lower.includes('build a website') || lower.includes('new project') || lower.includes('work with you')) {
        leadState.step = 'AWAITING_SERVICE';
        reply = "We'd love to partner with you! What type of project are you looking to create?";
        options = [
          { label: "🌐 Custom Web Development", value: "Custom Web Development" },
          { label: "🛍️ Shopify & E-commerce", value: "Shopify & E-commerce" },
          { label: "💻 Web Application / SaaS", value: "Web Application / SaaS" },
          { label: "🤖 AI Automation & Workflows", value: "AI Automation Workflows" },
          { label: "🔒 Security & Malware Removal", value: "Website Security & Hardening" },
          { label: "🎨 Branding & Strategy", value: "Branding & Visual Identity" }
        ];
      }
      // 2. Email provided independently
      else if (emailMatch) {
        leadState.email = emailMatch[0];
        syncLeadToBackend();
        reply = `Thank you for providing your email (**${leadState.email}**)! Our senior partners will review your details. What is your name and the project or brand you are building?`;
        leadState.step = 'AWAITING_NAME';
      }
      // 3. Fallthrough to comprehensive Knowledge Base
      else {
        reply = answerKnowledgeQuery(lower, userText);
      }
    }

    setTimeout(() => {
      removeTypingIndicator();
      sendMessage(reply, 'ai');
      if (options) {
        renderInteractiveOptions(options);
      }
    }, delay);
  }

  /* --------------------------------------------------------------------------
     5. FACTUAL STUDIO KNOWLEDGE BASE (KAWAKI FACTS & EXPERTISE)
     -------------------------------------------------------------------------- */
  function answerKnowledgeQuery(lower, rawText) {
    // Services / What do you do
    if (lower.includes('service') || lower.includes('what do you do') || lower.includes('capabilities') || lower.includes('what do you build')) {
      return "Kawaki Studios specializes in full-stack digital product engineering:\n\n" +
        "• **Custom Web Development**: Ultra-fast bespoke websites on Next.js, React, and Node.js.\n" +
        "• **Shopify & Headless E-commerce**: Custom Liquid storefronts, Storefront API headless architectures, and conversion optimization.\n" +
        "• **Web Applications & SaaS**: Multi-tenant portals, custom dashboards, and business software.\n" +
        "• **AI Automation**: n8n, Make.com, and intelligent agent pipelines that automate repetitive workflows.\n" +
        "• **AI Search Optimization (GEO)**: Modern visibility ensuring your brand gets cited on ChatGPT, Claude, and Perplexity.\n" +
        "• **Security & Malware Removal**: Emergency WordPress backdoor cleanup and server hardening.\n" +
        "• **Branding & Strategy**: Comprehensive identity systems, design tokens, and typography.\n\n" +
        "Would you like to discuss a specific service for your project?";
    }

    // Pricing / Cost / Budget / Rates
    if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('rate') || lower.includes('how much') || lower.includes('quote')) {
      return "Our project investments are structured around milestone-based sprints:\n\n" +
        "• **Brand Identity & Strategy**: Typically 2–4 weeks.\n" +
        "• **Bespoke Websites & Shopify Flagships**: Typically 4–8 weeks.\n" +
        "• **Web Applications, SaaS & Automation**: Custom scoped based on architecture requirements.\n\n" +
        "Every project is custom-engineered with zero bloat and clean Git versioning. If you share your requirements and email address, we can prepare a tailored scope outline for you!";
    }

    // Case studies / Portfolio / Past Work
    if (lower.includes('case stud') || lower.includes('portfolio') || lower.includes('work') || lower.includes('project') || lower.includes('clients') || lower.includes('sample')) {
      return "Here are a few of our flagship case studies:\n\n" +
        "• **Kala Design Co**: Architectural studio monograph featuring minimalist typography and visual storytelling.\n" +
        "• **NextSchool ERP**: Comprehensive multi-campus student, gradebook, and administration portal.\n" +
        "• **BAZZARO**: Luxury direct-to-consumer apparel store with sub-second catalog transitions.\n" +
        "• **NursePass**: Healthcare NCLEX examination platform with timed testing and analytics.\n" +
        "• **Urbanland Products**: High-spec B2B architectural materials catalogue with technical datasheets.\n\n" +
        "You can explore all our work on our [Case Studies Page](/case-studies)!";
    }

    // Who are you / About Kawaki Studios / Philosophy
    if (lower.includes('who are you') || lower.includes('about') || lower.includes('what is kawaki') || lower.includes('agency') || lower.includes('studio')) {
      return "**Kawaki Studios** is a digital engineering and product studio headquartered in New Delhi, collaborating with ambitious founders and businesses worldwide.\n\n" +
        "Our philosophy: We engineer bespoke digital platforms and web systems without bloated dependencies, brittle commercial themes, or black-box site builders. Every line of code is intentional, responsive, and built to scale.";
    }

    // Founder / Kunal Sharma / Team
    if (lower.includes('founder') || lower.includes('kunal') || lower.includes('who runs') || lower.includes('who owns') || lower.includes('team') || lower.includes('leadership')) {
      return "Kawaki Studios was founded by **Kunal Sharma**, who leads creative direction, digital architecture, and software engineering. We operate through a dedicated engineering model where clients collaborate directly with practicing developers rather than layers of account managers.";
    }

    // Location / Office / Where are you based
    if (lower.includes('location') || lower.includes('where are you') || lower.includes('based') || lower.includes('office') || lower.includes('delhi')) {
      return "Kawaki Studios is headquartered in **New Delhi, India**, and works with clients globally across India, North America, the UK, Europe, and the UAE through agile remote sprints.";
    }

    // Tech Stack / Technologies
    if (lower.includes('tech stack') || lower.includes('technolog') || lower.includes('next.js') || lower.includes('react') || lower.includes('shopify') || lower.includes('wordpress')) {
      return "Our core production technology stack includes:\n\n" +
        "• **Frontend**: Next.js, React, TypeScript, Semantic HTML5, Vanilla CSS, Tailwind CSS.\n" +
        "• **Backend & Databases**: Node.js, Python, Hono, SQLite, PostgreSQL, REST & Webhook APIs.\n" +
        "• **Commerce**: Shopify Liquid, Shopify Storefront API (Headless).\n" +
        "• **Automation & AI**: n8n, Make.com, deterministic LLM pipelines, AI search schema.\n" +
        "• **Mobile**: Flutter, React Native / Expo, Swift.";
    }

    // WordPress Security / Malware / Hacked Website
    if (lower.includes('malware') || lower.includes('hack') || lower.includes('virus') || lower.includes('backdoor') || lower.includes('security') || lower.includes('redirect')) {
      return "Yes! We provide emergency **Website Security & Incident Recovery** services:\n\n" +
        "• 100% removal of malicious redirects, web shells, and Japanese keyword hacks.\n" +
        "• Database sanitation and deep core integrity scans.\n" +
        "• Server hardening, WAF configuration, and blacklist removal (Google Safe Browsing).\n\n" +
        "If your website has been compromised, send us your email or contact us immediately at [hello@kawakistudios.com](mailto:hello@kawakistudios.com).";
    }

    // Contact / Meeting / Book a call
    if (lower.includes('contact') || lower.includes('email') || lower.includes('call') || lower.includes('schedule') || lower.includes('meeting') || lower.includes('phone') || lower.includes('reach')) {
      return "You can get in touch with our team through multiple channels:\n\n" +
        "• **Email**: [hello@kawakistudios.com](mailto:hello@kawakistudios.com)\n" +
        "• **Contact Page**: Visit our [Contact Page](/contact) to book a discovery consultation.\n" +
        "• **Directly here**: Just tell me your email and project overview, and we'll have an engineering partner contact you directly!";
    }

    // Process / How do you work
    if (lower.includes('process') || lower.includes('how do you work') || lower.includes('how we build') || lower.includes('methodology')) {
      return "Our engineering process follows five structured phases:\n\n" +
        "1. **Discovery & Requirements Modeling**: Uncovering exact business goals and technical constraints.\n" +
        "2. **System Architecture & Design Tokens**: Designing schemas, layouts, and typography.\n" +
        "3. **Bespoke Engineering**: Building responsive, accessible code in milestone sprints.\n" +
        "4. **Performance & Security Hardening**: Auditing Core Web Vitals, SEO, and cross-browser reliability.\n" +
        "5. **Production Deployment & Handoff**: Launching to edge infrastructure with continuous support.";
    }

    // Default polite response with lead invitation
    return "Thanks for asking! Kawaki Studios is a bespoke digital engineering studio specializing in custom web platforms, Shopify stores, web applications, and AI automation.\n\n" +
      "Would you like to **Start a Project**, view our **Case Studies**, or leave your email so an engineer can answer your specific questions?";
  }

  /* --------------------------------------------------------------------------
     6. VOICE-TO-TEXT RECOGNITION (DICTATION)
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
      console.warn('Voice recognition unavailable:', e);
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
        console.warn('Mic start notice:', e);
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
