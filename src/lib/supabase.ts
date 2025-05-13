import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUAPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error("Please provide the credentials for supabase.");
}

export const supabase = createClient(url, key);
