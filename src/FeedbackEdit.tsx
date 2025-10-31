import { DocumentHandle, useDocument } from '@sanity/sdk-react';
import { Card, Flex, Stack, Text, Container } from '@sanity/ui';

import { StatusBadge } from './StatusBadge';
import { Sentiment } from './Sentiment';
import { Notes } from './Notes';

type FeedbackEditProps = {
  selectedFeedback: DocumentHandle;
};

export function FeedbackEdit({ selectedFeedback }: FeedbackEditProps) {
  const { data } = useDocument({ ...selectedFeedback });

  if (!data) {
    return null;
  }

  // Ensure type safety for all fields
  const author = typeof data.author === 'string' ? data.author : '';
  const email = typeof data.email === 'string' ? data.email : '';
  const content = typeof data.content === 'string' ? data.content : '';
  const createdAt =
    typeof data._createdAt === 'string' ? data._createdAt.split('T')[0] : '';
  const status = typeof data.status === 'string' ? data.status : 'pending';
  const sentiment = typeof data.sentiment === 'string' ? data.sentiment : '';
  const notes = typeof data.notes === 'string' ? data.notes : '';
  const assignee = typeof data.assignee === 'string' ? data.assignee : '';

  return (
    <Container width={1}>
      <Card padding={[0, 0, 4, 5]}>
        <Card padding={[0, 0, 4, 5]} radius={3} shadow={[0, 0, 2]}>
          <Stack space={5}>
            <Flex align="center" justify="space-between">
              <Stack space={3}>
                <Text size={3} weight="semibold">
                  {author}
                </Text>
                <Text size={1} muted>
                  {email} {createdAt}
                </Text>
              </Stack>
              <StatusBadge status={status} fontSize={2} />
            </Flex>

            <Stack space={3}>
              <Card padding={4} radius={2} tone="transparent">
                <Text size={3}>{content}</Text>
              </Card>
            </Stack>

            <Sentiment value={sentiment} handle={selectedFeedback} />
            <Notes value={notes} handle={selectedFeedback} />
          </Stack>
        </Card>
      </Card>
    </Container>
  );
}
