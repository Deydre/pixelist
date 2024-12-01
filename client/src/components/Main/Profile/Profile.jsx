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


  if (profile) {
    return <><section id="sectionProfile">
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
