import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'getID' : () => Promise<Principal>,
  'getListedNFTs' : () => Promise<Array<Principal>>,
  'getOriginalOwner' : (arg_0: Principal) => Promise<Principal>,
  'getOwnedNFTs' : (arg_0: Principal) => Promise<Array<Principal>>,
  'getPrice' : (arg_0: Principal) => Promise<bigint>,
  'isListed' : (arg_0: Principal) => Promise<boolean>,
  'listTheNFT' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'mintNFT' : (arg_0: string, arg_1: Array<number>) => Promise<Principal>,
}
