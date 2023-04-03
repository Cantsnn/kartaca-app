import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { init, send, subscribeOffer } from '../../Socket/SocketApi'
import { Navigate } from 'react-router-dom'

function HomePage() {
    const authUrl = "http://localhost:5000/api/v1/product"
    const { getUserToken, getUserFirstName, getUserLastName, isLogin, setIsLogin } = useUser()

    const [items, setItems] = useState([{}])

    let inputPrices = []

    useEffect(() => {
        if(!getUserToken()){
            setIsLogin(true)
        }
        init()
        subscribeOffer((items) => { setItems(items) })

    }, [])

    const onChangeHandler = (e) => {
 
        if (items[e.target.name].max_offer > inputPrices[e.target.name]) {
            return alert("Offer given must be higher")
        }
      
        send(
            {
                user_id: getUserToken(),
                product_id: items[e.target.name].id,
                price:  parseInt(inputPrices[e.target.name])
            })
        
            inputPrices[e.target.name]=0
    }

    const onInputHandler = (e) => {
        console.log(typeof (e.target.value))
        inputPrices[e.target.name] = e.target.value
        console.log(inputPrices[e.target.name])
    }

    if (!getUserToken()) {

        return <Navigate to="login" replace={true}></Navigate>
    }
    else {
        setIsLogin(true)

        return (
            <div>
 
                <div className='App'>
                    <div className="container text-center">
                        <h1>Hoşgeldiniz {getUserFirstName()} {getUserLastName()}</h1>

                    </div>
                    <ul>
                        {items.map((item, i) => (

                            <li key={i}  className='col-md-2' >

                                <div className='container'>
                                    <div className="wsk-cp-product">
                                        <div className="wsk-cp-img">
                                            <img src={item.image_url} width="139" height="139" alt="Product" className="img-responsive" />
                                        </div>
                                        <div className="wsk-cp-text">

                                            <div className="title-product">
                                                <h3>{item.name}</h3>
                                            </div>
                                            <div className="description-prod">
                                                
                                            </div>

                                            <div className="card-footer">


                                                <div className='wcf-center'><span className="price">₺{item.max_offer}</span></div>
                                                <input name={i} type='number' value={inputPrices[i]} placeholder='Fiyat Giriniz' onChange={onInputHandler} className='price-input' />

                                            </div>
                                            <button name={i} onClick={onChangeHandler} className='wsk-cp-text category'  >Give Offer</button>

                                        </div>
                                    </div>
                                </div>


                            </li>







                        ))}


                    </ul>




                </div>

            </div>
        )
    }
}
export default HomePage