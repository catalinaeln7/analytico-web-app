import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <section className="home">
      <img
        src="bg.png"
        alt="Analytics dashboard preview"
        className="home-image"
      />

      <img
        src="how_it_works.png"
        alt="Chat analytics preview"
        className="home-image"
      />
    </section>
  );
};

export default Home;
