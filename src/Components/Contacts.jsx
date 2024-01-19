/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl } from "../../config"
import { Link } from "react-router-dom"
import '../Styles/Contact.css'

const Contacts = ({setSelectContact, selectContact, isContactAddedHome, setChatPersonName, setSideNavClass, setBars}) => {
    const [contacts, setContacts] = useState([])
    
    const {userEmail, accessToken} = JSON.parse(sessionStorage.getItem('user'))
    const getAllContacts = async()=>{
         await axios.get(`${backendUrl}/contacts/${userEmail}`,{
            headers : {
                "auth-token" : accessToken
              }
         }).then(response => {
            setContacts(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    
   

    
    

    const handleSelectContact = (contact) =>{
        setSelectContact(contact.mail)
        setChatPersonName(contact)
        setSideNavClass('home-header')
        setBars('bars')
    }


    

    const handleLogOut = ()=>{
        sessionStorage.removeItem('user')
    }


    useEffect(()=>{
        getAllContacts()
    },[isContactAddedHome])
  return (
    <div className="contact-container">
        <div className="contact-main">

        {
            contacts.length === 0 ? 
            <div className="contact-0">
                <p>Please click the '+' button and add your chat contacts</p>
            </div>
            :
            <div className="contact-all-contacts">
            {contacts.map((contact, i)=>(
                <Link to={`/${selectContact}`}  className="contact-item" key={i} onClick={() => handleSelectContact(contact)}>
                    <img src={contact.profile} alt="" className="contact-item-img" />
                    {/* {setChatPersonName(contact)} */}
                    {/* {console.log(contact)} */}
                    <h5>{contact.name}</h5>
                </Link>
            ))}
            </div>
        }
        </div>


        <div className="logout-div" onClick={handleLogOut}>
            <p>Log out</p>
            <button className="contact-log-out" onClick={handleLogOut}>
                <Link to='/auth/login' className="log-out-link" >
                
            <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
            </button>
        </div>
         
        
    </div>
  )
}

export default Contacts