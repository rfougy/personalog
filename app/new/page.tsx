import { createClient } from '@/utils/supabase/server';
import { MarkdownEditor } from './components/markdown-editor';

export default async function NewPage() {
  const supabase = await createClient();

  const { data: session, error } = await supabase.auth.getUser();
  const userId = session.user?.id;

  return (
    <main className="min-h-screen">
      <h2>New Entry</h2>
      <MarkdownEditor />
    </main>
  );
}
