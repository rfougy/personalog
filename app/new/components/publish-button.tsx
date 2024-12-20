'use client';

import { Button } from '@/components/ui/button';
import { insertAction } from '@/actions/actions';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/database.types';

interface CreateEntryButtonProps {
  userId: string;
  title: string;
  content: string;
}

export function PublishButton({
  userId,
  title,
  content,
}: CreateEntryButtonProps) {
  const { toast } = useToast();

  const createEntry = async () => {
    const entry = await insertAction<Tables<'entries'>[]>('entries', {
      title: title,
      content: content,
      created_by: userId,
    });

    const entryId = entry && entry[0].id;

    await insertAction<Tables<'users_entries'>[]>('users_entries', {
      entry_id: entryId,
      user_id: userId,
    });

    toast({
      title: `'${title}' Created.`,
      description: `user: ${userId}, content: ${content}`,
    });
  };

  return (
    <Button type="submit" variant={'outline'} onClick={createEntry}>
      Publish
    </Button>
  );
}
