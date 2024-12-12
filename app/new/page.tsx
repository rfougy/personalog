import { createClient } from '@/utils/supabase/server';
import { MarkdownEditor } from './components/markdown-editor';

export default async function NewPage() {
  const supabase = await createClient();

  const { data: session, error } = await supabase.auth.getUser();
  const userId = session.user?.id;

  return (
    <main className="min-h-screen flex flex-col gap-4">
      <h2 className="font-bold">What's On Your Mind?</h2>
      <MarkdownEditor userId={userId} />
    </main>
  );
}
