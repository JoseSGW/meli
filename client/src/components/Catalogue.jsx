import React, { useContext } from 'react'
import { SearchContext } from '../context/DataSearch/SearchContext';
import '../Styles/Catalogue.scss'
import { Cart } from './Cart'

export const Catalogue = () => {

    const { items } = useContext(SearchContext);

    return (
        <ol className="catalogueSection">
            {
                items?.length > 0 && items.map(item =>
                    <Cart
                        key={item.id}
                        priceCurrent={item.price?.currency}
                        priceDecimals={item.price?.decimals}
                        title={item.title}
                        picture={item.picture}
                        id={item.id}                        
                    />
                )
            }
        </ol>
    )
}
