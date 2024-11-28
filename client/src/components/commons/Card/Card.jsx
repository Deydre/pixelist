import React from "react";

const Card = (game) => {
console.log(game)
  const {name, background_image, id } = game.data;
 
  return <>
    <article className="cardVideogame" id={id}>
      <div>
        <img src={background_image} alt={name} />
      </div>
      <div>
        <h4>{name}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
          In condimentum facilisis porta. Sed nec diam eu diam mattis viverra nulla fringilla, nunc tristique.
          Curabitur venenatis eros et felis bibendum, a efficitur sem malesuada.</p>
      </div>
    </article>
  </>;
};

export default Card;
