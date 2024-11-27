import React from "react";
import CategoriesBar from "../../commons/CategoriesBar/CategoriesBar";
import SearchBar from "../../commons/searchBar"
import Card from "../../commons/Card"

// import PageContent from 
const Home = () => {
  return <section id="home">
    <CategoriesBar/>
    <div id="contentHome">
      <SearchBar/>
      <section id="contentCards">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </section>
    </div>
  </section>;
};

export default Home;
