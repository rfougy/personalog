'use client';

import { insertAction } from '../actions';

export const CreateEntryButton = ({ userId }: { userId: string }) => {
  const createEntry = async () => {
    const entryData = await insertAction('entries', {
      title: 'Test Entry Submitted from App',
      created_by: userId,
    });
    console.log('Insert Result:', entryData);

    const entryId = entryData && entryData[0].id;

    const usersEntriesRes = await insertAction('users_entries', {
      entry_id: entryId,
      user_id: userId,
    });
    console.log('Insert Result:', usersEntriesRes);
  };

  return <button onClick={createEntry}>Create Test Entry</button>;
};
