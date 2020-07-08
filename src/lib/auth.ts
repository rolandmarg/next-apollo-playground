import Iron from '@hapi/iron'

const sessionSecret = process.env.SESSION_SECRET as string
const sessionMaxAge = process.env.SESSION_MAX_AGE as string

export interface Session {
  id: string
  email: string
}

export async function encryptSession(session: Session) {
  const obj = {
    ...session,
    createdAt: Date.now(),
  }

  return Iron.seal(obj, sessionSecret, Iron.defaults)
}

export async function decryptSession(sessionToken: string) {
  const session = await Iron.unseal(sessionToken, sessionSecret, Iron.defaults)

  const expiresAt = (session.createdAt + Number(sessionMaxAge)) * 1000

  if (Date.now() < expiresAt) {
    return session
  }
}
