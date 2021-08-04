import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Cart.scss"

export const Cart = ({ title, priceCurrent, picture, id, priceDecimals }) => {
    return (
        <li className="li-element">
            <div className="product-container">
                <Link to={`/items/${id}`} className="image-container">
                    <img loading='lazy' src={picture} alt={"imagen" + title} />
                </Link>
                <div className="info-container">
                    <h2>$ {priceCurrent}<span className='decimals'>{priceDecimals !== "00" && priceDecimals}</span></h2>
                    <Link to={`/items/${id}`}><h3>{title}</h3></Link>                    
                </div>
            </div>
        </li>
    )
}
