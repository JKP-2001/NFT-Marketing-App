import React from 'react'

const PriceLable = (props) => {
    return (
        <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
            <span className="disChip-label">{props.price} DANG</span>
        </div>
    )
}

export default PriceLable