import Iron from '@hapi/iron';
import ms from 'ms';

const sessionSecret = process.env.SESSION_SECRET;
const sessionMaxAge = ms(process.env.SESSION_MAX_AGE);

export interface Session {
  id: number;
  email: string;
  createdAt: number;
}

export async function encryptSession(session: Session) {
  return Iron.seal(session, sessionSecret, Iron.defaults);
}

export async function decryptSession(sessionToken: string) {
  const session: Session = await Iron.unseal(
    sessionToken,
    sessionSecret,
    Iron.defaults
  );

  const expiresAt = session.createdAt + sessionMaxAge;

  if (Date.now() > expiresAt) {
    throw new Error('session expired');
  }

  return session;
}
