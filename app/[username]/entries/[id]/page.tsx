import { fetchAndFilterAction } from '@/actions/actions';
import { Tables } from '@/database.types';

type EntryProps = Promise<{
  id: string;
}>;

export default async function Entry(props: { params: EntryProps }) {
  const { id } = await props.params;

  const entry = await fetchAndFilterAction<Tables<'entries'>>(
    true,
    'entries',
    '*',
    'id',
    id
  );

  if (!entry) {
    return <p>Entry not found.</p>;
  }

  return (
    <article className="min-h-screen flex flex-col gap-4">
      <p>{entry.title}</p>
      <p>{entry.content}</p>
    </article>
  );
}
