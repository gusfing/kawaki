/**
 * KAWAKI STUDIOS — EXIT INTENT & DISCOVERY POPUP
 * Captures high-intent visitors before departure with a sleek glassmorphic modal.
 * Submits directly to /api/contact and SQLite leads table.
 */
(function () {
  'use strict';

  // Prevent multiple initializations or execution if already submitted in session
  if (window.__kawakiExitPopupLoaded || sessionStorage.getItem('kawaki_exit_popup_dismissed')) {
    return;
  }
  window.__kawakiExitPopupLoaded = true;

  let hasTriggered = false;
  let scrollEngaged = false;

  // Track scroll depth to avoid triggering for accidental immediate bounces
  window.addEventListener('scroll', function onFirstScroll() {
    if (window.scrollY > 300) {
      scrollEngaged = true;
      window.removeEventListener('scroll', onFirstScroll);
    }
  }, { passive: true });

  // 1. Inject Styles
  function injectStyles() {
    if (document.getElementById('kawaki-popup-styles')) return;
    const style = document.createElement('style');
    style.id = 'kawaki-popup-styles';
    style.textContent = `
      .kawaki-popup-backdrop {
        position: fixed;
        inset: 0;
        z-index: 99998;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.35s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.25rem;
      }
      .kawaki-popup-backdrop.active {
        opacity: 1;
        visibility: visible;
      }
      .kawaki-popup-modal {
        position: relative;
        width: 100%;
        max-width: 520px;
        background: #0E0E14;
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(198, 255, 0, 0.08);
        border-radius: 18px;
        padding: 2.25rem;
        color: #FFFFFF;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        transform: scale(0.92) translateY(12px);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
      }
      .kawaki-popup-backdrop.active .kawaki-popup-modal {
        transform: scale(1) translateY(0);
      }
      .kawaki-popup-glow {
        position: absolute;
        top: -60px;
        right: -60px;
        width: 180px;
        height: 180px;
        background: radial-gradient(circle, rgba(198, 255, 0, 0.18) 0%, rgba(198, 255, 0, 0) 70%);
        pointer-events: none;
      }
      .kawaki-popup-close {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        color: #A1A1AA;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 1.1rem;
        line-height: 1;
      }
      .kawaki-popup-close:hover {
        background: rgba(255, 255, 255, 0.15);
        color: #FFFFFF;
        transform: scale(1.05);
      }
      .kawaki-popup-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 9999px;
        background: rgba(198, 255, 0, 0.1);
        border: 1px solid rgba(198, 255, 0, 0.3);
        color: #C6FF00;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 0.85rem;
      }
      .kawaki-popup-badge span.dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #C6FF00;
        box-shadow: 0 0 6px #C6FF00;
      }
      .kawaki-popup-title {
        font-size: 1.55rem;
        font-weight: 800;
        line-height: 1.2;
        letter-spacing: -0.02em;
        margin-bottom: 0.45rem;
        color: #FFFFFF;
      }
      .kawaki-popup-title em {
        font-style: italic;
        color: #C6FF00;
      }
      .kawaki-popup-desc {
        font-size: 0.88rem;
        color: #A1A1AA;
        line-height: 1.45;
        margin-bottom: 1.35rem;
      }
      .kawaki-popup-form {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
      }
      .kawaki-popup-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      @media (max-width: 480px) {
        .kawaki-popup-grid { grid-template-columns: 1fr; }
        .kawaki-popup-modal { padding: 1.6rem; }
      }
      .kawaki-popup-input, .kawaki-popup-select, .kawaki-popup-textarea {
        width: 100%;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 0.7rem 0.9rem;
        color: #FFFFFF;
        font-size: 0.85rem;
        outline: none;
        transition: border-color 0.2s, background 0.2s;
        font-family: inherit;
      }
      .kawaki-popup-input:focus, .kawaki-popup-select:focus, .kawaki-popup-textarea:focus {
        border-color: #C6FF00;
        background: rgba(255, 255, 255, 0.08);
      }
      .kawaki-popup-input::placeholder, .kawaki-popup-textarea::placeholder {
        color: #71717A;
      }
      .kawaki-popup-select option {
        background: #181822;
        color: #FFFFFF;
      }
      .kawaki-popup-textarea {
        resize: vertical;
        min-height: 70px;
      }
      .kawaki-popup-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        background: #C6FF00;
        color: #0E0E14;
        border: none;
        border-radius: 10px;
        padding: 0.85rem 1rem;
        font-size: 0.92rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.15s ease, background 0.2s ease, box-shadow 0.2s ease;
        margin-top: 0.35rem;
        box-shadow: 0 4px 18px rgba(198, 255, 0, 0.25);
      }
      .kawaki-popup-btn:hover:not(:disabled) {
        background: #B3E600;
        transform: translateY(-1px);
        box-shadow: 0 6px 22px rgba(198, 255, 0, 0.35);
      }
      .kawaki-popup-btn:disabled {
        opacity: 0.65;
        cursor: not-allowed;
      }
      .kawaki-popup-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.85rem;
        font-size: 0.76rem;
        color: #71717A;
      }
      .kawaki-popup-footer a {
        color: #A1A1AA;
        text-decoration: underline;
        transition: color 0.2s;
      }
      .kawaki-popup-footer a:hover {
        color: #C6FF00;
      }
      .kawaki-popup-success {
        display: none;
        text-align: center;
        padding: 1.5rem 0.5rem;
      }
      .kawaki-popup-success.active {
        display: block;
      }
      .kawaki-popup-success-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(198, 255, 0, 0.15);
        border: 1px solid rgba(198, 255, 0, 0.4);
        color: #C6FF00;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
      }
      .kawaki-popup-success h3 {
        font-size: 1.35rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .kawaki-popup-success p {
        font-size: 0.88rem;
        color: #A1A1AA;
        line-height: 1.5;
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Render Modal DOM
  function createModal() {
    injectStyles();

    const backdrop = document.createElement('div');
    backdrop.className = 'kawaki-popup-backdrop';
    backdrop.id = 'kawakiExitModal';

    backdrop.innerHTML = `
      <div class="kawaki-popup-modal" role="dialog" aria-modal="true" aria-labelledby="kawaki-popup-title">
        <div class="kawaki-popup-glow"></div>
        <button class="kawaki-popup-close" id="kawakiPopupClose" aria-label="Close modal">&times;</button>
        
        <div id="kawakiPopupBody">
          <div class="kawaki-popup-badge">
            <span class="dot"></span>
            <span>Discovery Intake</span>
          </div>
          <h2 class="kawaki-popup-title" id="kawaki-popup-title">
            Before You Go — <em>Let's Build.</em>
          </h2>
          <p class="kawaki-popup-desc">
            Directly connect with our engineering partners for project estimates, architectural reviews, or a 15-minute intro call.
          </p>

          <form class="kawaki-popup-form" id="kawakiPopupForm">
            <div class="kawaki-popup-grid">
              <input type="text" id="kpop-name" class="kawaki-popup-input" placeholder="Your Name *" required />
              <input type="email" id="kpop-email" class="kawaki-popup-input" placeholder="Work Email *" required />
            </div>

            <div class="kawaki-popup-grid">
              <select id="kpop-service" class="kawaki-popup-select">
                <option value="Custom Web App">Custom Web App & Next.js</option>
                <option value="Headless Shopify">Headless Shopify & Commerce</option>
                <option value="AI Automation">AI Agents & Workflow Automation</option>
                <option value="AI Search Optimization">AI Search & GEO Optimization</option>
                <option value="Website Redesign">Flagship Redesign</option>
                <option value="Security Hardening">Security & Performance</option>
              </select>
              <input type="text" id="kpop-contact" class="kawaki-popup-input" placeholder="Telegram / WhatsApp" />
            </div>

            <textarea id="kpop-notes" class="kawaki-popup-textarea" placeholder="Tell us briefly what you are planning to build or optimize..."></textarea>

            <button type="submit" class="kawaki-popup-btn" id="kpop-submit">
              <span>Request Discovery Brief</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <div class="kawaki-popup-footer">
            <span>Direct partner response within 24h</span>
            <a href="https://t.me/kawakistudios" target="_blank" rel="noopener noreferrer">Or chat on Telegram &rarr;</a>
          </div>
        </div>

        <div class="kawaki-popup-success" id="kawakiPopupSuccess">
          <div class="kawaki-popup-success-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3>Inquiry Received!</h3>
          <p id="kpop-success-msg">
            Thank you! Your project brief has been routed directly to our engineering partners. We will follow up with technical architecture notes shortly.
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Close logic
    const closeBtn = document.getElementById('kawakiPopupClose');
    closeBtn.addEventListener('click', closeModal);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('active')) {
        closeModal();
      }
    });

    // Form submission
    const form = document.getElementById('kawakiPopupForm');
    form.addEventListener('submit', handlePopupSubmit);

    return backdrop;
  }

  function openModal() {
    if (hasTriggered) return;
    hasTriggered = true;
    sessionStorage.setItem('kawaki_exit_popup_dismissed', 'true');

    let backdrop = document.getElementById('kawakiExitModal') || createModal();
    requestAnimationFrame(() => {
      backdrop.classList.add('active');
    });
  }

  function closeModal() {
    const backdrop = document.getElementById('kawakiExitModal');
    if (backdrop) {
      backdrop.classList.remove('active');
    }
  }

  async function handlePopupSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('kpop-name');
    const emailInput = document.getElementById('kpop-email');
    const contactInput = document.getElementById('kpop-contact');
    const serviceInput = document.getElementById('kpop-service');
    const notesInput = document.getElementById('kpop-notes');
    const submitBtn = document.getElementById('kpop-submit');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      alert('Please provide your name and work email.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Submitting...';

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      contact: contactInput.value.trim() || 'Exit Intent Popup',
      service: serviceInput.value || 'General Inquiry',
      stage: 'Exit-Intent Lead',
      budget: 'Flexible',
      notes: notesInput.value.trim() || 'Inquiry initiated via exit-intent popup modal.',
      slot_date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      slot_time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok && !data.success) {
        throw new Error(data.error || 'Submission failed');
      }

      document.getElementById('kawakiPopupBody').style.display = 'none';
      document.getElementById('kawakiPopupSuccess').classList.add('active');

      setTimeout(closeModal, 4000);
    } catch (err) {
      console.error('Exit popup submission error:', err);
      alert('Could not submit brief. Please message us directly on Telegram @kawakistudios.');
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Request Discovery Brief';
    }
  }

  // 3. Trigger Detection
  function initTriggerWatchers() {
    // Desktop mouse exit intent
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY <= 15 && (scrollEngaged || window.scrollY > 200)) {
        openModal();
      }
    });

    // Time on page fallback: after 45 seconds if user has engaged
    setTimeout(function () {
      if (scrollEngaged) {
        openModal();
      }
    }, 45000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTriggerWatchers);
  } else {
    initTriggerWatchers();
  }
})();
