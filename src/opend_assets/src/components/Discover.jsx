import React,{useState,useEffect} from 'react'
import {opend} from "../../../declarations/opend"
import Item from "./Item"

const Discover = () => {
    const id = "rrkah-fqaaa-aaaaa-aaaaq-cai";

    const [ownNFT, setOwnNFT] = useState([]);

    const getOwnNFT = async () => {
        const x = await opend.getListedNFTs();
        console.log(x);
        setOwnNFT(x);
    }

    useEffect(() => {
        getOwnNFT();
    }, []);


    return (
        <div className="gallery-view">
            <h3 className="makeStyles-title-99 Typography-h3">Discover</h3>
            <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
                <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
                    <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
                        {ownNFT.map(id => {
                            return (<Item id={id.toText()} key={id} role="discover"/>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discover