export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getID' : IDL.Func([], [IDL.Principal], ['query']),
    'getListedNFTs' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getOriginalOwner' : IDL.Func([IDL.Principal], [IDL.Principal], ['query']),
    'getOwnedNFTs' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'getPrice' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'isListed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'listTheNFT' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'mintNFT' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
