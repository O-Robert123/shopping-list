"use client";
import { useState } from 'react';
import './shoppingList.css'

export default function ShoppingList() {
    const [item, setItem] = useState('');
    const [list, setList] = useState([]);
    const [id, setId] = useState(1);
    const [qty, setQty] = useState(1);


    function addItemToList() {
        setList(prevList => [
            ...prevList,
            {
                id: id,
                item: item,
                quantity: qty
            }
        ]);
        setId(id + 1);
        setItem('');
        setQty('')
    };

    function removeItem(id) {
        setList(list.filter(item => item.id !== id));
    };

    return (
        <div className='shoppingList-wrapper'>
            <div className='input-field'>
                <input type="text" id="item-input" value={item} onChange={(event) => setItem(event.target.value)} />
                <input type="number" id='item-qty' value={qty} onChange={(event) => {
                    if (event.target.value <= 0) {
                        null
                    }
                    else {
                        setQty(parseInt(event.target.value))
                    }
                }} />
                <button id='add-btn' onClick={addItemToList}>Add</button>
            </div>
            <div className='list'>
                {list.map(item => (
                    <div key={item.id} className='list-item'>
                        <p className='item-name'>{item.item}</p>
                        <div className='quantity-box'>

                            <button className='item-add-qty-btn'
                                onClick={() => setList(list.map((listItem) => listItem.id === item.id ?
                                    {
                                        ...listItem,
                                        quantity: listItem.quantity + 1
                                    }
                                    : listItem
                                ))}>+</button>

                            <p className='item-qty'>{item.quantity}</p>
                            <button className='item-subtract-qty-btn'
                                onClick={() => {
                                    if (item.quantity <= 1) {
                                        null
                                    }
                                    else {
                                        setList(list.map((listItem) => listItem.id === item.id ?
                                            {
                                                ...listItem,
                                                quantity: listItem.quantity - 1
                                            }
                                            : listItem
                                        ))
                                    }
                                }}>-</button>
                        </div>
                        <button className='remove-item-btn' onClick={() => removeItem(item.id)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    )
}