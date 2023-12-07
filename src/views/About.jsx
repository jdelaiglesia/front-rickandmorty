import aboutMe from "../assets/aboutMe.png";
import Tilt from "react-parallax-tilt";

import "../styles/About.css";

const About = () => {
  return (
    <div className="aboutContainer">
      <hr />
      <h1 className="aboutTitle">About - Joaquín de la Iglesia</h1>
      <Tilt
        glareEnable="true"
        glareColor="#9858a1"
        tiltMaxAngleX={0}
        tiltMaxAngleY={0}
      >
        <img className="aboutImg" src={aboutMe} alt="" srcset="" />
      </Tilt>
      <p className="aboutText">
        Joaquín de la Iglesia es un humano nacido en Neuquén, Argentina, Planeta
        Tierra C-137.
      </p>
      <p className="aboutText">
        Incursionó en la programación desde joven, y ama la computación desde
        que tenía 6 años.
      </p>
      <p className="aboutText">
        Actualmente, Joaquín estudia en SoyHenry la carrera de Full Stack
        Developer.
      </p>
    </div>
  );
};

export default About;
