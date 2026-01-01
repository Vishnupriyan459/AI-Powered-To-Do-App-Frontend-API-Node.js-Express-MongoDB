import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_Backend_API_URL ;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // backend errors
      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // must have token & user returned
      if (!data.token || !data.user) {
        alert("Invalid response from server");
        setLoading(false);
        return;
      }

      // Save token + user details to localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("fullName", data.user.fullName);  // optional quick-access

      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      console.error("Login error", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Login
        </h2>

        <label className="block mb-2 text-gray-600">Email</label>
        <input
          type="email"
          className="border p-2 w-full rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-gray-600">Password</label>
        <input
          type="password"
          className="border p-2 w-full rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 font-medium ml-1">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
