'use client';

import { insertAction } from '../actions';

export const CreateEntryButton = ({ userId }: { userId: string }) => {
  const createEntry = async () => {
    const result = await insertAction('entries', {
      title: 'Test Entry Submitted from App',
      created_by: userId,
    });
    console.log('Insert Result:', result);
  };

  return <button onClick={createEntry}>Create Test Entry</button>;
};
