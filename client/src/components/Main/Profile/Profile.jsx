import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const ProfileView = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios(`http://localhost:3000/api/user/me`, { 
          withCredentials: true 
        });
        setProfile(response.data[0])
      console.log(response)
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, []);

  console.log(profile)
  if (profile !== null) {
    return <section id="sectionUser">
    <article className="cardUser">
      <div>
        {/* Si profile.avatar.length es menor a 0, poner img básica */}
        <img src={profile.avatar} alt="" />
        <div>
          <h2>{profile.username}</h2>
        </div>
        <div>
          <p>Email: {profile.email}</p>
          <p>Password: *******</p>
          <p>Quote: {profile.quote}</p>
        </div>
      </div>
      <div id="userActions">
        <button><FontAwesomeIcon icon={faEdit} /></button>
        <button><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </article>
  </section>
  }
 
};

export default ProfileView;
