import { createClient } from "@supabase/supabase-js";

const normalizeEnv = (value) =>
  value?.trim().replace(/^["']|["']$/g, "");

const supabaseUrl = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid throwing in environments without Supabase config (e.g. static preview).
  console.warn("Missing Supabase environment variables.");
} else if (!/^https?:\/\//i.test(supabaseUrl)) {
  console.warn("Supabase URL looks invalid:", supabaseUrl);
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: true
      }
    })
  : null;
