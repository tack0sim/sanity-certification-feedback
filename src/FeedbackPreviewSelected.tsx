import { useRef } from 'react';
import { DocumentHandle, useDocument } from '@sanity/sdk-react';
import { Box, Stack, Text } from '@sanity/ui';

import { StatusBadge } from './StatusBadge';

type FeedbackPreviewData = {
  _createdAt: string;
  content: string | null;
  author: string | null;
  email: string | null;
  status: string | null;
};

export function FeedbackPreviewSelected(props: DocumentHandle) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { data } = useDocument<FeedbackPreviewData>({ ...props });

  const author = typeof data?.author === 'string' ? data.author : '...';
  const email = typeof data?.email === 'string' ? data.email : '...';
  const content = typeof data?.content === 'string' ? data.content : '...';
  const createdAt =
    typeof data?._createdAt === 'string'
      ? data._createdAt.split('T')[0]
      : '...';
  const status = typeof data?.status === 'string' ? data.status : 'PENDING';

  return (
    <Stack ref={previewRef} space={3}>
      <Text size={2} weight="semibold" textOverflow="ellipsis">
        {author}
      </Text>
      <Text muted size={1} textOverflow="ellipsis">
        {email} {createdAt}
      </Text>
      <Text size={2} textOverflow="ellipsis">
        {content}
      </Text>
      <Box>
        <StatusBadge status={status} fontSize={1} />
      </Box>
    </Stack>
  );
}
