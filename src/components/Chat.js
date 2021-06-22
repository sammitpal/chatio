import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
function Chat({username,msg,imageURL}) {

    const {name} = useParams();
    
    return (
        <div className={`chat ${name===username && 'chat_reciever'}`}>
            {
                imageURL ? (
                    <>
                    <strong>{username}</strong>
                    <img src={imageURL} alt="" />
                    </>
                ) : (<p><strong>{username}:</strong> {msg}</p>)
            }
            
        </div>
    )
}

export default Chat
