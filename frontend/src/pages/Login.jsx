import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const text = await res.text(); 

  console.log("STATUS:", res.status);
  console.log("RESPONSE:", text);

    try {
        const data = JSON.parse(text);

        if (!res.ok) {
        alert("Login gagal");
        return;
        }

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", username);

        window.location.href = "/";
    } catch (err) {
        alert("Backend tidak balikin JSON → cek password / endpoint");
        }
    };
  return (
    <div className="login-container">
      <h1>CraftFlow</h1>
      <p>Welcome back 👋</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;