import { DocumentEvent, useDocumentEvent } from '@sanity/sdk-react';
import { useToast } from '@sanity/ui';

export function FeedbackEvent() {
  const toast = useToast();

  const onEvent = (documentEvent: DocumentEvent) => {
    if (documentEvent.type === 'published') {
      toast.push({
        title: 'Feedback processed!',
        status: 'success',
      });
    }

    if (documentEvent.type === 'deleted') {
      toast.push({
        title: 'Feedback deleted!',
        status: 'error',
      });
    }
  };

  useDocumentEvent({ onEvent });

  return null;
}
