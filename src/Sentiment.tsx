import { DocumentHandle, useEditDocument } from '@sanity/sdk-react';
import { Radio, Text, Inline, Stack } from '@sanity/ui';

type SentimentProps = {
  value: string;
  handle: DocumentHandle;
};

const SENTIMENTS = ['Positive', 'Neutral', 'Negative'];

export function Sentiment({ value, handle }: SentimentProps) {
  const editSentiment = useEditDocument({ ...handle, path: 'sentiment' });

  return (
    <Stack space={3}>
      <Text weight="medium">Sentiment</Text>
      <Inline space={3}>
        {SENTIMENTS.map((sentiment) => (
          <Inline key={sentiment} as="label" space={1} htmlFor={sentiment}>
            <Radio
              id={sentiment}
              checked={value === sentiment.toLowerCase()}
              onChange={(e) => editSentiment(e.currentTarget.value)}
              name="sentiment"
              value={sentiment.toLowerCase()}
            />
            <Text>{sentiment}</Text>
          </Inline>
        ))}
      </Inline>
    </Stack>
  );
}
