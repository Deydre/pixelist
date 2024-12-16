import React, { useState, useEffect, useContext } from "react";
import { context } from "../../../context/context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";

const ProfileView = () => {
  
  const navigate = useNavigate();
  const { profile, favsUser, updateProfile } = useContext(context);

  const [loading, setLoading] = useState(true);

  const renderCategories = () => {
    return favsUser.map((fav, i) => (
      <div className="favProfile" >
        <img src={fav.background_image} alt={fav.name} />
        <h4>{fav.name}</h4>
      </div>
    ));
  }

  const logoutRedirect = () => {
    navigate(`/`)
  }


  const deleteUser = async () => {
    setLoading(true);
    try {
      let id_user = profile.id
      // Borramos primero todos los favoritos del usuario
      try{
        await axios({
          method: 'delete',
          url: `/api/favorites/all`,
          data: { id_user },
          withCredentials: true
        });
  
      }catch(err){
        console.log(err)
      }
      
      // Llamada a la api para borrar user
      await axios({
        method: 'delete',
        url: `/api/user/email?email=${profile.email}`,
        withCredentials: true
      });

      // Borrar de la cookie
      try {
        await axios({
          method: 'get',
          url: '/api/user/logout',
          withCredentials: true
        });
        updateProfile("")
      } catch (error) {
        console.log(error.message);
      }
      // Borrar del estado
      updateProfile("");
      logoutRedirect();

    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  if (profile) {
    return <><section id="sectionProfile">
      <article className="cardUser">
        <div>
          {/* Si profile.avatar.length es menor a 0, poner img básica */}
          <img src={profile.avatar === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZvkFA_phQsAeSifqjozQU48-N6TwE2cGJ2A&s' : profile.avatar} alt={profile.username} />
          <div>
            <h2>{profile.username}</h2>
          </div>
          <div>
            <p>Email: {profile.email}</p>
            <p>Password: *******</p>
            <p>Quote: {profile.quote === null ? 'Not a quote yet' : profile.quote}</p>
            <div id="userActions">
              <button><FontAwesomeIcon icon={faEdit} /></button>
              <button onClick={deleteUser}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </div>

        </div>
      </article>

      <article className="cardFavs">
        <h2> Your favorites </h2>
        <div>
          {renderCategories()}
        </div>
      </article>
    </section>
    </>

  } else {
    return <section id="sectionUser"><p>Access denied</p></section>
  }
}

export default ProfileView;
