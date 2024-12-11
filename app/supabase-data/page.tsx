import { createClient } from '@/utils/supabase/server';

export default async function SupabaseDataPage() {
  const supabase = await createClient();

  const [
    { data: entries, error: entriesError },
    { data: hashtags, error: hashtagsError },
    { data: logs, error: logsError },
    { data: metadata, error: metadataError },
    { data: entriesHashtags, error: entriesHashtagsError },
    { data: entriesLogs, error: entriesLogsError },
    { data: entriesMetadata, error: entriesMetadataError },
  ] = await Promise.all([
    supabase.from("entries").select("*"),
    supabase.from("hashtags").select("*"),
    supabase.from("logs").select("*"),
    supabase.from("metadata").select("*"),
    supabase.from("entries_hashtags")
      .select("entry_id, hashtag_id, hashtags(*), entries(*)"),
    supabase.from("entries_logs")
      .select("entry_id, log_id, logs(*), entries(*)"),
    supabase.from("entries_metadata")
      .select("entry_id, metadata_id, metadata(*), entries(*)"),
  ]);

  // Log errors if any
  if (entriesError) console.error("Entries Error:", entriesError);
  if (hashtagsError) console.error("Hashtags Error:", hashtagsError);
  if (logsError) console.error("Logs Error:", logsError);
  if (metadataError) console.error("Metadata Error:", metadataError);
  if (entriesHashtagsError) console.error("Entries Hashtags Error:", entriesHashtagsError);
  if (entriesLogsError) console.error("Entries Logs Error:", entriesLogsError);
  if (entriesMetadataError) console.error("Entries Metadata Error:", entriesMetadataError);

  // Combine data for rendering, including data from junction tables and related entries
  const combinedData = {
    entries,
    hashtags,
    logs,
    metadata,
    entriesHashtags,
    entriesLogs,
    entriesMetadata,
  };

  return <pre>{JSON.stringify(combinedData, null, 2)}</pre>;
}