import React, { useContext } from 'react';
import { SearchContext } from '../context/DataSearch/SearchContext';
import { DetailsContext } from '../context/DetailsProduct/DetailsContext';
import '../Styles/Breadcrumb.scss';

export const Breadcrumb = () => {

    const { breadcrumb } = useContext(SearchContext);
    const { breadcrumbItem } = useContext(DetailsContext);

    return (
        <ol className='breadcrumb'>
            {
                breadcrumb?.map((b, i) =>
                    <li className='li-breadcrumb' key={i}>
                        {b}
                    </li>)
            }
            {
                breadcrumbItem?.length > 0 && breadcrumbItem.map((b, i) =>
                    <li className='li-breadcrumb' key={i}>
                        {b}
                    </li>)
            }
        </ol>
    )
}
