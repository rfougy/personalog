'use client';

import { Button } from '@/components/ui/button';
import { insertAction } from '../../actions/actions';
import { useToast } from '@/hooks/use-toast';

export const CreateEntryButton: React.FC<{
  userId: string;
  title: string;
  content: string;
}> = ({ userId, title, content }) => {
  const { toast } = useToast();

  const createEntry = async () => {
    console.log('content: ', content);
    const entry = await insertAction('entries', {
      title: title,
      content: content,
      created_by: userId,
    });
    console.log('Insert Result:', entry);

    const entryId = entry && entry[0].id;

    const usersEntries = await insertAction('users_entries', {
      entry_id: entryId,
      user_id: userId,
    });

    toast({
      title: `'${title}' Created.`,
      description: `user: ${userId}, content: ${content}`,
    });

    console.log('Insert Result:', usersEntries);
  };

  return (
    <Button type="submit" variant={'outline'} onClick={createEntry}>
      Publish
    </Button>
  );
};

export const CreateLogButton: React.FC<{ userId: string }> = ({ userId }) => {
  const createEntry = async () => {
    const log = await insertAction('logs', {
      content: 'Test Log Submitted from App',
      created_by: userId,
    });
    console.log('Insert Result:', log);

    const logId = log && log[0].id;

    const usersLogs = await insertAction('users_logs', {
      log_id: logId,
      user_id: userId,
    });
    console.log('Insert Result:', usersLogs);
  };

  return <button onClick={createEntry}>Create Test Log</button>;
};
