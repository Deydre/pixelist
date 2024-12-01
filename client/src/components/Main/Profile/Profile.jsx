import React, { useState, useEffect, useContext } from "react";
import { context } from "../../../context/context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";

const ProfileView = () => {

  const { profile, favsUser } = useContext(context);

  const [loading, setLoading] = useState(true);

  const renderCategories = () => {
    return favsUser.map((fav, i) => (
      <div className="favProfile" >
        <img src={fav.background_image} alt={fav.name} />
        <h4>{fav.name}</h4>
      </div>
    ));
  }


  const deleteUser = async () => {
    setLoading(true);
    try {
      let id_user = profile.id
      // Borramos primero todos los favoritos del usuario
      await axios({
        method: 'delete',
        url: `http://localhost:3000/api/favorites/all`,
        data: { id_user },
        withCredentials: true
      });

      // Llamada a la api para borrar user
      await axios({
        method: 'delete',
        url: `http://localhost:3000/api/user/email?email=${profile.email}`,
        withCredentials: true
      });

      // // Las 3 líneas que hacen la magia de que se quede guardado el rol
      // // Con el header ya se envía la cabecera con el token, no hay que manejarlo a mano
      // En las futuras solicitudes por axios se enviará encabezado el token
      const authHeader = response.headers.authorization;
      axios.defaults.headers.common['Authorization'] = authHeader;

      updateProfile({ email: email });
      loginRedirect();

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
