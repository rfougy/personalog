'use server';

import { createClient } from '@/utils/supabase/server';

export const insertAction = async (
  table: string,
  query: { [title: string]: any }
) => {
  const supabase = await createClient();

  const { data: session, error } = await supabase.auth.getUser();

  if (session) {
    const { data, error } = await supabase.from(table).insert([query]).select();

    if (error) {
      console.error(`Error creating row in ${table}:`, error);
    } else {
      console.log(`New row created for ${table}:`, data);
      return data;
    }
  } else {
    console.error('Error fetching user data:', error);
  }
};
