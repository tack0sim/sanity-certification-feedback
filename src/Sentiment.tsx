import { DocumentHandle, useClient } from '@sanity/sdk-react';
import { Button, Text, Inline, Stack, useToast } from '@sanity/ui';

type SentimentProps = {
  feedback: string;
  value: string;
  handle: DocumentHandle;
};

function titleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1)
  );
}

const SCHEMA_ID = '_.schemas.default';

export function Sentiment({ feedback, value, handle }: SentimentProps) {
  const client = useClient({ apiVersion: 'vX' });
  const toast = useToast();

  function assessSentiment() {
    client.agent.action
      .generate({
        targetDocument: {
          operation: 'edit',
          _id: handle.documentId,
        },
        instruction: `You are a helpful assistant that analyzes customer feedback and determines the sentiment of the feedback.
      The sentiment can be one of the following: "positive", "neutral", "negative",
      Analyze the following feedback and determine the sentiment: 
      $feedback`,
        instructionParams: {
          feedback: {
            type: 'constant',
            value: feedback,
          },
        },
        target: {
          path: 'sentiment',
        },
        schemaId: SCHEMA_ID,
      })
      .then((result) => {
        toast.push({
          title: 'Sentiment assessed',
          description: result.text,
          status: 'success',
        });
      })
      .catch((error) => {
        toast.push({
          title: 'Error assessing sentiment',
          description: error.text,
          status: 'error',
        });
      });
  }

  return (
    <Stack space={3}>
      <Text weight="medium">Sentiment</Text>
      <Inline space={3}>
        <Button mode="ghost" onClick={assessSentiment} text="Assess" />
        <Text>{value ? titleCase(value) : ''}</Text>
      </Inline>
    </Stack>
  );
}
