import { DocumentHandle, useEditDocument, useUsers } from '@sanity/sdk-react';
import { Inline, Avatar, Stack, Text, Button } from '@sanity/ui';

type AssigneeProps = {
  value: string;
  handle: DocumentHandle;
};

export function Assignee({ value, handle }: AssigneeProps) {
  const { data: users } = useUsers();
  const editAssignee = useEditDocument({ ...handle, path: 'assignee' });

  return (
    <Stack space={3}>
      <Text weight="medium">Assignee</Text>
      <Inline space={1}>
        {users?.map((user) => (
          <Button
            key={user.sanityUserId}
            onClick={() => editAssignee(user.sanityUserId)}
            padding={0}
            mode="bleed"
          >
            <Avatar
              status={value === user.sanityUserId ? 'online' : 'inactive'}
              size={2}
              src={user.profile?.imageUrl}
            />
          </Button>
        ))}
      </Inline>
    </Stack>
  );
}
