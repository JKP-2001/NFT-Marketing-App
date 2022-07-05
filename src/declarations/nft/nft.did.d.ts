import type { Principal } from '@dfinity/principal';
export interface NFT {
  'getCanisterID' : () => Promise<Principal>,
  'getNFTImage' : () => Promise<Array<number>>,
  'getNFTName' : () => Promise<string>,
  'getNFTOwner' : () => Promise<Principal>,
  'transferOwnerShip' : (arg_0: Principal) => Promise<string>,
}
export interface _SERVICE extends NFT {}
