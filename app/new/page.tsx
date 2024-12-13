import { createClient } from '@/utils/supabase/server';
import { MarkdownEditor } from './components/markdown-editor';
import ErrorPage from '@/components/error-page';

export default async function NewPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) console.error('Error fetching user session:', authError);

  const userId = user?.id || null;

  return userId ? (
    <main className="min-h-screen flex flex-col gap-4">
      <h2 className="font-bold">What's On Your Mind?</h2>
      <MarkdownEditor userId={userId} />
    </main>
  ) : (
    <ErrorPage />
  );
}
