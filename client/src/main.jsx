import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from "./components/RootLayout.jsx"
import UserAuthorContext from './contexts/UserAuthorContext.jsx';

import Home from "./components/common/Home.jsx";
import Signin from "./components/common/Signin.jsx";
import Signup from "./components/common/Signup.jsx";


import ArticlesByID from "./components/common/ArticleByID.jsx"
import Articles from "./components/common/Articles.jsx";

import AuthorProfile from "./components/author/AuthorProfile.jsx";
import PostArticle from "./components/author/PostArticle.jsx";

import UserProfile from "./components/user/UserProfile.jsx";

import AdminProfile from "./components/admin/AdminProfile.jsx"
import AdminDashboard from "./components/admin/AdminDashboard.jsx"


const broswerRouterObj = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
      },

      // ADMIN PROFILE ROUTER
      {
        path: "admin-profile",
        element: <AdminProfile />,

      },

      {
        path: "dashboard",
        element: <AdminDashboard />
      }
      ,
      //USER PROFILE ROUTER
      {
        path: "user-profile/:role",
        element: <UserProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />
          },
          {
            path: ":articleId",
            element: <ArticlesByID />
          },
          {
            path: "",
            element: <Navigate to="articles" />
          }
        ]
      },

      // AUTHOR PROFILE ROUTES
      {
        path: "author-profile/:role",
        element: <AuthorProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />
          },
          {
            path: ":articleId",
            element: <ArticlesByID />
          },
          {
            path: "article",
            element: <PostArticle />
          },
          {
            path: "",
            element: <Navigate to="articles" />
          }
        ]
      }


    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
      <RouterProvider router={broswerRouterObj} />
    </UserAuthorContext>

  </StrictMode>,
)
