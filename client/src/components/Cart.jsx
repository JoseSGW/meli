import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Cart.scss"

export const Cart = ({ title, price, picture, id }) => {
    return (
        <li className="li-element">
            <div className="product-container">
                <Link to={`/items/${id}`} className="image-container">
                    <img src={picture} alt={"imagen" + title} />
                </Link>
                <div className="info-container">
                    <h2>$ {price}</h2>
                    <Link to={`/items/${id}`}><h3>{title}</h3></Link>                    
                </div>
            </div>
        </li>
    )
}
