import React from "react";
import {Link} from 'react-router-dom'
import hero from '../../assets/image/hero.jpeg'
import './Landing.css'

const Landing = () => {
  return (
    <div className="hero">
      <div className="intro-text">
        <h1>
          <span className="tagline1">Organize work and life</span> <br />
          <span className="tagline2"> Finally.</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          sapiente consequatur numquam ad fuga accusamus fugiat eos distinctio
          quis inventore!
        </p>
        <Link className="btn red" to="/register" >Register Now!</Link>
        <Link className="btn blue" to="/login" >Login</Link>
      </div>
      <div className="hero-img">
        <img src={hero} alt="hero image" width={400} height={300} />
      </div>
    </div>
  );
};

export default Landing;
