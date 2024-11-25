'use client'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../App.store'
import { getQueryClient } from 'utils'

import { ToastProvider } from './ToastProvider/ToastProvider'
import { CssBaseline } from '@mui/material'

const clientSideEmotionCache = createCache({ key: 'css', prepend: true })

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<QueryClientProvider client={getQueryClient()}>
				<CacheProvider value={clientSideEmotionCache}>
					<StoreProvider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<CssBaseline />
							<ToastProvider />
							<ReactQueryDevtools initialIsOpen={false} />
							{children}
						</PersistGate>
					</StoreProvider>
				</CacheProvider>
			</QueryClientProvider>
		</AppRouterCacheProvider>
	)
}
