import { supabase } from './supabaseClient';

export async function submitVisitorMessage(
  content: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) {
    return { ok: false, error: 'not_configured' };
  }

  const { error } = await supabase.from('messages').insert({ content });

  if (error) {
    console.error('[messageApi] insert error:', error.message);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
