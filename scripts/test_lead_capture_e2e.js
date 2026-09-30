const { handleApiRequest, getDbPath } = require('../lib/db-api-handler');
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

async function runE2ETest() {
  console.log('=== KAWAKI STUDIOS LEAD CAPTURE & ADMIN E2E TEST ===\n');

  // Helper to simulate request/response against handleApiRequest
  function mockRequest(method, url, body = null, headers = {}) {
    return new Promise((resolve) => {
      const parsedUrl = new URL(url, 'http://localhost');
      const req = {
        method,
        url,
        headers: {
          'content-type': 'application/json',
          host: 'localhost',
          ...headers
        }
      };

      let statusCode = 200;
      let responseHeaders = {};
      let responseBody = '';

      const res = {
        setHeader(name, value) {
          responseHeaders[name] = value;
        },
        writeHead(code, head) {
          statusCode = code;
          if (head) Object.assign(responseHeaders, head);
        },
        status(code) {
          statusCode = code;
          return this;
        },
        json(data) {
          responseBody = JSON.stringify(data);
          resolve({ status: statusCode, body: data, raw: responseBody });
        },
        end(data) {
          responseBody = data || '';
          try {
            const parsed = JSON.parse(responseBody);
            resolve({ status: statusCode, body: parsed, raw: responseBody });
          } catch {
            resolve({ status: statusCode, body: responseBody, raw: responseBody });
          }
        }
      };

      // Handle request
      handleApiRequest(req, res, parsedUrl, body);
    });
  }

  // 1. Submit a Contact Form / Discovery Call lead
  console.log('Test 1: Submitting new Discovery Call lead via POST /api/contact...');
  const testContactPayload = {
    name: 'Julian Sterling',
    email: 'julian@sterling-luxury.com',
    contact: '@julian_telegram',
    service: 'Headless Shopify Development',
    stage: 'Sapling (Growth Stage / Scale)',
    budget: '$20k',
    notes: 'Looking to overhaul our multi-region Shopify storefront with sub-second page transitions and custom headless cart.',
    slot_date: 'Wednesday, Oct 7',
    slot_time: '04:00 PM'
  };

  const contactRes = await mockRequest('POST', '/api/contact', testContactPayload);
  console.log('POST /api/contact status:', contactRes.status);
  console.log('POST /api/contact response:', contactRes.body);
  if (!contactRes.body.success || !contactRes.body.data?.id) {
    throw new Error('Contact submission failed!');
  }
  const createdLeadId = contactRes.body.data.id;
  console.log('✓ Successfully created lead with ID:', createdLeadId);

  // 2. Fetch leads via GET /api/leads
  console.log('\nTest 2: Fetching leads via GET /api/leads...');
  const getRes = await mockRequest('GET', '/api/leads');
  console.log('GET /api/leads status:', getRes.status);
  console.log('Total leads found:', getRes.body.data?.length || 0);
  const foundLead = getRes.body.data?.find(l => l.id === createdLeadId);
  if (!foundLead) {
    throw new Error('Created lead not found in GET /api/leads!');
  }
  console.log('✓ Lead verified in pipeline:', {
    id: foundLead.id,
    name: foundLead.name,
    email: foundLead.email,
    service: foundLead.service,
    slot: `${foundLead.slot_date} at ${foundLead.slot_time}`,
    status: foundLead.status
  });

  // 3. Update lead status via PATCH /api/leads/:id
  console.log(`\nTest 3: Updating status to "contacted" via PATCH /api/leads/${createdLeadId}...`);
  const patchRes = await mockRequest('PATCH', `/api/leads/${createdLeadId}`, { status: 'contacted' });
  console.log('PATCH /api/leads/:id status:', patchRes.status);
  console.log('PATCH response:', patchRes.body);
  if (!patchRes.body.success || patchRes.body.data?.status !== 'contacted') {
    throw new Error('Failed to update lead status!');
  }
  console.log('✓ Lead status updated to "contacted".');

  // 4. Verify in SQLite Database directly
  console.log('\nTest 4: Direct SQLite verification in canonical database (' + getDbPath() + ')...');
  const db = new DatabaseSync(getDbPath(), { readOnly: true });
  const row = db.prepare('SELECT * FROM leads WHERE id = ?').get(createdLeadId);
  console.log('Direct SQLite query result:', row);
  if (!row || row.status !== 'contacted') {
    throw new Error('Direct SQLite verification failed!');
  }
  console.log('✓ Direct SQLite row verified successfully.');
  db.close();

  // 5. Clean up test lead
  console.log(`\nTest 5: Cleaning up test lead via DELETE /api/leads/${createdLeadId}...`);
  const deleteRes = await mockRequest('DELETE', `/api/leads/${createdLeadId}`);
  console.log('DELETE status:', deleteRes.status);
  console.log('DELETE response:', deleteRes.body);
  console.log('✓ Test lead cleaned up successfully.');

  console.log('\n=== ALL E2E LEAD CAPTURE & ADMIN TESTS PASSED! ===');
}

runE2ETest().catch(err => {
  console.error('\n❌ E2E TEST FAILED:', err);
  process.exit(1);
});
