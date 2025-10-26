import "./About.css";
import chondaPhoto from "../../assets/ActaHeadShot3.png";

function About() {
  return (
    <section className="about">
      <div className="author-image">
        <img
          src={chondaPhoto}
          alt="Chonda's photo"
          className="author-placeholder"
        />
      </div>
      <div className="about-author">
        <h1 className="about-header">About the author</h1>
        <p className="author-info">
          Hi, I’m Chonda—a Technical Product Manager and full-stack developer
          with a global mindset and a love for clean, scalable code. I
          specialize in the MERN stack and thrive in Agile environments where
          structure meets creativity.
        </p>
        <p className="author-info">
          Originally from the US and now based in France, I bring cross-cultural
          perspective and a pragmatic approach to building reviewer-friendly
          applications. At TripleTen, I sharpened my skills in debugging,
          refactoring, and Git workflow discipline—learning how to turn chaos
          into clarity across the stack.
        </p>
        <p className="author-info">
          I help customers by translating complex requirements into intuitive,
          maintainable solutions. Whether it’s restoring project structure,
          optimizing layout, or polishing code for long-term scalability, I
          bring persistence, adaptability, and a touch of humor to every build.
        </p>
      </div>
    </section>
  );
}

export default About;
