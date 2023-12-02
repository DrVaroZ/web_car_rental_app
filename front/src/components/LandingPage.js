import { Link } from "react-router-dom";
import './styles/landing_page.css';

const LandingPage = () => (
    <div className="landing-page-container">
      <h2>Welcome to Car Rental App</h2>
      <p>Choose an action:</p>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );

  export default LandingPage;