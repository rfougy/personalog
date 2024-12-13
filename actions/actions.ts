'use server';

import { createClient } from '@/utils/supabase/server';

export const insertAction = async (
  table: string,
  query: { [key: string]: any }
) => {
  try {
    const supabase = await createClient();

    const { data: session, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('Error fetching user session:', authError);
      return null;
    }

    if (!session) {
      console.error(
        'No user session found. Please log in to perform this action.'
      );
      return null;
    }

    const { data, error: insertError } = await supabase
      .from(table)
      .insert([query])
      .select();

    if (insertError) {
      console.error(`Error inserting data into table "${table}":`, insertError);
      return null;
    }

    console.log(`Data successfully inserted into table "${table}":`, data);
    return data;
  } catch (err) {
    console.error('Unexpected error occurred:', err);
    return null;
  }
};

export const fetchAndFilterAction = async (
  fetchSingleData: boolean,
  table: string,
  selection: string,
  filterBy: string,
  filterVal: string
): Promise<any | null> => {
  try {
    const supabase = await createClient();

    const { data: session, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('Error fetching user session:', authError);
      return null;
    }

    if (!session) {
      console.error(
        'No user session found. Please log in to perform this action.'
      );
      return null;
    }

    const { data, error: fetchError } = fetchSingleData
      ? await supabase
          .from(table)
          .select(selection)
          .eq(filterBy, filterVal)
          .single()
      : await supabase.from(table).select(selection).eq(filterBy, filterVal);

    if (fetchError) {
      console.error(`Error fetching data into table "${table}":`, fetchError);
      return null;
    }

    console.log(`Data successfully fetched from table "${table}":`, data);
    return data;
  } catch (err) {
    console.error('Unexpected error occurred:', err);
    return null;
  }
};
