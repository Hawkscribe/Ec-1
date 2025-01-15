import React, { useState } from "react";

const App = () => {
  const [userType, setUserType] = useState(""); // "user" or "contractor"
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const route =
      userType === "user"
        ? "/api/v1/user/signup"
        : "/api/v2/contracter/signup";

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg || "Signup successful");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const route =
      userType === "user"
        ? "/api/v1/user/signin"
        : "/api/v2/contracter/signin";

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful");
        setIsLoggedIn(true);
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  const workCategories = ["Construction", "Electricity", "Plumbing", "Painting", "Carpentry"];

  return (
    <div style={styles.app}>
      {!isLoggedIn ? (
        <div style={styles.card}>
          <h1 style={styles.title}>Labour Management System</h1>
          <form style={styles.form}>
            <h2 style={styles.subtitle}>
              {userType ? `${userType} Login/Signup` : "Choose User Type"}
            </h2>
            <div style={styles.field}>
              <label style={styles.label}>User Type</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={styles.input}
              >
                <option value="">Select</option>
                <option value="user">User</option>
                <option value="contractor">Contractor</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Mobile Number</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.buttonGroup}>
              <button onClick={handleSignup} style={styles.primaryButton}>
                Signup
              </button>
              <button onClick={handleSignin} style={styles.secondaryButton}>
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.subtitle}>Welcome, {userType === "user" ? "User" : "Contractor"}!</h2>
          <h3 style={styles.subtitle}>Available Labour Work</h3>
          <ul style={styles.list}>
            {workCategories.map((work, index) => (
              <li key={index} style={styles.listItem}>
                {work}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Updated Styles
const styles = {
  app: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    textAlign: "left",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  primaryButton: {
    flex: 1,
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  secondaryButton: {
    flex: 1,
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: "0",
    marginTop: "20px",
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginBottom: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "1rem",
    textAlign: "left",
  },
};

export default App;
