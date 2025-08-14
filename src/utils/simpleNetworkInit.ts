// src/utils/simpleNetworkInit.ts
import { getNetworks, replaceNetworks, saveSelectedNetwork } from '@/utils/platform';
import { mainNets } from '@/utils/networks';

/**
 * Initialize popular EVM networks from the existing mainNets collection
 */
export async function initializeDefaultNetworks(): Promise<void> {
  try {
    const existingNetworks = await getNetworks();
    
    // Check if we already have networks
    if (existingNetworks && Object.keys(existingNetworks).length > 0) {
      console.log('Networks already initialized:', Object.keys(existingNetworks).length);
      return;
    }

    console.log('Initializing popular EVM networks...');
    
    // Add the most popular mainnet networks
    const popularChainIds = [1, 56, 137, 42161, 10, 8453]; // ETH, BSC, Polygon, Arbitrum, Optimism, Base
    const networks: any = {};
    let defaultNetwork: any = null;
    
    for (const chainId of popularChainIds) {
      if (mainNets[chainId]) {
        networks[chainId] = { ...mainNets[chainId] };
        
        // Set Ethereum as default
        if (chainId === 1) {
          defaultNetwork = networks[chainId];
        }
        
        console.log(`Added: ${mainNets[chainId].name}`);
      }
    }
    
    // Save networks and set Ethereum as default
    if (Object.keys(networks).length > 0) {
      await replaceNetworks(networks);
      if (defaultNetwork) {
        await saveSelectedNetwork(defaultNetwork);
        console.log(`Default network set: ${defaultNetwork.name}`);
      }
      console.log(`Initialized ${Object.keys(networks).length} networks successfully`);
    }
  } catch (error) {
    console.error('Failed to initialize networks:', error);
  }
}