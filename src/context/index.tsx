/**
'use client'

import {wagmiAdapter, projectId} from '@/config'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createAppKit} from '@reown/appkit/react'
import {mainnet, polygon, polygonAmoy, sepolia} from '@reown/appkit/networks'
import React, {type ReactNode} from 'react'
import {cookieToInitialState, WagmiProvider, type Config} from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
    name: 'omma-cash',
    description: 'OmmaCash project',
    url: 'https://auth.ommacash.com',
    icons: []
}

const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION !== 'false'

const customNets = isProd ? [mainnet, polygon] : [polygonAmoy, sepolia]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, ...customNets],
    defaultNetwork: isProd ? mainnet : polygonAmoy,
    metadata: metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})


function ContextProvider({children, cookies}: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // @typescript-eslint/ban-ts-comment
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider
**/
