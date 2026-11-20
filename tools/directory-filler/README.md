# Kawaki Directory Filler

A small Chrome extension that fills directory listing forms, article editors and project forms with the Kawaki Studios profile and content, one page at a time. It does not submit anything, solve CAPTCHAs, or touch passwords and verification codes. You check the form and press submit.

## Install (once)

1. In Chrome open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and choose this folder: `tools/directory-filler`.
3. Pin the extension (puzzle icon, then the pin) so the button stays visible.

## Before you start

Open the **Profile** tab and add:

- the exact **street address** and **PIN code** of the studio, written the same way as on your Google profile
- your **Facebook** page, if you have one
- a check that the **Instagram** link is the handle you really use (the site lists `kawaki.agency`)

Use the same text on every directory. Matching name, address and phone is what search engines reward.

## Use

1. **Directories tab:** paste your list, one per line, as `Name | https://url` or just the URL. Press **Open it**.
2. Create the account on the site yourself and sign in.
3. Open the business form, then press **Fill this page** or `Alt+Shift+F`. Filled fields get a red outline.
4. Read what it filled, fix anything wrong, tick the terms box, solve the CAPTCHA, enter any email or SMS code, and press submit.
5. Back in the extension press **Mark done** (or **Skip**). It moves to the next directory.
6. **Export CSV** gives you a file in the same columns as `data/directory_submissions_tracker.csv`.

If a field was not recognised, the popup lists it under "Not filled". Use the **Copy** buttons on the Fill tab to paste the rest by hand.

## Articles and projects

The **Articles** tab holds your 12 case studies and every published blog post, taken from the site itself (nothing is retyped). After you publish a new post, refresh the list:

```
node scripts/export-directory-content.js
```

then reload the extension at `chrome://extensions`.

- **Projects:** pick a case study, open the site's project form, press **Fill this form**. It fills the title, description, live link, category, tools and role, and **Attach images** adds the screenshots as JPEG. Three entries (Pixza, Kova, the ROI calculator) are labelled as the studio's own products or concepts: say so on the other site, do not present them as client work.
- **Articles:** pick a post, open the site's editor, press **Fill this form**. It fills the title, subtitle, tags, canonical link, cover image and the full text (formatted, or plain with **Fill as plain text**).
- **Copy buttons** give the title, summary, markdown, HTML and links for editors it cannot fill.

### Do not post the same article everywhere

Search engines treat copies of the same text as duplicates, and the other site can outrank yours. Follow these rules:

1. **Publish on kawaki.co.in first and let it be indexed** (a week is enough).
2. **Use the canonical link box when a site has one.** Dev.to, Hashnode and Medium's import tool support it. The extension fills it with your post's address, so the original keeps the credit.
3. **If a site has no canonical box,** do not paste the full article. Post the first section or a shorter rewrite, and end with a link to the full post.
4. **Keep the source line on** ("Originally published on kawaki.co.in" with the link). It gives you a real backlink.
5. **Projects are different:** a case study summary on Behance, Contra or Clutch is fine, since each site shows it as a portfolio entry. Link back to the case study on kawaki.co.in.
6. Only post what is already on your site. Do not add results, numbers or client quotes that the case study does not contain.

## What it will not touch

Passwords, usernames, CAPTCHAs, verification and one-time codes, checkboxes and radio buttons, file uploads, dates, and any field that already has text (unless you press **Replace existing**).

## Privacy

- It asks for three permissions: the tab you click it on (`activeTab`), the ability to fill that page (`scripting`), and `storage` for your profile and list.
- It runs only when you press the button or the shortcut. It does not read other tabs, and nothing is sent anywhere.
- Your profile and list are saved in this browser only.

## Changing the defaults

The starting profile is in `defaults.js`. Edit it there, or in the Profile tab (the tab wins once you have changed a field; press **Reset to defaults** to go back).
