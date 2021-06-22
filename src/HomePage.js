import React from 'react'
import './HomePage.css'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';
function HomePage() {
    const history = useHistory();

    const create = () =>{
        const ID = uniqid();
        const yourName = prompt("Enter Your Name: ");
        if(yourName){
            history.push(`/chat/${yourName}/${ID}`);
        }
    }
    const join = () =>{
        const roomID = prompt("Enter Room ID: ");
        if(roomID){
            const yourName = prompt("Enter Your Name: ");
            if(yourName){
                history.push(`/chat/${yourName}/${roomID}`);
            }
        }
    }
    return (
        <div className='homePage'>
            <Button startIcon={<Add/>} className='joinBtn' onClick={join}>Join a chat room</Button>
            <Button className='createBtn' onClick={create}>Create a new chat room</Button>
        </div>
    )
}

export default HomePage
