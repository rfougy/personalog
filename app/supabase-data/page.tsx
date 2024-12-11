import { createClient } from '@/utils/supabase/server';

export default async function SupabaseDataPage() {
  const supabase = await createClient();

  const [
    { data: entries, error: entriesError },
    { data: logs, error: logsError },
    { data: entriesLogs, error: entriesLogsError },
    { data: usersEntries, error: usersEntriesError },
    { data: usersLogs, error: usersLogsError },
  ] = await Promise.all([
    supabase.from('entries').select('*'),
    supabase.from('logs').select('*'),
    supabase
      .from('entries_logs')
      .select('entry_id, log_id, logs(*), entries(*)'),
    supabase.from('users_logs').select('*'),
    supabase.from('users_entries').select('*'),
  ]);

  // Log errors if any
  if (entriesError) console.error('Entries Error:', entriesError);
  if (logsError) console.error('Logs Error:', logsError);
  if (entriesLogsError) console.error('Entries Logs Error:', entriesLogsError);
  if (usersEntriesError)
    console.error('Users Entries Error:', usersEntriesError);
  if (usersLogsError) console.error('Users Logs Error:', usersLogsError);

  // Combine data for rendering, including data from junction tables and related entries
  const combinedData = {
    entries,
    logs,
    entriesLogs,
    usersEntries,
    usersLogs,
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>Create Data via User Account</h2>
        <div className="border bg-white" />
      </div>
      <div>
        <h2>Raw Supabase Data</h2>
        <pre>{JSON.stringify(combinedData, null, 2)}</pre>
      </div>
    </div>
  );
}
