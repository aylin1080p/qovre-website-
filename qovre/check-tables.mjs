import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
  console.log("Inspecting contact_submissions columns...");
  // We can't query information_schema easily via client, so we'll try to insert a dummy and see if it works or fails on missing columns
  const testData = {
    name: "Internal Test",
    email: "test@example.com",
    message: "Schema verification"
  };
  const { error: e1 } = await supabase.from('contact_submissions').insert(testData).select();
  if (e1) {
     console.log("contact_submissions test insert failed:", e1.message);
  } else {
     console.log("contact_submissions schema looks compatible");
  }

  console.log("Inspecting chat_usage...");
  const today = new Date().toISOString().split('T')[0];
  const { data: d2, error: e2 } = await supabase.rpc('increment_chat_usage', { usage_date: today });
  if (e2) {
    console.log("increment_chat_usage call failed:", e2.message);
  } else {
    console.log("increment_chat_usage works correctly, count:", d2);
  }
}

inspectSchema();
