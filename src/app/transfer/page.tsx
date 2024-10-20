'use client'
import React from "react";
import TransferValidator from "@/app/transfer/TransferValidator";
import {WagmiProvider} from "wagmi";
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import {RainbowKitProvider,} from "@rainbow-me/rainbowkit";
import {config} from '@/config';

const queryClient = new QueryClient()

export default function Transfer() {



    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <TransferValidator/>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
