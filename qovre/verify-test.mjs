import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySubmission() {
  console.log("Searching for E2E Test User in contact_submissions...");
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('name', 'E2E Test User')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching submission:", error.message);
  } else if (data && data.length > 0) {
    console.log("Submission found:", JSON.stringify(data[0], null, 2));
  } else {
    console.log("Submission not found.");
  }
}

verifySubmission();
