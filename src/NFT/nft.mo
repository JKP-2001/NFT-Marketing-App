import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

actor class NFT(name:Text,owner:Principal,image:[Nat8]) = this {
    private var itemName = name;
    private var itemOwner = owner;
    private var imageByte = image;

    public query func getNFTName() : async Text{
        return itemName;
    };

    public query func getNFTOwner() : async Principal {
        return itemOwner;
    };

    public query func getNFTImage() : async [Nat8] {
        return imageByte;
    };

    public query func getCanisterID() : async Principal {
        return Principal.fromActor(this);
    };

    public shared(msg) func transferOwnerShip(newOwner:Principal) : async Text {
        if(itemOwner == msg.caller){
            itemOwner:=newOwner;
            return ("Success");
        }
        else{
            return ("This NFT Does Not Belongs To You");
        }
    }
}