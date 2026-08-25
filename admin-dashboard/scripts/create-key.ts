import { generateApiKey, hashApiKey } from '../backend/src/lib/auth.js';
import { db, initializeDatabase } from '../backend/src/db/index.js';
import { apiKeys } from '../backend/src/db/schema.js';
import { randomUUID } from 'crypto';

async function main() {
  await initializeDatabase();

  const args = process.argv.slice(2);
  const nameArg = args.find((arg) => arg.startsWith('--name='))?.replace('--name=', '');
  const name = nameArg || 'Development Key';
  const permissions = ['*'];

  const key = generateApiKey();
  const hashedKey = hashApiKey(key);

  const keyRecord = {
    id: randomUUID(),
    key: hashedKey,
    name,
    permissions: JSON.stringify(permissions),
    active: true,
    lastUsed: null,
    createdAt: new Date(),
  };

  db.insert(apiKeys).values(keyRecord).run();

  console.log('\n✓ API Key Created Successfully\n');
  console.log(`Name: ${name}`);
  console.log(`Key: ${key}`);
  console.log(`Permissions: ${permissions.join(', ')}`);
  console.log('\nStore this key safely. You won\'t be able to see it again.');
  console.log(`Use it in requests: Authorization: Bearer ${key}\n`);
}

main().catch(console.error);
