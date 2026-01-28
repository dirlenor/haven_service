import { createClient } from "@supabase/supabase-js";

const normalizeEnv = (value) =>
  value?.trim().replace(/^["']|["']$/g, "");

const supabaseUrl = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabaseServer =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false
        }
      })
    : null;
