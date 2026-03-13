import React, { useState, useEffect } from "react"; // Added useEffect import
import Sidebar from "../../components/sidebar/Sidebar";
import "./ProfilePageStyle.css";
import Button from "./../../components/button/Button";
import ImageHolder from "../../components/image/ImageHolder";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [image, setImage] = useState();

  // Move function out of useEffect
  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:8080/api/users/email?email=${encodeURIComponent(user.email)}`,
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setName(data.username);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  // useEffect must be called here, at the top level
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-page">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="profile-main">
        <div className="profile-content">
          <h1 style={{ fontSize: "3rem" }}>Profile</h1>

          <div className="account-details">
            <div className="profile-image">
              <ImageHolder />
            </div>

            <div className="profile-actions-wrapper">
              <div className="profile-buttons">
                <Button value="Change Photo" />
                <Button value="Remove Photo" color="#E4E4E4" />
              </div>
              <p className="image-desc">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          {/* Moved outside account-details if you want it to span the width below */}
          <div className="name-plate-wrapper">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="profile-input"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
