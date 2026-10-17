/**
 * KAWAKI STUDIOS — GOOGLE SHEETS & INSTANT EMAIL LEAD AUTOMATION
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet: "Kawaki Studios - Inbound Leads"
 * 2. In Google Sheets menu, click: Extensions > Apps Script
 * 3. Delete any default code in Code.gs, paste this entire file, and click Save (Ctrl+S / Cmd+S).
 * 4. Click the blue "Deploy" button (top right) > "New deployment"
 * 5. Under "Select type" (gear icon), select "Web app"
 * 6. Set Description: "Kawaki Leads Webhook v1"
 * 7. Set "Execute as": "Me (your google account)"
 * 8. Set "Who has access": "Anyone"  <-- CRITICAL for webhook to receive submissions from website
 * 9. Click "Deploy". Grant permissions if prompted (Click Advanced > Go to Kawaki Leads Webhook (unsafe) > Allow).
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into your Kawaki Admin Panel (Client Inquiries > Configure Google Sheets)
 *     OR add to Vercel Environment Variables as GOOGLE_SHEETS_WEBHOOK_URL.
 */

// Target email address where notifications will be sent
var NOTIFICATION_EMAIL = "ks05460@gmail.com";

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other concurrent executions to finish
  lock.tryLock(10000);

  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(raw);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Initialize Headers if sheet is brand new
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp (IST)",
        "Client Name",
        "Email Address",
        "Phone / Contact",
        "Service Interested",
        "Stage / Package",
        "Budget Range",
        "Booked Date",
        "Booked Time",
        "Status",
        "Lead ID",
        "Client Project Notes"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FC4625");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
      sheet.setRowHeight(1, 36);
    }

    // Timestamp in Indian Standard Time (IST)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    var leadId = data.id || ("lead_" + new Date().getTime());
    var name = String(data.name || "").trim() || "Anonymous Client";
    var email = String(data.email || "").trim();
    var contact = String(data.contact || "").trim();
    var service = String(data.service || "").trim() || "General Inquiry";
    var stage = String(data.stage || data.package || "").trim();
    var budget = String(data.budget || "").trim() || "Not specified";
    var slotDate = String(data.slot_date || data.slotDate || data.selectedDate || "").trim();
    var slotTime = String(data.slot_time || data.slotTime || data.selectedTime || "").trim();
    var status = String(data.status || "new").trim();
    var notes = String(data.notes || "").trim();

    function safeVal(val) {
      if (!val) return "";
      var str = String(val).trim();
      if (/^[+=@\-]/.test(str)) return "'" + str;
      return str;
    }

    // Append lead to spreadsheet
    sheet.appendRow([
      timestamp,
      name,
      email,
      safeVal(contact),
      service,
      stage,
      safeVal(budget),
      slotDate,
      slotTime,
      status,
      leadId,
      notes
    ]);

    // Send Instant Email Notification
    sendLeadEmailNotification({
      timestamp: timestamp,
      name: name,
      email: email,
      contact: contact,
      service: service,
      stage: stage,
      budget: budget,
      slotDate: slotDate,
      slotTime: slotTime,
      notes: notes,
      leadId: leadId
    });

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Lead recorded in Google Sheet and email alert sent.",
      id: leadId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: [],
        total: 0
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Read all rows
    var values = sheet.getRange(2, 1, lastRow - 1, 12).getValues();
    var leads = [];

    // Traverse in reverse order so latest leads appear first
    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      leads.push({
        createdAt: row[0],
        name: row[1],
        email: row[2],
        contact: row[3],
        service: row[4],
        stage: row[5],
        budget: row[6],
        slot_date: row[7],
        slotDate: row[7],
        slot_time: row[8],
        slotTime: row[8],
        status: row[9] || "new",
        id: row[10] || ("lead_" + (i + 1)),
        notes: row[11]
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: leads,
      total: leads.length
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendLeadEmailNotification(lead) {
  var subject = "🔥 New Kawaki Lead: " + lead.name + " (" + (lead.service || lead.budget || "Inquiry") + ")";

  var meetingSnippet = "";
  if (lead.slotDate && lead.slotTime) {
    meetingSnippet = `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #888899; font-weight: 500;">Scheduled Discovery Call</td>
        <td style="padding: 12px; border-bottom: 1px solid #22222E; font-weight: 700; color: #F59E0B;">
          📅 ${lead.slotDate} at ⏰ ${lead.slotTime} (IST)
        </td>
      </tr>
    `;
  }

  var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Kawaki Lead</title>
    </head>
    <body style="margin: 0; padding: 24px; background-color: #0B0B0E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
      <div style="max-width: 600px; margin: 0 auto; background: #13131A; border: 1px solid #27273A; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
        
        <!-- Header Strip -->
        <div style="background: linear-gradient(135deg, #FC4625 0%, #FF6B4A 100%); padding: 28px 24px; text-align: left;">
          <div style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; background: rgba(0,0,0,0.25); color: #FFFFFF; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
            ● HIGH-INTENT INQUIRY
          </div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF;">
            KAWAKI STUDIOS
          </h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.9);">
            New client inquiry received on website (${lead.timestamp})
          </p>
        </div>

        <!-- Body Content -->
        <div style="padding: 24px;">
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #888899; width: 140px; font-weight: 500;">Client Name</td>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; font-weight: 700; color: #FFFFFF; font-size: 16px;">
                ${lead.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #888899; font-weight: 500;">Email Address</td>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; font-weight: 700; color: #FC4625;">
                <a href="mailto:${lead.email}" style="color: #FC4625; text-decoration: none;">${lead.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #888899; font-weight: 500;">Phone / Telegram</td>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; font-weight: 600; color: #FFFFFF;">
                <a href="tel:${lead.contact}" style="color: #FFFFFF; text-decoration: none;">${lead.contact || 'Not provided'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #888899; font-weight: 500;">Service Required</td>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; font-weight: 600; color: #A1A1AA;">
                ${lead.service || 'General Scoping'}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #888899; font-weight: 500;">Budget Range</td>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; font-weight: 800; color: #10B981; font-size: 15px;">
                ${lead.budget}
              </td>
            </tr>
            ${lead.stage ? `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #888899; font-weight: 500;">Project Stage</td>
              <td style="padding: 12px; border-bottom: 1px solid #22222E; color: #FFFFFF;">
                ${lead.stage}
              </td>
            </tr>
            ` : ''}
            ${meetingSnippet}
            <tr>
              <td style="padding: 12px; color: #888899; font-weight: 500; vertical-align: top;">Client Notes</td>
              <td style="padding: 12px; color: #D4D4D8; line-height: 1.6; font-size: 13px;">
                ${lead.notes ? lead.notes.replace(/\n/g, '<br>') : '<em>No extra notes provided.</em>'}
              </td>
            </tr>
          </table>

          <!-- Actions -->
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #22222E; text-align: center;">
            <a href="mailto:${lead.email}?subject=Regarding%20your%20project%20inquiry%20with%20Kawaki%20Studios" 
               style="display: inline-block; background: #FC4625; color: #FFFFFF; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-right: 8px;">
              ✉️ Reply to ${lead.name}
            </a>
            <a href="https://kawaki.co.in/admin" 
               style="display: inline-block; background: #1C1C26; color: #D4D4D8; border: 1px solid #333346; font-weight: 600; font-size: 13px; padding: 12px 20px; border-radius: 8px; text-decoration: none;">
              Open Admin Dashboard
            </a>
          </div>

          <p style="margin-top: 24px; text-align: center; font-size: 11px; color: #666677; font-family: monospace;">
            Lead ID: ${lead.leadId} • Automatically logged to Google Sheet
          </p>

        </div>
      </div>
    </body>
    </html>
  `;

  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (e) {
    Logger.log("Error sending email: " + e.toString());
  }
}
