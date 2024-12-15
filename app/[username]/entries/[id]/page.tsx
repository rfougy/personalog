import { fetchAndFilterAction } from '@/actions/actions';
import { MarkdownContent } from '@/components/markdown-content';
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
      <h2>{entry.title}</h2>
      <div className="border" />
      <MarkdownContent
        content={entry.content ? entry.content : 'Entry content not found.'}
      />
    </article>
  );
}
