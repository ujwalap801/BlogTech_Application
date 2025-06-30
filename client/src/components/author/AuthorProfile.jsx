
import { useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext';

const AuthorProfile = () => {
  const location = useLocation();
  const { currentUser } = useContext(UserAuthorContextObj);

  const role = currentUser?.role;

  return (
    <div className="container py-4">
      <div className="author-profile bg-white shadow rounded p-3">

        {/* Show only when on /article or /articles */}
        {(location.pathname.includes("/article") || location.pathname.includes("/articles")) && role && (
          <ul className="nav justify-content-center flex-wrap gap-3 mb-4">
            {role === 'author' && (
              <li className="nav-item">
                <NavLink
                  to="article"
                  className={({ isActive }) =>
                    `nav-link fs-5 px-4 py-2 rounded-pill ${isActive ? "active-tab" : ""}`
                  }
                >
                  Add New Article
                </NavLink>
              </li>
            )}
            {/* Show for both author and user */}
            <li className="nav-item">
              <NavLink
                to="articles"
                className={({ isActive }) =>
                  `nav-link fs-5 px-4 py-2 rounded-pill ${isActive ? "active-tab" : ""}`
                }
              >
                View Articles
              </NavLink>
            </li>
          </ul>
        )}

        {/* Nested route components */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
