/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../../Styles/Avatar.css'
import axios from 'axios';
import { backendUrl } from '../../../config';

const Avatar = ({avatarProfile, setAvatarProfile}) => {
    const {userEmail, accessToken} = JSON.parse(sessionStorage.getItem('user'))
    const [profileData, setProfileData] = useState({
        profileLink : ''
    })
    // const profileArray = [
    //     'https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    //     'https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
    //     'https://png.pngtree.com/png-vector/20221128/ourmid/pngtree-profile-picture-illustration-with-brown-hoodie-png-image_6484306.png',
    //     'https://i.pinimg.com/736x/d0/4b/1f/d04b1f2ed3ca8ad4a302fbe9f4f5a875.jpg',
    //     'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=',
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGf_8UZ3xLijdkOtv3qWnUpyknARbKMrcVJA&usqp=CAU'
    // ]
    const profileArray = [
        'https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp',
        'https://lh3.googleusercontent.com/proxy/lmo_BMkEUpaAap2dn3BHwsB77_0mK83hFdyDRgaXW2_ZM0gjLGbhXtdMBxPcwJjiKt5yClOAplNjrvCYLtIhPcxQE-CveN6_fD_Ows2t7XBiRr1-PUn2KIy2ArECBdrvxweT5gZddOl4HSxS2yc',
        'https://image.lexica.art/full_jpg/19f280a2-2b97-4be2-b782-1fd5c70b84f4',
        'https://i.pinimg.com/736x/d0/4b/1f/d04b1f2ed3ca8ad4a302fbe9f4f5a875.jpg',
        'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=',
        'https://i.pinimg.com/736x/b7/34/09/b73409305f55eb0813012ffdc5f54ac1.jpg'
    ]
    const [selectedProfile, setSelectedProfile] = useState(null);
    const selectProfilePicture = async(i)=>{
       setSelectedProfile(i)
       setProfileData({
        profileLink : profileArray[i]
       })
    }
    const handleSelectProfile = async()=>{
        try{
            console.log(profileData)
            let response = await axios.post(`${backendUrl}/profile/${userEmail}`, profileData,{
                headers : {
                    "auth-token" : accessToken
                }
            })
            // let response = await fetch(`${backendUrl}/profile/${userEmail}`,{
            //     method : 'POST',
            //     body : JSON.stringify(profileData),
            //     headers : {
            //         "Content-Type": "application/json"
            //     }
            // })
            console.log(response.data)
            if(response.status === 200){
                setAvatarProfile(!avatarProfile)
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="avatar-container" >
        <h3>Please Select your Profile</h3>
        <div className="profile-select">
            {profileArray.map((pro,i) => (
                <div className="profile-item" key={i} >
                    <img src={pro} alt="Loading" onClick={()=> selectProfilePicture(i)} className={`profile-item-img-${selectedProfile === i ? 'selected' : 'none'}`} />
                </div>
            ))}
        </div>
        <button className="profile-select-btn" onClick={handleSelectProfile} >
            Select
        </button>
    </div>
  )
}

export default Avatar