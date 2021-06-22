import { AttachFile, EmojiEmotions, Send } from "@material-ui/icons";
import React, { useEffect } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import {db,storage} from "./firebase"
import { IconButton, Button, Icon } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Picker from 'emoji-picker-react';

function ChatWindow() {
  const { roomID } = useParams();
  const { name } = useParams();
  const [msg, setMsg] = useState("");
  const [progress, setProgress] = useState(0);  
  const [chats, setChats] = useState([]);
  const [image, setImage] = useState(null);

     const handleChange = (e) =>{
         if(e.target.files[0]){
             setImage(e.target.files[0])
         }
     };

     useEffect(()=>{
        if(image){
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred/snapshot.totalBytes)*100
                    );
                    setProgress(progress);
                },
                (error)=>{
                    alert(error.message);
                },
                () =>{
                    storage.ref("images").child(image.name).getDownloadURL()
                    .then(url => {
                        db.collection(roomID).add({
                            created: new Date(),
                            imageURL: url,
                            username: name
                        });
                        setProgress(0);
                        setImage(null);
                    })
                }
            )
        }
     },[image])
       
     
        
   

  const send = (e) => {
      e.preventDefault()
    if (msg.length > 0) {
      db.collection(roomID).add({
        username: name,
        chat: msg,
        created: new Date(),
      });
      setMsg("");
    }
  };

  useEffect(() => {
    db.collection(roomID)
      .orderBy("created", "asc")
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  console.log(chats);
  return (
    <div className="chatWindow">
      <div className="chatWindow_header">
        <h3>Chats</h3>
        <p>Room ID: {roomID}</p>
      </div>
      <div className="chatWindow_Body">
        {chats.map((chat) => (
          <Chat msg={chat.chat} username={chat.username} imageURL={chat.imageURL}/>
        ))}
      </div>
      <div className="chatWindow_footer">
        <EmojiEmotions className="icons"/>
        
        <form className="inputBar">
          <input
            type="text"
            placeholder="Enter your message Here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <IconButton size='small' type='submit' className="sendIcon" onClick={send}><Send/></IconButton>
        
        </form>
        <label class="custom-file-upload">
          <input type="file" style={{display: 'none'}} onChange={handleChange}/>
          <AttachFile className='icons'/>
        </label>
        
      </div>
    </div>
  );
}

export default ChatWindow;
