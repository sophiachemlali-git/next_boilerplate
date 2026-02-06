import Head from 'next/head'
import ThemeProvider from '@/theme/ThemeProvider'
import store from '@/store/store'
import GlobalNotification from '@/components/ui/NotificationBanner/GlobalNotification'

import { LicenseInfo } from '@mui/x-license-pro'
import { Hydrate } from 'react-query/hydration'
import { QueryClient, QueryClientProvider } from 'react-query'
import { persistor } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as StoreProvider } from 'react-redux'
import { MUI_LICENSE } from '@/config/mui'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient()

LicenseInfo.setLicenseKey(MUI_LICENSE)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Head>
                <title>Next js and Cognito - Template</title>
                <meta name="description" content="Next js and Cognito - Template" />
                <meta
                  name="viewport"
                  content="width=device-width, viewport-fit=cover, initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no"
                />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <main>
                <Component {...pageProps} />
                <GlobalNotification />
              </main>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  )
}
