import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/DataSearch/SearchContext';
import '../Styles/Breadcrumb.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const Breadcrumb = () => {

    const { breadcrumb } = useContext(SearchContext);
    const history = useHistory();

    console.log(history)
    return (
        <ol className='breadcrumb'>
            {
                breadcrumb?.map((b, i) =>
                    <li className='li-breadcrumb' key={i}>
                        {b}                        
                    </li>)

            }
        </ol>
    )
}
