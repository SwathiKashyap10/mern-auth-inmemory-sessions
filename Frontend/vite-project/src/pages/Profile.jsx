// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setError(res.data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Render more user fields if available */}
        </div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default Profile;
