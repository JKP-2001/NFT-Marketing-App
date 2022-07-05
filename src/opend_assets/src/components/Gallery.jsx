import React,{useState,useEffect} from "react";
import Item from "./Item";
import {opend} from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";

function Gallery(props) {
  const id = "rrkah-fqaaa-aaaaa-aaaaq-cai";

  const [ownNFT, setOwnNFT] = useState([]);

  const getOwnNFT = async ()=>{
    const x = await opend.getOwnedNFTs(CURRENT_USER_ID);
    console.log(x);
    setOwnNFT(x);
  }

  useEffect(() => {
    getOwnNFT();
  }, []);
  
  
  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">My NFTs</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
          {ownNFT.map(id=>{
            return(<Item id={id.toText()} key={id} role="collection"/>)
          })}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Gallery;
