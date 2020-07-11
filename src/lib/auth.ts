import { hash, compare } from 'bcrypt';
import Iron from '@hapi/iron';
import ms from 'ms';
import { AuthorizationError } from './error';

const sessionSecret = process.env.SESSION_SECRET;
const sessionMaxAge = ms(process.env.SESSION_MAX_AGE);

export interface Session {
  id: number;
  createdAt: number;
}

export function hashPassword(password: string) {
  const saltRounds = 10;
  return hash(password, saltRounds);
}

export function validatePassword(inputPassword: string, passwordHash: string) {
  return compare(inputPassword, passwordHash);
}

export async function createSession(session: Session) {
  return Iron.seal(session, sessionSecret, Iron.defaults);
}

export async function deserializeSession(sessionToken: string) {
  const session: Session = await Iron.unseal(
    sessionToken,
    sessionSecret,
    Iron.defaults
  );

  if (isNaN(session.id) || isNaN(session.createdAt)) {
    throw new AuthorizationError('Invalid session');
  }

  const expiresAt = session.createdAt + sessionMaxAge;

  if (Date.now() > expiresAt) {
    throw new AuthorizationError('Session expired');
  }

  return session;
}
