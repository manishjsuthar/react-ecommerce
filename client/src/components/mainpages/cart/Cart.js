import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "3rem", margin:"200px"}}>Cart is Empty. Please add some Item.</h2> 

    return (
        <div className="body1"> 
        <div className="card1">
            <div className="row row1">
                <div className="col-md-8 cart1">
                <div className="title1">
                    <div className="row row1">
                    <div className="col">
                        <h1 ><b>Shopping Cart</b></h1>
                    </div>
                    <div className="col align-self-center text-right text-muted">{cart.length} items</div>
                    </div>
                </div>
                
            {cart.map(product => (
                <div className="row row1 border-top border-bottom" key={product._id}>
                    <div className="row row1 main1 align-items-center d-flex">
                    <div className="col-2"><img className="img-fluid img1" src={product.images.url} alt="" /></div>
                    <div className="col">
                        {/* <div className="row row1 text-muted">{product.category}</div> */}
                        <div className="row row1">{product.title}</div>
                    </div>
                    <div className="col d-flex"> <button className="btn"  onClick={() => decrement(product._id)}>-</button><span>{product.quantity}</span><button className="btn" onClick={() => increment(product._id)}>+</button> </div>
                    <div className="col">&#8377;{product.price * product.quantity} </div><div className="close1 col" onClick={() => removeProduct(product._id)} style={{cursor:"pointer"}}><i className="fas fa-trash"></i></div>
                    </div>
                </div>
                ))
            }
                <div className="back-to-shop1"><a href="/" className="a1">←</a><span className="text-muted">Back to shop</span></div>
                </div>

                <div className="col-md-4 summary1">
                <div>
                    <h5 className="h51"><b>Summary</b></h5>
                </div>
                <hr/>
                <div className="row row1">
                    <div className="col" style={{"padding-left":"0"}}>ITEMS {cart.length}</div>
                    <div className="col text-right">&#8377; {total}</div>
                </div>
                <hr/>
                <form className="form1">
                    <p>SHIPPING</p>
                    <select className="select1">
                    <option className="text-muted">Standard-Delivery- &#8377; 60</option>
                    </select>
                </form>
                <div className="row row1" style={{"border-top":"1px solid rgba(0,0,0,.1)","padding":"2vh 0"}}>
                    <div className="col">TOTAL PRICE</div>
                    <div className="col text-right">&#8377; {total +60}</div>
                </div> 
                {/* <button className="btn btn1">CHECKOUT</button> */}
                <div className="text-center mt-5">
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
                </div>
                </div>
            </div>
        </div>
</div>



        // <div>
            // {
            //     cart.map(product => (
            //         <div className="detail cart" key={product._id}>
            //             <img src={product.images.url} alt="" />

            //             <div className="box-detail">
            //                 <h2>{product.title}</h2>

            //                 <h3>$ {product.price * product.quantity}</h3>
            //                 <p>{product.description}</p>
            //                 <p>{product.content}</p>

            //                 <div className="amount">
            //                     <button onClick={() => decrement(product._id)}> - </button>
            //                     <span>{product.quantity}</span>
            //                     <button onClick={() => increment(product._id)}> + </button>
            //                 </div>
                            
            //                 <div className="delete" 
            //                 onClick={() => removeProduct(product._id)}>
            //                     X
            //                 </div>
            //             </div>
            //         </div>
            //     ))
            // }

        //     <div className="total">
        //         <h3>Total: $ {total}</h3>
                /* <PaypalButton
                total={total}
                tranSuccess={tranSuccess} /> */
            // </div>
        // </div>
    )
}

export default Cart
