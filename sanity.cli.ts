import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  app: {
    organizationId: 'oG4Ppzmwr',
    entry: './src/App.tsx',
  },
  deployment: {
    appId: 'pa6w2fvxffneb4jajmseadlw',
  },
});
