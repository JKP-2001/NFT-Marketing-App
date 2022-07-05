import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory } from "../../../declarations/nft"
import Button from "./Button";
import { opend } from "../../../declarations/opend"
import CURRENT_USER_ID from "../index";
import PriceLable from "./PriceLable";

function Item(props) {



  const id = Principal.fromText(props.id);

  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceBar, setPriceBar] = useState();
  const [hidden, setHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [isListed, setListed] = useState("");
  const [priceItem,setPriceItem] = useState("");
  // const [price,setPrice] = useState("");

  const localhost = "http://localhost:8080";

  const agent = new HttpAgent({
    host: localhost
  });

  agent.fetchRootKey();

  const actor = Actor.createActor(idlFactory, {
    agent: agent,
    canisterId: id
  });

  const getNFT = async () => {
    const name = await actor.getNFTName();
    const own = await actor.getNFTOwner();
    const x = await actor.getNFTImage();

    const y = new Uint8Array(x);


    const image = URL.createObjectURL(new Blob([y.buffer]), { type: "image/png" });

    setImage(image);


    const owner = own.toText();
    setName(name);
    setOwner(owner);
    const z = await opend.isListed(id);
    if (z) {
      if (props.role == "collection") {
        setButton();
        setPriceBar();
        setBlur({ filter: "blur(4px)" });
        setOwner("OpenD");
        setListed("Listed");
      }
      else{
        const ownerOrg = await opend.getOriginalOwner(id);
        const priceOfItem = await opend.getPrice(id);
        if(ownerOrg.toText() !== CURRENT_USER_ID.toText()){
          setButton(<Button handleClick={handleBuy} text="Buy" />)
          setOwner(ownerOrg.toText());
          
          console.log(CURRENT_USER_ID);
        }
        else{
          setButton();
          setOwner("OpenD");
        }
        setBlur();
        setPriceItem(priceOfItem.toString());
        // console.log()     
        setListed();
        
      }

    }
    else {
      setButton(<Button handleClick={click} text="Sell" />);
    }

  }


  useEffect(() => {
    getNFT()
  }, [])

  let price;
  const click = () => {
    setPriceBar(<input
      placeholder="Price in DANG"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => {
        (price = e.target.value);
      }}
    />)
    setButton(<Button handleClick={handleSell} text="Confirm" />);
  }

  const handleSell = async () => {
    setBlur({ filter: "blur(4px)" })
    setHidden(false);
    const x = await opend.listTheNFT(id, Number(price));
    console.log("Listing: " + x);
    const opendId = await opend.getID();
    const y = await actor.transferOwnerShip(opendId);
    if (y == "Success") {
      setHidden(true);
      setButton();
      setPriceBar();
      setOwner("OpenD");
      setListed("Listed");
    }

    console.log(y);
    console.log(("Transfer: " + price));
  }

  const handleBuy = async ()=>{
    console.log("Clicked Buy");
  }

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />
        <div className="lds-ellipsis" hidden={hidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          <PriceLable price={priceItem} />
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"> {isListed}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceBar}
          {button}
        </div>
      </div>
    </div>

  );
}

export default Item;
