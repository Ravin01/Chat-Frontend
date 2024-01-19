/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { backendUrl } from "../../config";
import '../Styles/Chat.css'
import send from '../assets/send1.png'



const Chat = ({selectContact, socket, chatPersonName}) => {

  const { userEmail, accessToken } = JSON.parse(sessionStorage.getItem("user"));

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  const [currentMessage, setCurrentMessage] = useState('');
  const [isMsgSended, setIsMsgSended] = useState(false)

  const sendMessage = async() => {
    let payload = {
      sender : userEmail,
      receiver : selectContact,
      message : currentMessage
    }
    socket.current.emit("send-msg", {
      to: selectContact,
      email : userEmail,
      msg : currentMessage,
    });
    console.log('entering into send message')
    console.log(currentMessage)
    try{
      
      let response = await axios.post(`${backendUrl}/messages`, payload,{
        headers : {
          "auth-token" : accessToken
        }
      })
      console.log(response.data)
      setCurrentMessage('')
      setIsMsgSended(!isMsgSended)
      const msgs = [...message];
    msgs.push({ fromSelf: true, message: currentMessage });
    console.log('sending..')
    }catch(err){
      console.log(err)
    }
  };

  const [message, setMessage] = useState([])

  const getAllMessages = async()=>{
    await axios.get(`${backendUrl}/messages/${userEmail}/${selectContact}`,{
      headers : {
        "auth-token" : accessToken
      }
    }).then(response => {
      setMessage(response.data)
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(()=>{
    
      
      getAllMessages()
    
  },[isMsgSended])

 

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (currentMessage) => {
        console.log('msg-receive')
        console.log(currentMessage)
        getAllMessages()
        // setArrivalMessage({ fromSelf: false, message: msg });
        setArrivalMessage({ fromSelf: false, message: currentMessage });
      });
    }
    // console.log('entering')
  });



  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {/* {console.log(message)} */}
        <img src={chatPersonName.profile} alt="" className="chat-header-profile" />
        <h4 className="chat-header-name">{chatPersonName.name}</h4>
      </div>

      <div className="chat-body">
        { message.length !==0 && message.map((msg, i) => (
              <div className={`chat-body-${msg.sender === userEmail ? 'left' : 'right'}`} key={i} >
                <h5 className={`chat-body-msg-${msg.sender === userEmail ? 'left' : 'right'}`} >{msg.message}</h5>
              </div>
        ))}
      </div>
      
      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          placeholder="Enter a message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="chat-send-button" >
          <img src={send} alt="" className="chat-btn-img" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
