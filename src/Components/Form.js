import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Display from './Display';
import './Form.css';

const toppings = ['Pepperoni', 'Sausage', 'Grilled Chicken', 'Canadian Bacon', 'Extra Cheese', 'Black Olives', 'Green Olives', 'Green Bell Peppers']

const sauces = ['Original', 'Alfredo', 'BBQ']

const formSchema = yup.object().shape({
    name: yup.string().required("Please include a valid name"),
    topping: yup.boolean().oneOf([true], "You can only have 5 toppings"),
    sauce: yup.boolean()/*.oneOf([true], "Please select a sauce")*/,
    sizes: yup.string().required("Please select a pizza size"),
    instructions: yup.string()
})

const Form = () => {
    const [formState, setFormState] = useState({
        name: "",
        topping: false,
        sauce: false,
        instructions: ""
    })

    const [errorState, setErrorState] = useState({
        name: "",
        topping: "",
        sauce: "",
        instructions: ""
    })

    const [orders, setOrderState] = useState([])

    const formSubmit = event => {
        event.preventDefault();
        console.log('form submitted');
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                console.log(response)
                setOrderState([...orders, response.data])
            })
            .catch(err => console.log('something went wrong', err))
    }

    const inputChange = event => {
        event.persist()
        validate(event)
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setFormState({...formState, [event.target.name]: value})
    }

    const validate = event => {
        let value = 
            event.target.type === "checkbox" ? event.target.checked : event.target.value;
            yup
            .reach(formSchema, event.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                        [event.target.name]: err.errors[0]
                })
            })
    }

    return (
        <div className="toppings-container">
        <form onSubmit={formSubmit}>
            <div className="name-area">
            <h3>Who is this pizza for?</h3>
                <label htmlFor="name">
                    <input type="text" name="name" id="name" placeholder="enter name here"  minLength="2" value={formState.name} onChange={inputChange} required />
                </label>
                {errorState.name.length > 2 ? (
                <p className="error">{errorState.name}</p>
            ) : null}
        </div>
        <div className="toppings">
            <h3>Toppings</h3>
            <p>Select up to 5</p>
            {toppings.map(topping => (
                <label htmlFor="toppings">
                    <div className="topping-button">
                        <p>{topping}</p>
                        <input type="checkbox" name="topping" id="topping" checked={formState.checked} value={formState.checked} onChange={inputChange} />
                    </div>
                </label>  
            ))}
        </div>
        <div className="sauces">
            <h3>Sauces</h3>
            {sauces.map(sauce => (
                    <label htmlFor="sauces">
                        <p>{sauce}</p>
                        <input type="radio" name="sauce" id="sauce" value={formState.sauce} onChange={inputChange} required />
                    </label>
                    
            ))}
            {errorState.sauce.length > 0 ? (
                <p className="error">{errorState.sauce}</p>
            ) : null}
        </div>
            <label htmlFor="pizza-size"><h3>Select a Size</h3></label>
                <select id="sizes" name="sizes" value={formState.sizes} onChange={inputChange} required >
                    <option value='10'>10 in</option>
                    <option value='12'>12 in</option>
                    <option value='14'>14 in</option>
                    <option value='16'>16 in</option>
                </select>
        <div className="spec-instructions">
            <h3>Special Instructions</h3>
            <label htmlFor="Special Instructions">
                <textarea name="instructions" id="instructions" placeholder="Any special instructions?" value={formState.instructions} onChange={inputChange} />
            </label>
        </div>
        <button className="submit">Place Order</button>
        </form>
        <Display  orders={orders}/>
    </div>
    )
}

export default Form;