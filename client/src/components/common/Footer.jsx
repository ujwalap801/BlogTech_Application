import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Footer.css'; // Optional: for any custom styling

const Footer = () => {
  return (
   <footer className="bg-dark text-white pt-5 pb-4 mt-5">
  <div className="container">
<div className="row gy-4 text-center text-md-start justify-content-evenly">

      {/* Brand */}
      <div className="col-md-4">
        <h5 className="fw-bold text-info">BlogNest</h5>
        <p className="small">Empowering developers to build better software every day.</p>
      </div>

      {/* Links */}
      <div className="col-md-4">
        <h6 className="fw-semibold mb-3">Quick Links</h6>
        <ul className="list-unstyled">
          <li><Link to="/" className="text-white text-decoration-none d-block mb-2">Home</Link></li>
          {/* <li><Link to="/about" className="text-white text-decoration-none d-block mb-2">About</Link></li> */}
          <li><Link to="/signin" className="text-white text-decoration-none d-block mb-2">Signin</Link></li>
          <li><Link to="/signup" className="text-white text-decoration-none d-block mb-2">Signup</Link></li>
        </ul>
      </div>

      {/* Social */}
 <div className="col-md-4">
  <h6 className="fw-semibold mb-3">Follow Us</h6>
  <div className="d-flex flex-column align-items-center align-items-md-start gap-2">
    <span className="text-white fs-5"><i className="bi bi-facebook me-2"></i>Facebook</span>
    <span className="text-white fs-5"><i className="bi bi-twitter me-2"></i>Twitter</span>
    <span className="text-white fs-5"><i className="bi bi-instagram me-2"></i>Instagram</span>
    <span className="text-white fs-5"><i className="bi bi-linkedin me-2"></i>LinkedIn</span>
  </div>
</div>

    </div>

    {/* Divider & Copyright */}
    <hr className="border-secondary mt-4" />
    <p className="text-center mb-0 small pt-2">&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
  </div>
</footer>
  );
};

export default Footer;
