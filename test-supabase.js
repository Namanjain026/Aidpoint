// Test Supabase connection
import { supabase } from './src/lib/supabaseClient.ts';

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('feedback').select('count', { count: 'exact' });
    
    if (error) {
      console.error('Supabase connection error:', error);
      if (error.message.includes('relation "feedback" does not exist')) {
        console.log('❌ The feedback table does not exist in your database.');
        console.log('📝 Please run the SQL from create-feedback-table.sql in your Supabase SQL Editor.');
      }
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Feedback table exists with', data?.length || 0, 'records');
    }
  } catch (err) {
    console.error('Connection test failed:', err);
  }
}

testConnection();