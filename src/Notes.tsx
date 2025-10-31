import { type DocumentHandle, useEditDocument } from '@sanity/sdk-react';
import { Stack, Text, TextArea } from '@sanity/ui';

type NotesProps = {
  value: string;
  handle: DocumentHandle;
};

export function Notes({ value, handle }: NotesProps) {
  const editNotes = useEditDocument({ ...handle, path: 'notes' });

  return (
    <Stack space={3}>
      <Text weight="medium">Reviewer Notes</Text>
      <TextArea
        value={value}
        onChange={(e) => editNotes(e.currentTarget.value)}
        placeholder="Add your notes about this feedback..."
        rows={3}
      />
    </Stack>
  );
}
