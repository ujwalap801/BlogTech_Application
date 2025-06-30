import { NavLink, Outlet } from "react-router-dom";
import '../../assets/styles/AuthorProfile.css';



const UserProfile = () => {

  return (
    <div className="container py-4">
      <div className="author-profile bg-white shadow rounded p-3">

      
          <ul className="nav justify-content-center flex-wrap gap-3 mb-4">
            <li className="nav-item">
              <NavLink
                to="articles"
                className={({ isActive }) =>
                  `nav-link fs-5 px-4 py-2 rounded-pill ${isActive ? "active-tab" : ""}`
                }
              >
                Articles
              </NavLink>
            </li>
       
          </ul>
  

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserProfile