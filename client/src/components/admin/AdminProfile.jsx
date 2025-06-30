import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminProfile = () => {
  const [view, setView] = useState("login"); // "login", "recover", or "new"
  const [message, setMessage] = useState("");
  const [showRecoveryLink, setShowRecoveryLink] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: "", email: "", password: "" });
  const [recoverData, setRecoverData] = useState({ username: "", email: "", food: "", bestFriend: "" });
  const [newData, setNewData] = useState({
    username: "", email: "", password: "", passcode: "",
    securityAnswers: { food: "", bestFriend: "" }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/login", loginData);
      navigate("/dashboard");
    } catch {
      setMessage("Login failed. Wrong credentials.");
      setShowRecoveryLink(true);
    }
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recover", recoverData);
      navigate("/dashboard");
    } catch {
      setMessage("Recovery failed.");
    }
  };

  const handleNewRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register-new", newData);
      setMessage("New admin registered. You can now login.");
      setView("login");
    } catch {
      setMessage("Registration failed. Check passcode.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Panel</h2>
      {message && <div className="alert alert-danger text-center">{message}</div>}

      {/* Navigation buttons */}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-outline-primary mx-2" onClick={() => {
          setView("login");
          setMessage("");
          setShowRecoveryLink(false);
        }}>Login</button>
        <button className="btn btn-outline-success mx-2" onClick={() => {
          setView("new");
          setMessage("");
          setShowRecoveryLink(false);
        }}>New Admin</button>
      </div>

      {/* Login Form */}
      {view === "login" && (
        <form onSubmit={handleLogin} className="card p-4 mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
          <h5 className="mb-3">Login</h5>
          <input className="form-control mb-2" placeholder="Username" onChange={e => setLoginData({ ...loginData, username: e.target.value })} />
          <input className="form-control mb-2" placeholder="Email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
          <div className="input-group mb-2">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button className="btn btn-primary w-100">Login</button>

          {showRecoveryLink && (
            <div className="mt-3 text-center">
              <p className="mb-1">Wrong credentials?</p>
              <button className="btn btn-sm btn-link" onClick={() => setView("recover")}>Try another way</button>
            </div>
          )}
        </form>
      )}

      {/* Recovery Form */}
      {view === "recover" && (
        <form onSubmit={handleRecover} className="card p-4 mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
          <h5 className="mb-3">Recover Access</h5>
          <input className="form-control mb-2" placeholder="Username" onChange={e => setRecoverData({ ...recoverData, username: e.target.value })} />
          <input className="form-control mb-2" placeholder="Email" onChange={e => setRecoverData({ ...recoverData, email: e.target.value })} />
          <input className="form-control mb-2" placeholder="Favorite Food" onChange={e => setRecoverData({ ...recoverData, food: e.target.value })} />
          <input className="form-control mb-2" placeholder="Best Friend's Name" onChange={e => setRecoverData({ ...recoverData, bestFriend: e.target.value })} />
          <button className="btn btn-warning w-100">Recover</button>
        </form>
      )}

      {/* New Admin Registration */}
      {view === "new" && (
        <form onSubmit={handleNewRegister} className="card p-4 mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
          <h5 className="mb-3">Register New Admin</h5>
          <input className="form-control mb-2" placeholder="Username" onChange={e => setNewData({ ...newData, username: e.target.value })} />
          <input className="form-control mb-2" placeholder="Email" onChange={e => setNewData({ ...newData, email: e.target.value })} />
          <div className="input-group mb-2">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              onChange={e => setNewData({ ...newData, password: e.target.value })}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="input-group mb-2">
            <input
              type={showPasscode ? "text" : "password"}
              className="form-control"
              placeholder="Passcode from old admin"
              onChange={e => setNewData({ ...newData, passcode: e.target.value })}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPasscode(!showPasscode)}>
              {showPasscode ? "🙈" : "👁️"}
            </button>
          </div>
          <input className="form-control mb-2" placeholder="Favorite Food" onChange={e => setNewData({ ...newData, securityAnswers: { ...newData.securityAnswers, food: e.target.value } })} />
          <input className="form-control mb-2" placeholder="Best Friend's Name" onChange={e => setNewData({ ...newData, securityAnswers: { ...newData.securityAnswers, bestFriend: e.target.value } })} />
          <button className="btn btn-success w-100">Register</button>
        </form>
      )}
    </div>
  );
};

export default AdminProfile;
