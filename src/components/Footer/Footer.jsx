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
          <div className="footer-links">
            <li>
              <Link to="/" className="footer-link footer-link_home">
                Home
              </Link>
            </li>
            <li>
              <a
                href="https://tripleten.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link footer-link_tt"
              >
                TripleTen
              </a>
            </li>
          </div>
          <div className="footer-icons">
            <li>
              <a
                href="https://github.com/chondasaine/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon footer-icon_git"
              >
                <FaGithub size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/chonda-saine/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon footer-icon footer-icon__li"
              >
                <FaLinkedin size={24} />
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
