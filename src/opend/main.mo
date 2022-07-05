import Principal "mo:base/Principal";
import NFTActor "../NFT/nft";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";

actor OpenD {

    private type Listing = {
        owner: Principal;
        price: Nat;  
    };
    
    var mapOfNFTs = HashMap.HashMap<Principal,NFTActor.NFT>(1,Principal.equal,Principal.hash);
    var ownerNFTs = HashMap.HashMap<Principal,List.List<Principal>>(1,Principal.equal,Principal.hash);
    var listedNFTs = HashMap.HashMap<Principal,Listing>(1,Principal.equal,Principal.hash);

    private func addNFT(owner:Principal, nftID:Principal){
        var nftList : List.List<Principal> = switch (ownerNFTs.get(owner)){
            case null List.nil<Principal>();
            case (?result) result;
        };

        nftList := List.push(nftID,nftList);
        ownerNFTs.put(owner,nftList);
    };

    public shared(msg) func mintNFT(name:Text, image:[Nat8]) : async Principal {
        let owner : Principal = msg.caller;
        let newNFT = await NFTActor.NFT(name,owner,image);
        let newId = await newNFT.getCanisterID();
        addNFT(owner,newId);
        mapOfNFTs.put(newId, newNFT);
        return newId;
    };


    public query func getOwnedNFTs(user : Principal) : async [Principal] {
        let nftList : List.List<Principal> = switch (ownerNFTs.get(user)){
            case null List.nil<Principal>();
            case (?result) result;
        };

        return List.toArray(nftList);
    };

    public shared(msg) func listTheNFT(id:Principal, price:Nat) : async Text{
        var ownerNFT : NFTActor.NFT = switch (mapOfNFTs.get(id)){
            case null return "NFT NOT EXIST";
            case (?result) result;
        };

        let owner = await ownerNFT.getNFTOwner();

        if(owner != msg.caller){
            return "This NFT Doesn't Belongs To You";    
        };

        let data : Listing = {
            owner = owner;
            price = price;
        };

        listedNFTs.put(id,data);
        return "Success";
    };


    public query func getID() : async Principal{
        return Principal.fromActor(OpenD);
    };

    public query func isListed(id:Principal) : async Bool{
        var item : Listing = switch (listedNFTs.get(id)){
            case null return false;
            case (?res) res;
        };

        return true;

    };


    public query func getListedNFTs() : async [Principal] {
        let x = Iter.toArray(listedNFTs.keys());
        return x;
    };

    public query func getOriginalOwner(id : Principal) : async Principal {
        let x : Listing = switch(listedNFTs.get(id)){
            case null return Principal.fromText("");
            case (?res) res;
        };

        return x.owner;
    };

    public query func getPrice(id : Principal) : async Nat {
        let x : Listing = switch(listedNFTs.get(id)){
            case null return 0;
            case (?res) res;
        };

        return x.price;
    }
};
