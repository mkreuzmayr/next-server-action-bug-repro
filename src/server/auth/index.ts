import { cookies, headers } from 'next/headers';
import { verifyRequestOrigin } from 'oslo/request';
import { cache } from 'react';
import { lucia } from './lucia';

// If you comment the following line out, the error goes away
export * from './keycloak';

// If you comment this out, the error does NOT go away
export * from './lucia';

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return null;
  }

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }

  return user;
});

export function checkRequestOrigin() {
  const originHeader = headers().get('Origin');
  const hostHeader = headers().get('Host');

  return !!(
    originHeader &&
    hostHeader &&
    verifyRequestOrigin(originHeader, [hostHeader])
  );
}
