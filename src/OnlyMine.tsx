import { Switch, Inline, Text, Card } from '@sanity/ui';
import { useCurrentUser } from '@sanity/sdk-react';
import { Dispatch, SetStateAction } from 'react';

type OnlyMineProps = {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
};

export function OnlyMine({ userId, setUserId }: OnlyMineProps) {
  const currentUser = useCurrentUser();

  return (
    <Card border padding={2}>
      <Inline space={2}>
        <Text size={1} as="label" htmlFor="only-mine">
          Only mine
        </Text>
        <Switch
          id="only-mine"
          disabled={!currentUser}
          checked={userId === currentUser?.id}
          onClick={() => {
            if (currentUser) {
              setUserId((currentId) =>
                currentId === currentUser.id ? null : currentUser.id
              );
            }
          }}
        />
      </Inline>
    </Card>
  );
}
