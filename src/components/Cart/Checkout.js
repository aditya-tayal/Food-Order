import { useRef, useState } from 'react';

import classes from '../styles/Checkout.module.css'

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;


const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enterdNameIsValid = !isEmpty(enteredName);
        const enterdStreetIsValid = !isEmpty(enteredStreet);
        const enterdCityIsValid = !isEmpty(enteredCity);
        const enterdPostalIsValid = isFiveChars(enteredPostal);

        setFormInputsValidity({
            name: enterdNameIsValid,
            street: enterdStreetIsValid,
            city: enterdCityIsValid,
            postalCode: enterdPostalIsValid
        });

        const fromIsValid = enterdNameIsValid && enterdStreetIsValid && enterdCityIsValid && enterdPostalIsValid;

        if (!fromIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal,
        })
    };

    const nameClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const postalCodeClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
    const cityClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please Enter a valid Name</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please Enter a valid Street</p>}
            </div>
            <div className={postalCodeClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputsValidity.postalCode && <p>Please Enter a valid Postal Code (5 characters long) </p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please Enter a valid City</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
