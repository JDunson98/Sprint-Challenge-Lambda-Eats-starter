import React from 'react';
import './Form.css';

const Display = props => {
    return (
        <div className='orders-list'>
            {props.orders.map(order => (
                <div className="order" key={order.id}>
                    <h2>Order for: {order.name}</h2>
                    <p>Pizza Size: {order.sizes}in</p>
                    <p>Pizza Sauce: {order.sauce}</p>
                    <p>Special Instructions: {order.instructions}</p>
                    <p>Estimated Delivery Time: 15- 30 minutes</p>
                </div>
            ))}
        </div>
    )
}

export default Display;