import "./reset.css";
import "./App.css";
import Logo from "./components/logo/logo";
import CanConstructor from "./components/canConstructor/canConstructor";
import WavePng from "./assets/wave-cropped.png";

function App() {
  return (
    <div className="c-layout">
      <header className="c-header">
        <div className="c-logo__main">
          <Logo />
        </div>
        <div className="c-title">customize your can with Aim High.</div>
      </header>
      <main>
        <img className="c-wave c-wave__top" src={WavePng} />
        <div>
          <CanConstructor />
        </div>
      </main>
      <footer className="c-footer">
        <ul className="c-footer__copyright">
          <li className="c-footer__big-text">
            2024 AIM HIGH. ALL RIGHTS RESERVED.
          </li>
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
        <div className="c-logo__footer">
          <Logo />
        </div>
      </footer>
    </div>
  );
}

export default App;
