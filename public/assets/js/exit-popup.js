/**
 * KAWAKI STUDIOS — DISCOVERY & ENGAGEMENT MODAL
 * Clean, minimal editorial light aesthetic matching the rest of the website.
 * Handles both exit-intent detection and manual trigger via window.openKawakiPopup().
 */
(function () {
  'use strict';

  let hasTriggered = false;
  let scrollEngaged = false;

  // Track scroll depth
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
        z-index: 99999;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.35s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.25rem;
        box-sizing: border-box;
      }
      .kawaki-popup-backdrop.active {
        opacity: 1;
        visibility: visible;
      }
      .kawaki-popup-modal {
        position: relative;
        width: 100%;
        max-width: 520px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 35px 80px rgba(0, 0, 0, 0.28), 0 4px 16px rgba(0, 0, 0, 0.08);
        border-radius: 24px;
        color: #111111;
        font-family: var(--font-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        transform: scale(0.94) translateY(16px);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
        box-sizing: border-box;
      }
      .kawaki-popup-backdrop.active .kawaki-popup-modal {
        transform: scale(1) translateY(0);
      }
      .kawaki-popup-banner {
        width: 100%;
        height: 195px;
        object-fit: cover;
        display: block;
        border-radius: 24px 24px 0 0;
      }
      .kawaki-popup-content {
        padding: 1.75rem 2rem 2rem;
        box-sizing: border-box;
      }
      .kawaki-popup-title {
        font-size: 1.45rem;
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: -0.02em;
        margin: 0 0 0.5rem 0;
        color: #111111;
      }
      .kawaki-popup-desc {
        font-size: 0.88rem;
        color: #555555;
        line-height: 1.6;
        margin: 0 0 1.5rem 0;
      }
      .kawaki-popup-section-title {
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #111111;
        margin: 0 0 1rem 0;
      }
      .kpop-checklist {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        margin-bottom: 1.85rem;
      }
      .kpop-check-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
      }
      .kpop-check-icon {
        color: #ea580c;
        flex-shrink: 0;
        margin-top: 2px;
      }
      .kpop-check-title {
        font-size: 0.88rem;
        font-weight: 600;
        color: #111111;
        margin-bottom: 2px;
      }
      .kpop-check-desc {
        font-size: 0.8rem;
        color: #64748b;
        line-height: 1.45;
      }
      .kpop-btn-row {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        width: 100%;
      }
      .kpop-btn-close {
        flex: 1;
        height: 46px;
        border-radius: 9999px;
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        color: #475569;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .kpop-btn-close:hover {
        background: #e2e8f0;
        color: #0f172a;
      }
      .kpop-btn-primary {
        flex: 1.35;
        height: 46px;
        border-radius: 9999px;
        background: #111111;
        border: none;
        color: #FFFFFF;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.15s ease, background 0.2s ease;
        text-decoration: none;
      }
      .kpop-btn-primary:hover {
        background: #ea580c;
        color: #FFFFFF;
        transform: translateY(-1px);
        box-shadow: 0 8px 24px rgba(234, 88, 12, 0.25);
      }

      /* Step 2 Form Drawer */
      .kpop-form-step {
        display: none;
        animation: kpopFadeIn 0.3s ease;
      }
      .kpop-form-step.active {
        display: block;
      }
      @keyframes kpopFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .kpop-input-field {
        width: 100%;
        box-sizing: border-box;
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        color: #0f172a;
        font-size: 0.88rem;
        outline: none;
        margin-bottom: 0.75rem;
        font-family: inherit;
        transition: border-color 0.2s, background 0.2s;
      }
      .kpop-input-field:focus {
        border-color: #ea580c;
        background: #ffffff;
      }
      .kpop-input-field::placeholder {
        color: #94a3b8;
      }
      .kpop-select-field {
        width: 100%;
        box-sizing: border-box;
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        color: #0f172a;
        font-size: 0.88rem;
        outline: none;
        margin-bottom: 1.25rem;
        font-family: inherit;
        transition: border-color 0.2s;
      }
      .kpop-select-field:focus {
        border-color: #ea580c;
        background: #ffffff;
      }

      /* Success Step */
      .kpop-success-step {
        display: none;
        text-align: center;
        padding: 2.5rem 1.5rem;
      }
      .kpop-success-step.active {
        display: block;
      }
      .kpop-success-circle {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: rgba(234, 88, 12, 0.1);
        border: 1px solid rgba(234, 88, 12, 0.25);
        color: #ea580c;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.25rem;
      }
      .kpop-success-title {
        font-size: 1.35rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        color: #111111;
      }
      .kpop-success-desc {
        font-size: 0.88rem;
        color: #555555;
        line-height: 1.5;
        margin: 0;
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
      <div class="kawaki-popup-modal" role="dialog" aria-modal="true" aria-labelledby="kpopTitle">
        <!-- Top Studio Visual -->
        <img 
          src="/assets/images/about-studio.webp" 
          alt="Kawaki Studios Discovery & Scoping" 
          class="kawaki-popup-banner"
          width="800"
          height="320"
        />

        <div class="kawaki-popup-content">
          <!-- Step 1: Overview & Checklist -->
          <div class="kpop-overview-step" id="kpopStep1">
            <h3 class="kawaki-popup-title" id="kpopTitle">Discovery &amp; Project Scoping</h3>
            <p class="kawaki-popup-desc">
              We evaluate your business requirements, architecture complexity, and growth goals to design a high-performance web system built to last.
            </p>

            <div class="kawaki-popup-section-title">What We Assess &amp; Deliver</div>

            <div class="kpop-checklist">
              <div class="kpop-check-item">
                <svg class="kpop-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <div>
                  <div class="kpop-check-title">System &amp; Scope Architecture</div>
                  <div class="kpop-check-desc">Technical stack selection, performance boundaries, and scalability.</div>
                </div>
              </div>

              <div class="kpop-check-item">
                <svg class="kpop-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <div>
                  <div class="kpop-check-title">Conversion &amp; UX Engineering</div>
                  <div class="kpop-check-desc">Visual hierarchy, buying psychology, and responsive velocity.</div>
                </div>
              </div>

              <div class="kpop-check-item">
                <svg class="kpop-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <div>
                  <div class="kpop-check-title">Integrations &amp; Data Flow</div>
                  <div class="kpop-check-desc">APIs, headless endpoints, CMS schemas, and automations.</div>
                </div>
              </div>

              <div class="kpop-check-item">
                <svg class="kpop-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <div>
                  <div class="kpop-check-title">Execution Timeline &amp; Fixed Estimate</div>
                  <div class="kpop-check-desc">Transparent sprint milestones with zero scope creep.</div>
                </div>
              </div>
            </div>

            <div class="kpop-btn-row">
              <button class="kpop-btn-close" id="kpopCloseBtn" type="button">Close</button>
              <button class="kpop-btn-primary" id="kpopStartBtn" type="button">Start Discovery Call</button>
            </div>
          </div>

          <!-- Step 2: 2-Field Lead Capture Form -->
          <div class="kpop-form-step" id="kpopStep2">
            <h3 class="kawaki-popup-title">Book Architecture Briefing</h3>
            <p class="kawaki-popup-desc">Enter your details and our senior engineering team will prepare your project estimate.</p>

            <form id="kpopLeadForm">
              <input type="text" class="kpop-input-field" id="kpopName" placeholder="Your Name or Studio" required autocomplete="name" />
              <input type="email" class="kpop-input-field" id="kpopEmail" placeholder="Work Email Address" required autocomplete="email" />
              <select class="kpop-select-field" id="kpopService">
                <option value="Custom Web Development">Custom Web Development</option>
                <option value="Shopify & Headless Commerce">Shopify &amp; Headless Commerce</option>
                <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                <option value="AI Workflow Automation">AI Workflow Automation</option>
                <option value="Performance & Security Hardening">Performance &amp; Security Hardening</option>
              </select>

              <div class="kpop-btn-row">
                <button class="kpop-btn-close" id="kpopBackBtn" type="button">Back</button>
                <button class="kpop-btn-primary" id="kpopSubmitBtn" type="submit">Submit Brief &rarr;</button>
              </div>
            </form>
          </div>

          <!-- Step 3: Success State -->
          <div class="kpop-success-step" id="kpopStep3">
            <div class="kpop-success-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 class="kpop-success-title">Brief Received</h3>
            <p class="kpop-success-desc">
              Thank you. Our partners have received your project scope. We'll review your requirements and reach out within 24 hours.
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    setupEvents(backdrop);
  }

  // 3. Setup Events
  function setupEvents(backdrop) {
    const closeBtn = backdrop.querySelector('#kpopCloseBtn');
    const startBtn = backdrop.querySelector('#kpopStartBtn');
    const backBtn = backdrop.querySelector('#kpopBackBtn');
    const leadForm = backdrop.querySelector('#kpopLeadForm');
    const step1 = backdrop.querySelector('#kpopStep1');
    const step2 = backdrop.querySelector('#kpopStep2');
    const step3 = backdrop.querySelector('#kpopStep3');

    function closeModal() {
      backdrop.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        step1.style.display = 'none';
        step2.classList.add('active');
        const nameInput = backdrop.querySelector('#kpopName');
        if (nameInput) nameInput.focus();
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        step2.classList.remove('active');
        step1.style.display = 'block';
      });
    }

    if (leadForm) {
      leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = backdrop.querySelector('#kpopSubmitBtn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
        }

        const name = (backdrop.querySelector('#kpopName') || {}).value || '';
        const email = (backdrop.querySelector('#kpopEmail') || {}).value || '';
        const service = (backdrop.querySelector('#kpopService') || {}).value || '';

        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            service,
            stage: 'Discovery Popup Lead',
            notes: 'Captured via Exit / Discovery Scoping Modal'
          })
        })
        .then(() => {
          step2.classList.remove('active');
          step3.classList.add('active');
          setTimeout(closeModal, 3500);
        })
        .catch(() => {
          step2.classList.remove('active');
          step3.classList.add('active');
          setTimeout(closeModal, 3500);
        });
      });
    }
  }

  // 4. Trigger Modal
  window.openKawakiPopup = function () {
    let backdrop = document.getElementById('kawakiExitModal');
    if (!backdrop) {
      createModal();
      backdrop = document.getElementById('kawakiExitModal');
    }
    if (backdrop) {
      backdrop.classList.add('active');
    }
  };

  // 5. Exit-intent detection
  document.addEventListener('mouseleave', function onMouseLeave(e) {
    if (e.clientY <= 12 && !hasTriggered && scrollEngaged) {
      hasTriggered = true;
      sessionStorage.setItem('kawaki_exit_seen', 'true');
      window.openKawakiPopup();
    }
  });

  // Wire buttons with [data-open-discovery="true"]
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-discovery="true"], a[href="#discovery"]');
    if (trigger) {
      e.preventDefault();
      window.openKawakiPopup();
    }
  });
})();
