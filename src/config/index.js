/***
 import {cookieStorage, createStorage} from '@wagmi/core';
 import {WagmiAdapter} from '@reown/appkit-adapter-wagmi';
 import {mainnet, polygon, polygonAmoy, sepolia} from '@reown/appkit/networks';

 // Ensure the project ID is set via environment variables
 export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

 if (!projectId) {
 throw new Error('Project ID is not defined');
 }

 // Check if the environment is production
 const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION !== 'false';

 // Configure networks based on the environment (prod or non-prod)
 export const networks = isProd ? [mainnet, polygon] : [sepolia, polygonAmoy];

 // Set up the Wagmi Adapter (Config)
 export const wagmiAdapter = new WagmiAdapter({
 storage: createStorage({
 storage: cookieStorage,
 }),
 ssr: true,
 projectId,
 networks,
 });

 // Export the configuration for use in your application
 export const config = wagmiAdapter.wagmiConfig;
 **/

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  sepolia,
  polygonAmoy,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;


export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: projectId,
  chains: [mainnet, polygon, sepolia, polygonAmoy],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
