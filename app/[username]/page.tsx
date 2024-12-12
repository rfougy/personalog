import { createClient } from '@/utils/supabase/server';

interface UserProfileProps {
  params: {
    username: string;
  };
}

export default async function UserProfile({ params }: UserProfileProps) {
  const supabase = await createClient();

  const { username } = params;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  const name = profile?.nickname
    ? profile?.nickname
    : profile?.name.split(' ')[0];

  return error ? (
    <div>
      <h1>User not found</h1>
      <p>{error.message}</p>
    </div>
  ) : (
    <main className="min-h-screen flex flex-col gap-4">
      <h2 className="font-bold">{name}'s Personalog</h2>
    </main>
  );
}
