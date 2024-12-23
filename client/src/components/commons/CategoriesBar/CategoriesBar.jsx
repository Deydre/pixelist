import React, { useContext, useState, useEffect } from 'react';
import { context } from "../../../context/context"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CategoriesBar = () => {

  const navigate = useNavigate();
  const { categories, updateActualCategory } = useContext(context);

  const categoryRedirect = (slug) => {
    navigate(`/categories/${slug}`)
    updateActualCategory(slug)
  }

  const renderCategories = () => {
    return categories.map((category, i) => (
      <li key={i} onClick={() => categoryRedirect(category.slug)}>
        {category.name}
      </li>
    ));
  }


  // Llamada a la API externa para obtener los géneros
  // https://api.rawg.io/api/genres?key=8bc058a2ff334be08c12bd09fc19ad4b
  // Pintar géneros dinámicamente y meterles un onclick que lleve a categories con params

  return <aside id="categoriesBar">
    <h6>CATEGORIES</h6>
    <ul>
      <h3>Genres</h3>
      <Link to='/'><li>All genres</li></Link>
      {renderCategories()}
    </ul>
    <ul>
      <h3>Platforms</h3>
      <li>
        <p>PC</p>
      </li>
      <li>
        <p>PlayStation</p>
      </li>
      <li>
        <p>Xbox 360</p>
      </li>
      <li>
        <p>Nintendo Switch</p>
      </li>
    </ul>
  </aside>;
};

export default CategoriesBar;
