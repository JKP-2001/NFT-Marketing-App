export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Service({
    'getCanisterID' : IDL.Func([], [IDL.Principal], ['query']),
    'getNFTImage' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'getNFTName' : IDL.Func([], [IDL.Text], ['query']),
    'getNFTOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'transferOwnerShip' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
  return NFT;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Principal, IDL.Vec(IDL.Nat8)];
};
