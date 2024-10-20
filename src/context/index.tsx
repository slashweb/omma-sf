'use client'

import {wagmiAdapter, projectId} from '@/config'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createAppKit} from '@reown/appkit/react'
import {mainnet, polygonAmoy, sepolia, polygon} from '@reown/appkit/networks'
import React, {type ReactNode} from 'react'
import {cookieToInitialState, WagmiProvider, type Config} from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
    name: 'appkit-example',
    description: 'AppKit Example',
    url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION !== 'false'

const customNets = isProd ? [mainnet, polygon] : [polygonAmoy, sepolia]
const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: customNets,
    defaultNetwork: isProd ? mainnet : polygonAmoy,
    metadata: metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

function ContextProvider({children, cookies}: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider
