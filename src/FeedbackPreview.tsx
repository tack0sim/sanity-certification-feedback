import { useRef } from 'react';
import { DocumentHandle, useDocumentProjection } from '@sanity/sdk-react';
import { Box, Stack, Text } from '@sanity/ui';

import { StatusBadge } from './StatusBadge';

type FeedbackPreviewData = {
  _createdAt: string;
  content: string | null;
  author: string | null;
  email: string | null;
  status: string;
};

export function FeedbackPreview(props: DocumentHandle) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { data, isPending } = useDocumentProjection<FeedbackPreviewData>({
    ...props,
    ref: previewRef,
    projection: `{
      _createdAt,
      content,
      author,
      email,
      "status": coalesce(status, "PENDING")
    }`,
  });

  const showPlaceholder = isPending && !data;

  return (
    <Stack ref={previewRef} space={3}>
      <Text size={2} weight="semibold" textOverflow="ellipsis">
        {showPlaceholder ? '...' : data.author}
      </Text>
      <Text muted size={1} textOverflow="ellipsis">
        {showPlaceholder
          ? '...'
          : data.email + ' ' + data._createdAt.split('T')[0]}
      </Text>
      <Text size={2} textOverflow="ellipsis">
        {showPlaceholder ? '...' : data.content}
      </Text>
      <Box>
        <StatusBadge status={data.status} fontSize={1} />
      </Box>
    </Stack>
  );
}
