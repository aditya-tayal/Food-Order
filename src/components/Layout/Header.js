import {Fragment} from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from '../../assets/meals.jpg';
import classes from '../styles/Header.module.css';
const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Food Order</h1>    
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
            <img src={mealsImage} alt='A table full of delicious meals'/>
            </div>
        </Fragment>
    ) ;
};

export default Header;
