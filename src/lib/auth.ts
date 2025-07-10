import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}
