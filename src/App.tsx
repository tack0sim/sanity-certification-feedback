import { type SanityConfig } from '@sanity/sdk';
import { SanityApp } from '@sanity/sdk-react';
import { Flex, Spinner } from '@sanity/ui';
import { SanityUI } from './SanityUI';
import { Feedback } from './Feedback';

function App() {
  // apps can access many different projects or other sources of data
  const sanityConfigs: SanityConfig[] = [
    {
      projectId: '8otctvui',
      dataset: 'production',
    },
  ];

  function Loading() {
    return (
      <Flex justify="center" align="center" width="100vw" height="fill">
        <Spinner />
      </Flex>
    );
  }

  return (
    <SanityUI>
      <SanityApp config={sanityConfigs} fallback={<Loading />}>
        {/* add your own components here! */}
        <Feedback />
      </SanityApp>
    </SanityUI>
  );
}

export default App;
