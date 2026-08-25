import { createHash, randomBytes } from 'crypto';

export function generateApiKey(): string {
  const prefix = process.env.API_KEY_PREFIX || 'sk_';
  const randomPart = randomBytes(32).toString('hex');
  return `${prefix}${randomPart}`;
}

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

export function verifyApiKey(providedKey: string, hashedKey: string): boolean {
  return hashApiKey(providedKey) === hashedKey;
}

export function extractApiKeyFromHeader(authHeader?: string): string | null {
  if (!authHeader) return null;
  if (!authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}

export function parsePermissions(permissionsJson: string): string[] {
  try {
    return JSON.parse(permissionsJson);
  } catch {
    return [];
  }
}

export function hasPermission(permissions: string[], required: string): boolean {
  return permissions.includes(required) || permissions.includes('*');
}
