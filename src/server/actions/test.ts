'use server';

import { getUser } from '../auth';

export async function testAction(text: string) {
  const user = await getUser();

  console.log(user, text);
}
