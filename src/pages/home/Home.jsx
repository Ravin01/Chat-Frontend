// import io from 'socket.io-client'

import { useEffect, useRef, useState } from "react";
import Chat from "../../Components/Chat";
import Avatar from "./Avatar";
import Contacts from "../../Components/Contacts";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../../config";
import ChatHeader from "../../Components/ChatHeader";
import "../../Styles/Home.css";
import Lottie from "react-lottie";
import chatAnimation from "../../assets/gUrJv91UL1.json";

import { io } from "socket.io-client";

const Home = () => {
  const [avatarProfile, setAvatarProfile] = useState(false);
  // const socket = io.connect(backendUrl)

  // const {userEmail} = JSON.parse(sessionStorage.getItem('user'))

  const [selectContact, setSelectContact] = useState("");

  const [isContactAddedHome, setIsContactAddedHome] = useState(false);

  const { userEmail, accessToken } = JSON.parse(sessionStorage.getItem("user"));

  const navigate = useNavigate();

  const socket = useRef();

  useEffect(() => {
    if (selectContact !== "") {
      socket.current = io(backendUrl);
      socket.current.emit("add-user", {
        email: userEmail,
      });
      console.log("added");
      navigate(`/${selectContact}`);
    }
  }, [selectContact]);

  const getProfileForCheck = async () => {
    try {
      await axios.get(`${backendUrl}/profile/${userEmail}`,{
        headers : {
          "auth-token" : accessToken
        }
      });
      // console.log(response.data)
    } catch (err) {
      setAvatarProfile(true);
      console.log(err);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chatAnimation, // Lottie JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [chatPersonName, setChatPersonName] = useState("");

  useEffect(() => {
    getProfileForCheck();
  });

  const [bars, setBars] = useState('bars')

  const [sideNavClass, setSideNavClass] = useState('home-header')

  const handleOpenSideNav = () => {
    if(bars === 'bars'){
      setBars('x')
      setSideNavClass('home-header-open')
    }else{
      setBars('bars')
      setSideNavClass('home-header')
    }
  };
  
  console.log(sideNavClass)
  return (
    <div className="home-container">
      {avatarProfile ? (
        <Avatar
          avatarProfile={avatarProfile}
          setAvatarProfile={setAvatarProfile}
        />
      ) : (
        <div className="home-chat-container">
          
          <div className="home-chat-window">
            <button className="home-btn-bars">
            <i className={`fa-solid fa-${bars}`} onClick={handleOpenSideNav}></i>
            </button>
            {selectContact === "" ? (
              <div className="home-chat-empty">
                <div className="home-lottie-ani">
                  <Lottie options={defaultOptions} />
                </div>
                please select a contact to message
              </div>
            ) : (
              <Routes>
                <Route
                  path={`/${selectContact}`}
                  element={
                    <Chat
                      selectContact={selectContact}
                      socket={socket}
                      chatPersonName={chatPersonName}
                    />
                  }
                />
              </Routes>
            )}
          </div>

          <div className={`${sideNavClass}`} >
            <ChatHeader
              setIsContactAddedHome={setIsContactAddedHome}
              isContactAddedHome={isContactAddedHome}
            />
            <Contacts
              setSelectContact={setSelectContact}
              selectContact={selectContact}
              isContactAddedHome={isContactAddedHome}
              setChatPersonName={setChatPersonName}
              setSideNavClass={setSideNavClass}
              setBars={setBars}
            />
          </div>


        </div>
      )}
    </div>
  );
};

export default Home;
