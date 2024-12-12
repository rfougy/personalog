'use client';

import { insertAction } from '../actions';

export const CreateEntryButton = ({ userId }: { userId: string }) => {
  const createEntry = async () => {
    const entry = await insertAction('entries', {
      title: 'Test Entry Submitted from App',
      created_by: userId,
    });
    console.log('Insert Result:', entry);

    const entryId = entry && entry[0].id;

    const usersEntries = await insertAction('users_entries', {
      entry_id: entryId,
      user_id: userId,
    });
    console.log('Insert Result:', usersEntries);
  };

  return <button onClick={createEntry}>Create Test Entry</button>;
};

export const CreateLogButton = ({ userId }: { userId: string }) => {
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
