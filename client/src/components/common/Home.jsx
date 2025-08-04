import { useContext, useEffect, useState } from "react";
import { UserAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa"; // Admin icon
import TechHero from "../../TechHero";


import TechTrendsTicker from "../TechTrendsTicker"
import Body from "../Body";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj);
  // const data = useContext(UserAuthorContextObj);
  // console.log(data);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // console.log("user":,user)
  useEffect(() => {
    setCurrentUser({
      ...currentUser,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses?.[0]?.emailAddress,
      profileImageUrl: user?.imageUrl
    });
  }, [isLoaded]);





  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setError('');

  //   const formData = new FormData(e.target);
  //   const selectedRole = formData.get("role");

  //   if (!selectedRole) {
  //     setError("Please select a role.");
  //     return;
  //   }

  //   const updatedUser = {
  //     ...currentUser,
  //     role: selectedRole,
  //     isActive: true,
  //   };

  //   try {
  //     let res;
  //     if (selectedRole === "author") {
  //       res = await axios.post('https://blogtech-backend.onrender.com/author-api/author', updatedUser);
  //     } else {
  //       res = await axios.post('https://blogtech-backend.onrender.com/user-api/user', updatedUser);
  //     }

  //     const { message, payload } = res.data;

  //     if (message === selectedRole) {
  //       setCurrentUser({ ...updatedUser, ...payload });
  //       setError("success");
  //       setTimeout(() => {
  //         navigate(`/${selectedRole}-profile/${updatedUser.role}`);
  //       }, 1000);
  //     }
  //     else {
  //       setError(message);
  //     }
  //   } catch (err) {
  //     console.error("Submission error:", err);
  //     setError("Server error. Please try again.");


  //     if (err.response?.status === 403 && err.response.data?.message === "AccountBlocked") {
  //   setError(err.response.data.blockMessage || "Your account is blocked. Please contact admin.");
  // } else {
  //   setError("Server error. Please try again.");
  // }
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.target);
    const selectedRole = formData.get("role");

    if (!selectedRole) {
      setError("Please select a role.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      role: selectedRole,
      isActive: true,
    };

    try {
      let res;
      if (selectedRole === "author") {
        res = await axios.post('http://localhost:3000/author-api/author', updatedUser);
      } else {
        res = await axios.post('http://localhost:3000/user-api/user', updatedUser);
      }

      const { message, payload } = res.data;

      if (message === selectedRole) {
        setCurrentUser({ ...updatedUser, ...payload });
        setError("success");
        setTimeout(() => {
          navigate(`/${selectedRole}-profile/${updatedUser.role}`);
        }, 1000);
      } else {
        setError(message);
      }

    } catch (err) {
      console.error("Submission error:", err);

      if (err.response) {
        const { status, data } = err.response;

        if (status === 403) {
          if (data.message === "AccountBlocked") {
            setError(data.blockMessage || "Your account is blocked. Please contact admin.");
          } else if (data.message === "RoleMismatch") {
            setError(data.info || "The selected role does not match our records.");
          } else {
            setError(data.message || "Access denied.");
          }
        } else {
          setError(data.message || "Something went wrong.");
        }

      } else {
        setError("Network error. Please try again.");
      }
    }
  }




  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.role}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.role}`);
    }
  }, [currentUser?.role]);


  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Left Floating Admin Icon */}




      <div
        style={{
          position: 'fixed',
          bottom: '120px',
          right: 0,
          width: '100px',
          background: 'linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)',
          padding: '12px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
          zIndex: 999,
        }}
        onClick={() => navigate('/admin-profile')}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '-6px 0 20px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '-4px 0 10px rgba(0, 0, 0, 0.1)';
        }}
      >
        <FaUserShield size={24} color="#007bff" />
        <div
          style={{
            paddingTop: '6px',
            color: '#007bff',
            fontWeight: '600',
            fontSize: '14px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          Admin
        </div>
      </div>

      {/* Content */}
      {isSignedIn === false && (
        <div>
          <TechHero />
          <TechTrendsTicker />

          <Body />

        </div>

      )}



      {isSignedIn && (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
          <div className="card shadow p-4 w-100" style={{ maxWidth: "500px", backgroundColor: "#f0f8ff" }}>

            {!currentUser?.role && (
              <h4 className="text-center mb-3 text-primary fw-bold">Select / Choose Your Role</h4>
            )}


            {currentUser?.role && error === "success" && (
              <div className="alert alert-success text-center" role="alert">
                You are signed in as <strong>{currentUser.role}</strong>.
              </div>
            )}


            {/* Error if exists */}
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            {/* Role Form */}

            <form onSubmit={handleSubmit}>
              {!currentUser?.role && (
                <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" id="authorRole" value="author" />
                    <label className="form-check-label" htmlFor="authorRole">Author</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" id="userRole" value="user" />
                    <label className="form-check-label" htmlFor="userRole">User</label>
                  </div>
                </div>)}

              {/* Show button only if no role selected */}
              {!currentUser?.role && (
                <button type="submit" className="btn btn-primary w-100">
                  Confirm Role
                </button>
              )}
            </form>
          </div>
        </div>
      )}




    </div>
  );
};

export default Home;
