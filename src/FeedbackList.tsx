import { Suspense } from 'react';
import { type DocumentHandle, useDocuments } from '@sanity/sdk-react';
import { Stack, Button, Spinner } from '@sanity/ui';

import { FeedbackPreview } from './FeedbackPreview';

type FeedbackListProps = {
  selectedFeedback: DocumentHandle | null;
  setSelectedFeedback: (feedback: DocumentHandle | null) => void;
};

export function FeedbackList({
  selectedFeedback,
  setSelectedFeedback,
}: FeedbackListProps) {
  const { data, hasMore, loadMore } = useDocuments({
    documentType: 'feedback',
  });

  return (
    <Stack space={2} padding={5}>
      {data?.map((feedback) => {
        const isSelected = selectedFeedback?.documentId === feedback.documentId;

        return (
          <Button
            key={feedback.documentId}
            onClick={() => setSelectedFeedback(feedback)}
            mode={isSelected ? 'ghost' : 'bleed'}
            tone={isSelected ? 'primary' : undefined}
          >
            <Suspense fallback={<Spinner />}>
              <FeedbackPreview {...feedback} />
            </Suspense>
          </Button>
        );
      })}
      {hasMore && <Button onClick={loadMore} text="Load more" />}
    </Stack>
  );
}
