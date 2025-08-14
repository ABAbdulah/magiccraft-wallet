export interface Network {
    name: string
    chainId: number
    rpc: string
    symbol?: string
    icon?: string
    priceId?: string
    explorer?: string
}

export interface Contact {
    name: string
    address: string
}

export interface Account extends Contact {
    pk: string
    encPk: string
}

export interface Accounts {
    [key: string]: Account
}

export interface Networks {
    [key: number]: Network
}

export interface RequestArguments {
    method: string
    type: string
    params?: any[]
    resId?: string
    website?: string
    data?: any
}

export interface ProviderRpcError extends Error {
    message: string
    code: number
    data?: unknown
  }
  
export interface Price {
    [key: string]: number
}

export interface Prices {
    [key: string]: Price
}

export interface Settings {
    enableStorageEnctyption: boolean
    encryptAfterEveryTx: boolean
    lockOutPeriod: number
    lockOutEnabled: boolean
    theme: 'system' | 'light' | 'dark'
    lastLock: number
    lockOutBlocked: boolean
    copyLowerCaseAddress?: boolean
    lastRPCNotification: number
    lastExecutedMigration: string
    showRawTransactionData: boolean
    enableAssetTransactionSimulation: boolean
    assetTransactionSimulationAlchemyKey: string
}

export type listenerType = 'accountsChanged' | 'connect' | 'disconnect' | 'chainChanged'

export interface HistoryItem {
    date: number
    txUrl?: string
    chainId?: number
    webiste?: string
    txHash: string
}

export interface ContractAction {
        name: string
        contract: string
        abi: string
        functionName: string
        params: any[]
}

export interface ContractActions {
    [key: string] : ContractAction
}
 
export interface UniSwapPortfolioResponse {
    data: {
        portfolios: {
            id: string;
            tokenBalances: {
                id: string;
                quantity: number;
                denominatedValue: {
                    value: number;
                }
                token: {
                    id: string;
                    address: string;
                    chain: string;
                    symbol: string;
                    name: string;
                    decimals: number;
                    standard: string;
                    project: {
                        id: string;
                        name: string;
                        logo: null;
                        safetyLevel: string;
                        logoUrl: null;
                        isSpam: boolean;
                        __typename: string;
                    };
                    __typename: string;
                };
                tokenProjectMarket: {
                    id: string;
                    pricePercentChange: null;
                    tokenProject: {
                        id: string;
                        logoUrl: null;
                        isSpam: boolean;
                        __typename: string;
                    };
                    __typename: string;
                };
                __typename: string;
            }[];
            __typename: string;
            tokensTotalDenominatedValue: {
                id: string;
                value: number;
            }
            tokensTotalDenominatedValueChange: {
                absolute: {
                    id: string;
                    value: number;
                }
                percentage: {
                    id: string;
                    value: number;
                }
            }
        }[];
    };
}

export type AlchemyAssetChange = {
     assetType: 'NATIVE' | 'ERC20' | 'ERC721' | 'ERC1155';
     changeType: string,
     from: string,
     to: string,
     amount: string,
     name: string,
     logo: string,
     symbol: string,
};