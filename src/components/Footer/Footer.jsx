import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <p className="footer-info">
          &copy; 2025 Supersite, Powered by News API
        </p>
        <ul className="footer-url">
          <li>
            <Link to="/" className="footer-link">
              Home
            </Link>
          </li>
          <li>
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              TripleTen
            </a>
          </li>
          <li>
            <a
              href="https://github.com/chondasaine/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaGithub size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/chonda-saine/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaLinkedin size={24} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
