import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

import classes from '../styles/Cart.module.css';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, {...item, amount:1})}
                />
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose} onOrder={props.onOrder}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={props.onOrder}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
