/* Kawaki Agent Chrome Bridge: legacy actions.
   Kept so the older one-off scripts in scripts/ (Contra, directory submissions) keep working.
   They act on the active tab, exactly as before. New work should use the actions in background.js
   (snapshot, click by ref, type, table, wait, ...), which are smaller and more reliable. */

async function legacyCommand(action, params = {}) {
  switch (action) {
    case 'get_content': {
      const tabId = params.tabId || (await getActiveTabId());
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: () => ({
          title: document.title,
          url: window.location.href,
          textSnippet: document.body ? document.body.innerText.slice(0, 4000) : ''
        })
      });
      return results && results[0] ? results[0].result : { title: '', url: '', textSnippet: '' };
    }

    case 'click': {
      const tabId = params.tabId || (await getActiveTabId());
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: (sel) => {
          let el = document.querySelector(sel);
          if (!el) {
            el = Array.from(document.querySelectorAll('button, a, div[role="button"], [role="option"], span, div, li, p'))
              .find(b => (b.innerText || '').trim().toLowerCase() === sel.toLowerCase());
          }
          if (!el) {
            el = Array.from(document.querySelectorAll('button, a, div[role="button"], [role="option"], span, div, li, p'))
              .find(b => (b.innerText || '').toLowerCase().includes(sel.toLowerCase()));
          }
          if (!el) return { success: false, error: 'Element not found: ' + sel };
          el.scrollIntoView({ block: 'center' });
          el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
          el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
          el.click();
          return { success: true, text: (el.innerText || el.value || '').slice(0, 100) };
        },
        args: [params.selector]
      });
      return results && results[0] ? results[0].result : { success: false };
    }

    case 'fill': {
      const tabId = params.tabId || (await getActiveTabId());
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: (sel, text) => {
          let el = document.querySelector(sel);
          if (!el) {
            el = Array.from(document.querySelectorAll('input, textarea'))
              .find(i => (i.placeholder || '').toLowerCase().includes(sel.toLowerCase()) || (i.name || '').toLowerCase() === sel.toLowerCase());
          }
          if (!el) return { success: false, error: 'Element not found: ' + sel };
          el.scrollIntoView({ block: 'center' });
          el.focus();
          const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
          const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
          setter.call(el, text);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          return { success: true, value: el.value };
        },
        args: [params.selector, params.text]
      });
      return results && results[0] ? results[0].result : { success: false };
    }

    case 'upload_file': {
      const tabId = params.tabId || (await getActiveTabId());
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: (sel, base64Data, fileName, mimeType) => {
          let input = document.querySelector(sel);
          if (!input) {
            input = document.querySelector('input[type="file"]');
          }
          if (!input) return { success: false, error: 'File input not found' };

          try {
            const binaryString = atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: mimeType });
            const file = new File([blob], fileName, { type: mimeType });
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            return { success: true, fileName: file.name, fileSize: file.size };
          } catch (e) {
            return { success: false, error: e.message || String(e) };
          }
        },
        args: [params.selector, params.base64Data, params.fileName, params.mimeType]
      });
      return results && results[0] ? results[0].result : { success: false };
    }

    case 'inspect_contra': {
      const tabId = params.tabId || (await getActiveTabId());
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          const buttons = Array.from(document.querySelectorAll('button, [role="button"], a'))
            .map(b => (b.innerText || '').trim())
            .filter(t => t.length > 0 && t.length < 50);

          const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
            .map(h => h.innerText.trim())
            .filter(t => t.length > 0);

          const inputs = Array.from(document.querySelectorAll('input, textarea'))
            .map(i => ({ placeholder: i.placeholder, name: i.name, type: i.type, value: i.value }));

          return {
            title: document.title,
            url: window.location.href,
            headings: headings.slice(0, 15),
            buttons: Array.from(new Set(buttons)).slice(0, 30),
            inputs: inputs.slice(0, 15)
          };
        }
      });
      return results && results[0] ? results[0].result : null;
    }

    case 'contra_eval': {
      const tabId = params.tabId || (await getActiveTabId());
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: (cmd, payload = {}) => {
          try {
            if (cmd === 'click_containing') {
              const text = (payload.text || '').toLowerCase().trim();
              const all = Array.from(document.querySelectorAll('*'));
              const matches = all.filter(el => {
                const t = (el.innerText || el.textContent || '').trim().toLowerCase();
                return el.children.length === 0 && t.includes(text);
              });
              const target = matches[0] || all.find(el => (el.innerText || el.textContent || '').toLowerCase().includes(text));
              if (target) {
                const clickable = target.closest('button, [role="button"], [role="option"], a, div, li, span') || target;
                clickable.scrollIntoView({ block: 'center' });
                clickable.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
                clickable.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
                clickable.click();
                return { success: true, text: (clickable.innerText || clickable.textContent || '').slice(0, 100) };
              }
              return { success: false, error: 'Text not found: ' + text };
            }

            if (cmd === 'get_links') {
              const elements = Array.from(document.querySelectorAll('a, button, [role="button"]'));
              return elements.map(a => ({
                text: (a.innerText || a.textContent || '').trim().slice(0, 50),
                href: a.href || a.getAttribute('href') || '',
                tag: a.tagName,
                role: a.getAttribute('role') || ''
              })).filter(a => a.text.length > 0 && a.text.length < 50);
            }

            if (cmd === 'get_dialog_info') {
              const dialog = document.querySelector('[role="dialog"]') || document.body;
              return {
                text: dialog.innerText.slice(0, 3000),
                inputs: Array.from(dialog.querySelectorAll('input, textarea')).map(i => ({
                  name: i.name,
                  placeholder: i.placeholder,
                  value: i.value,
                  type: i.type,
                  className: i.className
                })),
                buttons: Array.from(dialog.querySelectorAll('button, [role="button"], a, div[role="option"]')).map(b => (b.innerText || '').trim()).filter(Boolean)
              };
            }

            if (cmd === 'get_skills_html') {
              const input = document.querySelector('input[name="skills"]') || document.querySelector('input[placeholder*="skill" i]');
              if (!input) return { error: 'No skill input' };
              const container = input.parentElement ? input.parentElement.parentElement : null;
              return {
                inputHTML: input.outerHTML,
                containerHTML: container ? container.outerHTML.slice(0, 1000) : ''
              };
            }

            if (cmd === 'fill_contra_project_advanced') {
              // 1. Fill editor content
              const editor = document.querySelector('[contenteditable="true"]') || document.querySelector('.ProseMirror') || document.querySelector('[role="textbox"]');
              let editorSet = false;
              if (editor) {
                editor.focus();
                editor.innerHTML = `<p>${payload.bodyText || ''}</p>`;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
                editorSet = true;
              }

              // 2. Add skill
              let skillSet = false;
              const skillInput = document.querySelector('input[name="skills"]') || document.querySelector('input[placeholder*="skill" i]');
              if (skillInput && payload.skill) {
                skillInput.focus();
                const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                nativeSetter.call(skillInput, payload.skill);
                skillInput.dispatchEvent(new Event('input', { bubbles: true }));
                skillInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                skillInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                skillSet = true;
              }

              // 3. Checkbox
              const check = document.querySelector('input[type="checkbox"]');
              if (check) {
                if (!check.checked) check.click();
              }

              return {
                editorFound: editorSet,
                skillInputFound: skillSet,
                checkboxFound: Boolean(check),
                checkboxChecked: check ? check.checked : false
              };
            }

            if (cmd === 'set_input_value') {
              const el = document.querySelector(payload.selector);
              if (!el) return { success: false, error: 'Input not found: ' + payload.selector };
              el.focus();
              const isTextArea = el.tagName === 'TEXTAREA';
              const proto = isTextArea ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
              const nativeSetter = Object.getOwnPropertyDescriptor(proto, 'value').set;
              nativeSetter.call(el, payload.value);
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
              return { success: true, value: el.value };
            }

            return { success: false, error: 'Unknown cmd: ' + cmd };
          } catch (e) {
            return { success: false, error: e.message || String(e) };
          }
        },
        args: [params.cmd, params.payload]
      });
      return results && results[0] ? results[0].result : null;
    }

    default:
      return undefined;
  }
}
