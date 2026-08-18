import type { JSX } from "react";
import { Terminal, Code2, Heart } from "lucide-react";
import "./Footer.scss";

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <Terminal size={16} className="footer__logo-icon" />
              <span className="footer__logo-text">~/todo</span>
            </div>
            <span className="footer__version">v1.0.0</span>
          </div>

          <div className="footer__status">
            <span className="footer__dot" />
            <span className="footer__status-text">All systems operational</span>
          </div>

          <div className="footer__links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
              aria-label="Source Code"
            >
              <Code2 size={15} />
              <span>Source</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            Built with <Heart size={12} className="footer__heart" /> for developers who ship fast.
          </p>
        </div>
      </div>
    </footer>
  );
};
