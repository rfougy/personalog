import { createClient } from '@/utils/supabase/server';

interface UserProfileProps {
  params: {
    username: string;
  };
}

export default async function UserProfile({ params }: UserProfileProps) {
  const supabase = await createClient();

  const { username } = await params;

  // fetch profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  const name = profile?.nickname
    ? profile?.nickname
    : profile?.name.split(' ')[0];

  // fetch user
  const {
    data: { user_id },
    error: userError,
  } = await supabase
    .from('users_profiles')
    .select('user_id')
    .eq('profile_id', profile.id)
    .single();

  // fetch entries
  const { data: entries, error: entriesError } = await supabase
    .from('entries')
    .select('*')
    .eq('created_by', user_id);

  return profileError ? (
    <div>
      <h1>User not found</h1>
      <p>{profileError.message}</p>
    </div>
  ) : (
    <main className="min-h-screen flex flex-col gap-4">
      <h2 className="font-bold">{name}'s Personalog</h2>
    </main>
  );
}
