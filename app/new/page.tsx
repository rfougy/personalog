import { createClient } from '@/utils/supabase/server';
import { CreateEntryButton } from '../supabase-data/components';
import { MarkdownEditor } from './components/markdown-editor';

export default async function NewPage() {
  const supabase = await createClient();

  const { data: session, error } = await supabase.auth.getUser();
  const userId = session.user?.id;

  return (
    <main className="min-h-screen bg-gray-100">
      <h2>New Page</h2>
      <MarkdownEditor />
    </main>
  );
}
