import { Suspense, useState, startTransition } from 'react';
import { DocumentHandle } from '@sanity/sdk-react';
import { Card, Flex, Grid, Spinner } from '@sanity/ui';
import { styled } from 'styled-components';

import { FeedbackList } from './FeedbackList';
import { FeedbackEdit } from './FeedbackEdit';

const ScreenHeightCard = styled(Card)`
  height: 100vh;
  overflow: scroll;
`;

export function Feedback() {
  const [selectedFeedback, setSelectedFeedback] =
    useState<DocumentHandle | null>(null);
  const updateSelectedFeedback = (handle: DocumentHandle | null) =>
    startTransition(() => setSelectedFeedback(handle));

  return (
    <Grid columns={5}>
      <ScreenHeightCard columnStart={1} columnEnd={3}>
        <Suspense fallback={<Loading />}>
          <FeedbackList
            setSelectedFeedback={updateSelectedFeedback}
            selectedFeedback={selectedFeedback}
          />
        </Suspense>
      </ScreenHeightCard>
      <ScreenHeightCard borderLeft columnStart={3} columnEnd={6}>
        <Suspense fallback={<Loading />}>
          {selectedFeedback ? (
            <FeedbackEdit selectedFeedback={selectedFeedback} />
          ) : null}
        </Suspense>
      </ScreenHeightCard>
    </Grid>
  );
}

function Loading() {
  return (
    <Flex justify="center" align="center" width="fill" height="fill">
      <Spinner />
    </Flex>
  );
}
