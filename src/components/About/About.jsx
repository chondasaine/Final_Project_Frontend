import "./About.css";
import chondaPhoto from "../../assets/ActaHeadShot3.png";

function About() {
  return (
    <section className="about">
      <div className="about__image">
        <img
          src={chondaPhoto}
          alt="Chonda's photo"
          className="about__placeholder"
        />
      </div>
      <div className="about__author">
        <h1 className="about__header">About the author</h1>
        <p className="about__info">
          Hi, I’m Chonda—a Technical Product Manager and full__stack developer
          with a global mindset and a love for clean, scalable code. I
          specialize in the MERN stack and thrive in Agile environments where
          structure meets creativity.
        </p>
        <p className="about__info">
          Originally from the US and now based in France, I bring cross__cultural
          perspective and a pragmatic approach to building reviewer__friendly
          applications. At TripleTen, I sharpened my skills in debugging,
          refactoring, and Git workflow discipline—learning how to turn chaos
          into clarity across the stack.
        </p>
        <p className="about__info">
          I help customers by translating complex requirements into intuitive,
          maintainable solutions. Whether it’s restoring project structure,
          optimizing layout, or polishing code for long__term scalability, I
          bring persistence, adaptability, and a touch of humor to every build.
        </p>
      </div>
    </section>
  );
}

export default About;
