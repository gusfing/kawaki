/**
 * KAWAKI STUDIOS — CLIENT CHATBOT & LEAD CONSULTANT
 * Luxury Digital Product Engineering Studio Assistant
 * 
 * Features:
 * - Robust Lead Capture & Validation (Email, Phone, WhatsApp, Service, Budget)
 * - Automatic background synchronization with /api/leads -> Google Sheets & Email Alert
 * - Interactive Project Scope Micro-Card inside chat
 * - Voice dictation & audio feedback
 * - Comprehensive Studio Knowledge Base (React/Next.js, Headless Shopify, AI Automation, Security)
 */

(function () {
  'use strict';

  // Lead Qualification State
  const leadState = {
    step: 'IDLE', // IDLE | AWAITING_SERVICE | AWAITING_NAME | AWAITING_CONTACT | AWAITING_DETAILS | COMPLETE
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    notes: '',
    synced: false,
    messages: []
  };

  let recognition = null;
  let isListening = false;

  // Restore draft state from localStorage if available
  try {
    const saved = localStorage.getItem('kawaki_chat_lead_draft');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        Object.assign(leadState, parsed);
      }
    }
  } catch (e) {}

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
          <span class="launcher-pill-text">Kawaki <em>Studio AI</em></span>
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
              </svg>
            </div>
            <div class="kawaki-chat-title-group">
              <div class="kawaki-chat-title-row">
                <span class="kawaki-chat-title">Kawaki Studios <em>Consultant</em></span>
              </div>
              <span class="kawaki-chat-feature-tag"><span class="dot-status"></span> // STUDIO INTELLIGENCE • ONLINE</span>
            </div>
          </div>

          <div class="kawaki-chat-header-actions">
            <button class="kawaki-chat-action-btn" id="kawakiChatClearBtn" title="Reset Conversation">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
            </button>
            <button class="kawaki-chat-action-btn" id="kawakiChatMinimizeBtn" title="Close Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
              Hello. Welcome to <strong>Kawaki Studios</strong>. We are a digital product engineering studio building bespoke web platforms, <a href="/blog/nextjs-performance-architecture">Next.js applications</a>, <a href="/services/shopify-development">headless Shopify systems</a>, and <a href="/services/ai-automation">AI workflows</a>.<br><br>How can our engineering team assist your project today?
            </div>
            <div class="kawaki-chat-msg-time">STUDIO // JUST NOW</div>
          </div>

          <!-- Quick Suggestions Chips -->
          <div class="kawaki-chat-suggestions" id="kawakiChatSuggestions">
            <button class="kawaki-chat-chip" data-query="Start a Project">
              💬 Request Project Scope & Estimate
            </button>
            <button class="kawaki-chat-chip" data-query="What services do you offer?">
              🛠️ Capabilities & Tech Stack
            </button>
            <button class="kawaki-chat-chip" data-query="Show me your case studies">
              💼 Flagship Case Studies
            </button>
            <button class="kawaki-chat-chip" data-query="How can I contact your engineers?">
              📅 Book Engineering Consultation
            </button>
          </div>

        </div>

        <!-- Input Bar Area -->
        <div class="kawaki-chat-input-wrapper">
          <div class="kawaki-chat-input-bar">
            <input type="text" class="kawaki-chat-input" id="kawakiChatInput" placeholder="Ask an architectural question or discuss a project..." autocomplete="off">
            
            <button class="kawaki-chat-tool-btn" id="kawakiChatMicBtn" title="Voice Dictation (Speak)">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>

            <button class="kawaki-chat-send-btn" id="kawakiChatSendBtn" title="Send Message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

      </div>
    `;

    const container = document.createElement('div');
    container.id = 'kawakiChatbotRoot';
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     2. EVENT HANDLERS & NAVIGATION
     -------------------------------------------------------------------------- */
  function setupChatEvents() {
    const launcher = document.getElementById('kawakiChatLauncher');
    const win = document.getElementById('kawakiChatWindow');
    const minBtn = document.getElementById('kawakiChatMinimizeBtn');
    const clearBtn = document.getElementById('kawakiChatClearBtn');
    const sendBtn = document.getElementById('kawakiChatSendBtn');
    const input = document.getElementById('kawakiChatInput');
    const suggestions = document.getElementById('kawakiChatSuggestions');

    if (!launcher || !win) return;

    function toggleChat() {
      const isOpen = win.classList.contains('open');
      if (isOpen) {
        win.classList.remove('open');
        launcher.classList.remove('active');
      } else {
        win.classList.add('open');
        launcher.classList.add('active');
        if (input) setTimeout(() => input.focus(), 300);
      }
    }

    launcher.addEventListener('click', toggleChat);
    if (minBtn) {
      minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const feed = document.getElementById('kawakiChatMessages');
        if (!feed) return;
        feed.innerHTML = `
          <div class="kawaki-chat-msg ai">
            <div class="kawaki-chat-msg-text">
              Conversation reset. How can our engineering team assist you with your web or software project?
            </div>
            <div class="kawaki-chat-msg-time">STUDIO // JUST NOW</div>
          </div>
          <div class="kawaki-chat-suggestions" id="kawakiChatSuggestions">
            <button class="kawaki-chat-chip" data-query="Start a Project">
              💬 Request Project Scope & Estimate
            </button>
            <button class="kawaki-chat-chip" data-query="What services do you offer?">
              🛠️ Capabilities & Tech Stack
            </button>
            <button class="kawaki-chat-chip" data-query="Show me your case studies">
              💼 Flagship Case Studies
            </button>
          </div>
        `;
        leadState.step = 'IDLE';
        leadState.messages = [];
        setupChipEvents();
      });
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSend();
        }
      });
    }

    setupChipEvents();

    // Auto-save lead beacon on page exit
    window.addEventListener('beforeunload', () => {
      if ((leadState.email || leadState.phone) && !leadState.synced) {
        syncLeadToBackend(true);
      }
    });
  }

  function setupChipEvents() {
    const chips = document.querySelectorAll('.kawaki-chat-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const query = chip.getAttribute('data-query') || chip.innerText.trim();
        const suggestions = document.getElementById('kawakiChatSuggestions');
        if (suggestions) suggestions.style.display = 'none';

        sendMessage(query, 'user');
        processUserMessage(query);
      });
    });
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

    try {
      localStorage.setItem('kawaki_chat_lead_draft', JSON.stringify({
        name: leadState.name,
        email: leadState.email,
        phone: leadState.phone,
        service: leadState.service,
        company: leadState.company
      }));
    } catch(e) {}

    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const msgEl = document.createElement('div');
    msgEl.className = `kawaki-chat-msg ${sender}`;
    msgEl.innerHTML = `
      <div class="kawaki-chat-msg-text">${formatted}</div>
      <div class="kawaki-chat-msg-time">${sender === 'user' ? 'YOU' : 'STUDIO'} // ${timeStr}</div>
    `;
    feed.appendChild(msgEl);
    feed.scrollTop = feed.scrollHeight;
  }

  /* --------------------------------------------------------------------------
     3. INTERACTIVE LEAD MICRO-CARD COMPONENT
     -------------------------------------------------------------------------- */
  function renderLeadCaptureCard(defaultService) {
    const feed = document.getElementById('kawakiChatMessages');
    if (!feed) return;

    const existingCard = document.getElementById('kawakiInlineLeadCard');
    if (existingCard) existingCard.remove();

    const card = document.createElement('div');
    card.className = 'kawaki-lead-card';
    card.id = 'kawakiInlineLeadCard';

    card.innerHTML = `
      <div class="kawaki-lead-card-header">
        <span class="kawaki-lead-card-badge">// ARCHITECTURAL SCOPE</span>
        <span class="kawaki-lead-card-title">Project Discovery Brief</span>
      </div>
      <div class="kawaki-lead-card-desc">
        Share your details and our senior engineers will prepare a custom architecture proposal within 24 hours.
      </div>
      <form class="kawaki-lead-form" id="kawakiInlineLeadForm">
        <input type="text" class="kawaki-lead-input-field" id="kwLeadName" placeholder="Your Name or Company" value="${escapeHtml(leadState.name || '')}" required />
        <input type="text" class="kawaki-lead-input-field" id="kwLeadContact" placeholder="Email Address or WhatsApp / Phone" value="${escapeHtml(leadState.email || leadState.phone || '')}" required />
        <select class="kawaki-lead-select-field" id="kwLeadService">
          <option value="Custom Web Development" ${defaultService && defaultService.includes('Web') ? 'selected' : ''}>🌐 Bespoke Web & Next.js App</option>
          <option value="Shopify Development" ${defaultService && defaultService.includes('Shopify') ? 'selected' : ''}>🛍️ Headless Shopify / E-Commerce</option>
          <option value="AI Automation" ${defaultService && defaultService.includes('AI') ? 'selected' : ''}>🤖 AI Automation & Workflows</option>
          <option value="Security & Malware Recovery" ${defaultService && defaultService.includes('Security') ? 'selected' : ''}>🔒 Security Hardening & Malware Recovery</option>
          <option value="Brand & Visual Identity">🎨 Brand Strategy & Identity</option>
        </select>
        <select class="kawaki-lead-select-field" id="kwLeadBudget">
          <option value="$5,000 - $15,000">$5,000 – $15,000 (Standard Sprint)</option>
          <option value="$15,000 - $35,000">$15,000 – $35,000 (Multi-Sprint Platform)</option>
          <option value="$35,000+">$35,000+ (Enterprise Architecture)</option>
          <option value="Undetermined">Budget Undetermined</option>
        </select>
        <button type="submit" class="kawaki-lead-submit-btn" id="kwLeadSubmitBtn">
          <span>Request Project Blueprint</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </form>
    `;

    feed.appendChild(card);
    feed.scrollTop = feed.scrollHeight;

    const form = document.getElementById('kawakiInlineLeadForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('kwLeadSubmitBtn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Synchronizing with Engineering...</span>';
        }

        const nameVal = document.getElementById('kwLeadName').value.trim();
        const contactVal = document.getElementById('kwLeadContact').value.trim();
        const serviceVal = document.getElementById('kwLeadService').value;
        const budgetVal = document.getElementById('kwLeadBudget').value;

        leadState.name = nameVal || 'Project Inquirer';
        leadState.service = serviceVal;
        leadState.budget = budgetVal;

        // Determine if contact is email or phone
        if (contactVal.includes('@')) {
          leadState.email = contactVal;
        } else {
          leadState.phone = contactVal;
          leadState.contact = contactVal;
        }

        syncLeadToBackend(false, () => {
          card.remove();
          sendMessage(`I have submitted a project request for **${serviceVal}** (${budgetVal}). Contact: **${contactVal}**`, 'user');
          showTypingIndicator();
          setTimeout(() => {
            removeTypingIndicator();
            sendMessage(`🎉 **Inquiry Confirmed, ${leadState.name}!**\n\nYour project brief has been logged and instantly forwarded to **Kunal Sharma** and our senior engineering team at Kawaki Studios.\n\nWe will review your requirements and reach out to **${contactVal}** within 24 hours. In the meantime, feel free to inspect our [Case Studies](/case-studies) or [Technical Guides](/blog).`, 'ai');
          }, 600);
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. COMPREHENSIVE LEAD SYNCHRONIZATION WITH BACKEND API (/api/leads)
     -------------------------------------------------------------------------- */
  function syncLeadToBackend(isBeacon = false, callback = null) {
    if (!leadState.email && !leadState.phone && !leadState.contact) {
      if (callback) callback();
      return;
    }

    const conversationTranscript = leadState.messages
      .map(m => `[${m.sender.toUpperCase()} - ${new Date(m.timestamp).toLocaleTimeString()}]: ${m.text}`)
      .join('\n');

    const contactMethod = leadState.phone || leadState.contact || 'Website Live Chat';
    const emailAddress = leadState.email || `lead-${(leadState.phone || '').replace(/[^0-9]/g, '') || Date.now()}@kawaki-inquiry.com`;

    const payload = {
      name: leadState.name || 'Website Chat Lead',
      email: emailAddress,
      contact: contactMethod,
      service: leadState.service || 'Web Development Inquiry',
      stage: 'Chatbot Qualified Lead',
      budget: leadState.budget || 'Undetermined',
      notes: `Captured via Kawaki Studios Live Chatbot.\n\nName: ${leadState.name || 'Visitor'}\nEmail: ${leadState.email || 'N/A'}\nPhone/WhatsApp: ${leadState.phone || 'N/A'}\nService: ${leadState.service || 'General'}\nCompany: ${leadState.company || 'N/A'}\nBudget: ${leadState.budget || 'N/A'}\n\nTranscript:\n${conversationTranscript}`,
      slot_date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      slot_time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    leadState.synced = true;

    if (isBeacon && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon('/api/leads', blob);
      if (callback) callback();
      return;
    }

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log('[Kawaki Chatbot] Lead synchronized successfully:', data);
        if (callback) callback();
      })
      .catch(err => {
        console.warn('[Kawaki Chatbot] Lead sync note:', err.message);
        if (callback) callback();
      });
  }

  /* --------------------------------------------------------------------------
     5. CONVERSATIONAL LOGIC & ENTITY EXTRACTION
     -------------------------------------------------------------------------- */
  function processUserMessage(userText) {
    showTypingIndicator();

    const lower = userText.toLowerCase().trim();
    let reply = "";
    let options = null;
    let shouldRenderCard = false;
    let delay = 450 + Math.random() * 250;

    // Entity Extraction 1: Email detection anywhere in text
    const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
    if (emailMatch) {
      leadState.email = emailMatch[0];
      syncLeadToBackend();
    }

    // Entity Extraction 2: Phone number / WhatsApp detection
    const phoneMatch = userText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{10,14}/);
    if (phoneMatch && !emailMatch) {
      const cleanPhone = phoneMatch[0].trim();
      if (cleanPhone.length >= 10) {
        leadState.phone = cleanPhone;
        syncLeadToBackend();
      }
    }

    // State Machine logic
    if (leadState.step === 'AWAITING_SERVICE') {
      leadState.service = userText;
      leadState.step = 'AWAITING_CONTACT';
      shouldRenderCard = true;
      reply = `Superb choice! We engineer custom platforms for **${userText}**.\n\nYou can fill out our quick scope card below, or share your email / WhatsApp right here so our lead engineers can prepare an architectural estimate.`;
    } 
    else if (leadState.step === 'AWAITING_NAME') {
      leadState.name = userText.replace(/^(my name is|i am|i'm|this is)\s+/i, '').trim();
      leadState.step = 'AWAITING_CONTACT';
      if (leadState.email || leadState.phone) {
        leadState.step = 'COMPLETE';
        syncLeadToBackend();
        reply = `Pleased to connect, **${leadState.name}**! We have your contact information safely logged.\n\nOur engineering team will review your **${leadState.service || 'project'}** requirements. Would you like to share your current website URL or target launch timeframe?`;
      } else {
        reply = `Pleased to connect, **${leadState.name}**! What is the best **email address or WhatsApp number** to send your project scope and consultation details?`;
      }
    } 
    else if (leadState.step === 'AWAITING_CONTACT') {
      if (emailMatch || phoneMatch) {
        leadState.step = 'COMPLETE';
        syncLeadToBackend();
        const contactMethod = emailMatch ? emailMatch[0] : phoneMatch[0];
        reply = `🎉 Thank you, **${leadState.name || 'there'}**! We've recorded your contact as **${contactMethod}**.\n\nOur engineering lead will review your project requirements and get in touch within 24 hours. You can also inspect our [Case Studies](/case-studies) or review our [Custom Web Development Services](/services/custom-web-development).`;
      } else {
        reply = "Please share a valid email address (e.g. name@company.com) or phone number so our team can send over the technical estimate.";
      }
    } 
    // Direct trigger for Project Scope / Quote
    else if (
      lower.includes('start a project') || 
      lower.includes('get a quote') || 
      lower.includes('quote') || 
      lower.includes('estimate') || 
      lower.includes('hire') || 
      lower.includes('build a website') || 
      lower.includes('new project') || 
      lower.includes('book consultation')
    ) {
      leadState.step = 'AWAITING_SERVICE';
      shouldRenderCard = true;
      reply = "We would be thrilled to engineer your project! You can use our **Project Discovery Card** below to share your requirements, or select a service category to begin:";
      options = [
        { label: "🌐 Bespoke Web & Next.js App", value: "Custom Web Development" },
        { label: "🛍️ Headless Shopify Storefront", value: "Shopify Development" },
        { label: "🤖 AI Automation & Workflows", value: "AI Automation" },
        { label: "🔒 WordPress Security & Recovery", value: "Security & Malware Removal" }
      ];
    } 
    // Phone or email dropped naturally
    else if (emailMatch || phoneMatch) {
      syncLeadToBackend();
      const contactVal = emailMatch ? emailMatch[0] : phoneMatch[0];
      leadState.step = 'AWAITING_NAME';
      reply = `Thank you for sharing your contact details (**${contactVal}**)! What is your name and the vision for your project?`;
    } 
    // Standard Studio Knowledge Base
    else {
      reply = answerStudioKnowledge(lower, userText);
    }

    setTimeout(() => {
      removeTypingIndicator();
      sendMessage(reply, 'ai');
      if (options) {
        renderInteractiveOptions(options);
      }
      if (shouldRenderCard) {
        renderLeadCaptureCard(leadState.service);
      }
    }, delay);
  }

  /* --------------------------------------------------------------------------
     6. FACTUAL STUDIO KNOWLEDGE BASE (KAWAKI CORE CAPABILITIES)
     -------------------------------------------------------------------------- */
  function answerStudioKnowledge(lower, rawText) {
    // Services / Capabilities
    if (lower.includes('service') || lower.includes('what do you do') || lower.includes('capabilities') || lower.includes('what do you build')) {
      return "Kawaki Studios specializes in full-stack digital product engineering:\n\n" +
        "• **[Custom Web Development](/services/custom-web-development)**: Sub-second bespoke web platforms engineered with Next.js, React, and modern TypeScript.\n" +
        "• **[Shopify & Headless E-commerce](/services/shopify-development)**: High-converting custom Liquid and Storefront API headless architectures with zero bloat.\n" +
        "• **[AI Automation & Workflow Architecture](/services/ai-automation)**: Autonomous agent loops and n8n/Make orchestration for business operations.\n" +
        "• **[AI Search Optimization (GEO/AEO)](/services/ai-search-optimization)**: Entity architecture ensuring your brand is recommended across ChatGPT, Claude, and Perplexity.\n" +
        "• **[WordPress Malware Removal & Security](/services/wordpress-malware-removal)**: Forensic cleanup of backdoors, malicious redirects, and Japanese keyword hacks.\n\n" +
        "Would you like an architectural recommendation for your upcoming project?";
    }

    // Pricing / Rates / Timeline
    if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('rate') || lower.includes('how much')) {
      return "Our engineering investments are milestone-based, guaranteeing transparent delivery with zero scope surprises:\n\n" +
        "• **Bespoke Websites & Digital Flagships**: Typically $5,000 – $15,000 (4–8 week sprint cycles).\n" +
        "• **Complex Web Apps & SaaS Systems**: Typically $15,000 – $40,000+ depending on database models and APIs.\n" +
        "• **Security Recovery & Forensic Eradication**: Fixed emergency turnaround packages.\n\n" +
        "We commit code directly to your private GitHub from Sprint 1. Would you like a customized scope estimate?";
    }

    // Case Studies & Work
    if (lower.includes('case stud') || lower.includes('portfolio') || lower.includes('work') || lower.includes('client') || lower.includes('sample')) {
      return "Here are recent flagship case studies engineered by Kawaki Studios:\n\n" +
        "• **[Kala Design Co.](/case-studies/kala-design-co)**: Architectural monograph featuring sub-0.8s LCP, semantic typography rails, and minimal aesthetics.\n" +
        "• **[BAZZARO](/case-studies/bazzaro)**: High-velocity headless commerce storefront delivering instant catalog search and checkout transitions.\n" +
        "• **[NextSchool ERP](/case-studies/nextschool-erp)**: Multi-tenant educational management system powering student enrollment and analytics.\n\n" +
        "Would you like to review more case studies or discuss a similar platform for your brand?";
    }

    // Tech Stack & Frameworks
    if (lower.includes('stack') || lower.includes('nextjs') || lower.includes('react') || lower.includes('shopify') || lower.includes('wordpress')) {
      return "We are technology pragmatists who engineer for long-term performance:\n\n" +
        "• **Front-End**: Next.js 15, React, TypeScript, Tailwind CSS, Vanilla CSS design tokens.\n" +
        "• **Commerce**: Headless Shopify (Storefront API), Hydrogen, Custom Liquid theme development.\n" +
        "• **Back-End & DB**: Node.js, PostgreSQL, Supabase, SQLite, Redis caching rails.\n" +
        "• **Cloud & Edge**: Vercel Edge Network, Cloudflare Workers, AWS.\n\n" +
        "We never build on bloated pre-bought commercial templates or fragile drag-and-drop builders.";
    }

    // Contact / Location / Meeting
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('call') || lower.includes('location') || lower.includes('delhi')) {
      return "Kawaki Studios is headquartered in **New Delhi, India**, collaborating with founders and engineering leaders globally.\n\n" +
        "• **Direct Studio Email**: [hello@kawakistudios.com](mailto:hello@kawakistudios.com)\n" +
        "• **Consultation Booking**: Visit our [Contact Page](/contact) to schedule a video call with lead engineer Kunal Sharma.\n\n" +
        "You can also share your contact details right here in chat, and we'll reply directly!";
    }

    // General fallback
    return "Thank you for your question. As a bespoke digital engineering studio, we specialize in high-performance web systems, headless commerce, and AI integrations.\n\nWould you like to **request a project estimate**, explore our **case studies**, or speak with our engineering director?";
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
        processUserMessage(opt.value || opt.label);
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

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* --------------------------------------------------------------------------
     7. VOICE SPEECH RECOGNITION (Web Speech API)
     -------------------------------------------------------------------------- */
  function initVoiceRecognition() {
    const micBtn = document.getElementById('kawakiChatMicBtn');
    const input = document.getElementById('kawakiChatInput');

    if (!micBtn || !input) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      micBtn.style.display = 'none';
      return;
    }

    try {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('listening');
        input.placeholder = 'Listening... Speak your message';
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          input.value = transcript;
          handleSend();
        }
      };

      recognition.onerror = () => {
        isListening = false;
        micBtn.classList.remove('listening');
        input.placeholder = 'Ask an architectural question or discuss a project...';
      };

      recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('listening');
        input.placeholder = 'Ask an architectural question or discuss a project...';
      };

      micBtn.addEventListener('click', () => {
        if (isListening) {
          recognition.stop();
        } else {
          recognition.start();
        }
      });
    } catch (e) {
      micBtn.style.display = 'none';
    }
  }

})();
