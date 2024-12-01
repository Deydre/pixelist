import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const ProfileView = () => {
  let name = "Bolito";
  let id = 2;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {

        const response = await axios(`http://localhost:3000/api/user/me`, { 
          withCredentials: true 
        });
        setProfile(response.data[0].email)
      
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, []);

  console.log(profile)
  return <section id="sectionUser">
    <article className="cardUser" id={id}>
      <div>
        <div>
          <h2>{name}</h2>
        </div>
        <div>
          <p>email</p>
          <p>avatar</p>
          <p>quote</p>
        </div>
      </div>
      <div id="userActions">
        <button><FontAwesomeIcon icon={faEdit} /></button>
        <button><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </article>
  </section>
};

export default ProfileView;
