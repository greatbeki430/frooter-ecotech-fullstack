import { createClient } from "@supabase/supabase-js";
// These allow your app to talk to a real database
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
export const supabase = createClient(supabaseUrl, supabaseKey);
