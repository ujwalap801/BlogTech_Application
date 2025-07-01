
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import '../../assets/Styles/Header.css';
import { useClerk, useUser } from "@clerk/clerk-react";
import { UserAuthorContextObj } from "../../contexts/UserAuthorContext";
import BlogNest from '../../assets/BlogNest.png';
import { FaUserShield } from "react-icons/fa"; // Admin icon

const Header = () => {
  const { signOut } = useClerk();

  const {setCurrentUser } = useContext(UserAuthorContextObj);


  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  // function to signout 
  async function handleSignout() {
    await signOut();
    setCurrentUser(null);
    navigate("/")
  }


  return (
    <div>

      {/* <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
        <div className="container-fluid">
     
          <Link className="navbar-brand" to="/">
            <img src={BlogNest} alt="Logo" height="60" />
          </Link>

  
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-2 align-items-lg-center">
              {!isSignedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/signin">Signin</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/signup">Signup</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center gap-2 flex-column flex-lg-row">
                  <img
                    src={user.imageUrl}
                    alt="user"
                    className="rounded-circle border border-primary"
                    width="40"
                    height="40"
                  />
                  <span className="fw-semibold text-dark">{user.firstName}</span>
                  <button className="btn btn-sm btn-outline-danger" onClick={handleSignout}>
                    Signout
                  </button>
                </li>

              )}
            </ul>
          </div>
        </div>
      </nav> */}

 <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2"
  style={{ background: 'linear-gradient(to right, #f0f4ff, #dbe9ff)' }}>
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={BlogNest} alt="Logo" height="60" />
          </Link>

          {/* Hamburger menu for small screens */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Main nav links */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-2 align-items-lg-center">
              {!isSignedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/signin">Signin</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/signup">Signup</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center gap-2 flex-column flex-lg-row">
                  <img
                    src={user.imageUrl}
                    alt="user"
                    className="rounded-circle border border-primary"
                    width="40"
                    height="40"
                  />
                  <span className="fw-semibold text-dark">{user.firstName}</span>
                  <button className="btn btn-sm btn-outline-danger" onClick={handleSignout}>
                    Signout
                  </button>
                </li>



              )}



              
    
            </ul>



            

          </div>


        </div>
      </nav>

   

    </div>
  )
}

export default Header