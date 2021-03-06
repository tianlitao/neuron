export enum NetworkType {
  Default, // Preset mainnet node
  Normal,
}

export const MAINNET_GENESIS_HASH = "0x92b197aa1fba0f63633922c61c92375c9c074a93e85963554f5499fe1450d0e5"
export const EMPTY_GENESIS_HASH = "0x"

export interface Network {
  id: string
  name: string
  remote: string
  type: NetworkType
  genesisHash: string
  chain: 'ckb' | 'ckb_testnet' | 'ckb_dev' | string // returned by rpc.getBlockchainInfo
}
