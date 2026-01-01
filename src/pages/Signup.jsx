import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_Backend_API_URL ;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !email || !password || !confirmPassword) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Save token + user details
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Account created successfully!");
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Sign Up
        </h2>

        <label className="block mb-2 text-gray-600">Full Name</label>
        <input
          type="text"
          className="border p-2 w-full rounded mb-4"
          onChange={(e) => setFullName(e.target.value)}
        />

        <label className="block mb-2 text-gray-600">Email</label>
        <input
          type="email"
          className="border p-2 w-full rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-gray-600">Password</label>
        <input
          type="password"
          className="border p-2 w-full rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="block mb-2 text-gray-600">Confirm Password</label>
        <input
          type="password"
          className="border p-2 w-full rounded mb-4"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-600 font-medium ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
