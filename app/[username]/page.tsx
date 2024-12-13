import { fetchAndFilterAction } from '@/actions/actions';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '@/database.types';

interface UserProfileProps {
  params: {
    username: string;
  };
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { username } = await params;

  const profile = await fetchAndFilterAction<Tables<'profiles'>>(
    true,
    'profiles',
    '*',
    'username',
    username
  );

  // Check if profile is null before proceeding
  if (!profile) {
    return <p>Profile not found.</p>; // Handle profile not found
  }

  const name = profile.nickname
    ? profile.nickname
    : profile.name
      ? profile.name.split(' ')[0]
      : 'User';

  const user = await fetchAndFilterAction<{ user_id: string }>(
    true,
    'users_profiles',
    'user_id',
    'profile_id',
    String(profile.id)
  );

  const entries = await fetchAndFilterAction<Tables<'entries'>[]>(
    false,
    'entries',
    '*',
    'created_by',
    user ? user.user_id : ''
  );

  return (
    <main className="min-h-screen flex flex-col gap-4">
      <h2 className="font-bold">{name}'s Personalog</h2>
      <div className="flex flex-col gap-2">
        {entries &&
          entries.map((entry) => (
            <Card
              key={entry.id}
              className="hover:shadow-md transition-shadow hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <CardHeader className="py-4">
                <CardTitle className="text-base">{entry.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
      </div>
    </main>
  );
}
