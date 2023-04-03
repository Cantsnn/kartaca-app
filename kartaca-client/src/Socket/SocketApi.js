import io from 'socket.io-client'

let socket;

export const init=()=>{
    socket = io("http://localhost:5000")

    socket.on("connect",()=>{
        console.log("Web socket bağlanıldı.")
    })
}

export const send=(data)=>{
    socket.emit('offer',data)
}

export const subscribeOffer=(callbackFunc)=>{
    socket.on("offer_announce",(data)=>{
        callbackFunc(data)
    })
}
