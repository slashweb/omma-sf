'use client'
import React from "react";
import {config} from "@/web3/config";
import TransferValidator from "@/app/transfer/TransferValidator";
import {WagmiProvider} from "wagmi";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Transfer() {

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <TransferValidator/>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
