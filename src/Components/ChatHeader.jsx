/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl } from "../../config"
import '../Styles/Chat-Header.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatHeader = ({isContactAddedHome, setIsContactAddedHome}) => {
    const [profileHeader, setProfileHeader] = useState('')
    const {userName, userEmail, accessToken} = JSON.parse(sessionStorage.getItem('user'))
    const getProfile = async()=>{
        let response = await axios.get(`${backendUrl}/profile/${userEmail}`, {
          headers : {
            "auth-token" : accessToken
          }
        })
        setProfileHeader(response.data.profile)
      }

      const [addContact, setAddContact] = useState({
        mail : ''
    })

    const [isAddButton, setIsAddButton] = useState(false)

    // const [isContactAdded, setIsContactAdded] = useState(false)


      const handleAddContact = (e)=>{
        const {name, value} = e.target;
        setAddContact({...addContact, [name] : value})
    }

    const createNewContact = async(e)=>{
      e.preventDefault()
      try{
          await axios.post(`${backendUrl}/contacts/${userEmail}`, addContact,{
            headers : {
              "auth-token" : accessToken
            }
          }).then(response=>{
            console.log(response.data)
            setIsAddButton(!isAddButton)
            setAddContact({
                mail : ''
            })
            // setIsContactAdded(!isContactAdded)
            setIsContactAddedHome(!isContactAddedHome)

          }).catch(err => {
            if(err.response.status === 409){
              toast.error("Adding user is not yet registered to our app", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
            else if(err.response.status === 401){
              toast.error("problem with add new one", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
            else if(err.response.status === 403){
              console.log(err.response.data.msg)
              toast.error(`${err.response.data.msg}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          })
          
            
          
          
      }catch(err){
          console.log(err)
      }
  }

      const handleOpenAddButton = () =>{
        setIsAddButton(!isAddButton)
    }

    useEffect(()=>{
        getProfile()
    },[])
  return (
    <div className="header-container">
      <div className="header-user">
        <img src={profileHeader} alt="" className="header-profile-img" />
        <h3>{userName}</h3>
      </div>
        <div className="header-contact-add">
            <button onClick={handleOpenAddButton} className="header-button-plus" >+</button>
            {isAddButton && 
            <div className="header-contact-add-div">
            <input type="email" name="mail" id="mail" value={addContact.mail} onChange={handleAddContact} placeholder="Enter person's email" required className="header-contact-add-input" />
            <button onClick={createNewContact} className="header-contact-add-button">Add</button>
            </div>
            }
           <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        </div>
    </div>
  )
}

export default ChatHeader