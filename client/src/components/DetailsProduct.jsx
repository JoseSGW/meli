import React, { useContext, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { DetailsContext } from '../context/DetailsProduct/DetailsContext';
import "../Styles/DetailsProduct.scss"

export const DetailsProduct = () => {

    const { item, getData } = useContext(DetailsContext);
    const { id: url_id } = useParams();

    useEffect(() => {
        getData(url_id);
    }, []);



    const { id, title, price, picture, condition, free_shipping, sold_quantity, description } = !!item.id && item;

    return (
        //item.length > 0 &&
        <main className="product-details">
            <div className="product-info">
                <img className="product-image" src={picture} alt={`imagen de ${title}`} />
                <div className="details">
                    <h4>{condition} - {sold_quantity} vendidos</h4>
                    <h3>{title}</h3>
                    <h2>$ {price?.currency}</h2>
                    <button>Comprar ahora</button>
                </div>
            </div>
            <div className="product-description">
                <h2>Descripción del producto</h2> 
                <p>{description?.split('\n').map(text => <>{text}<br/></>)}</p> 
            </div>
        </main>
    )
}
