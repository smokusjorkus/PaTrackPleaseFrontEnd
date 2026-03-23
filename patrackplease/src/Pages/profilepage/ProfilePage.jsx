import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./ProfilePageStyle.css";
import Button from "./../../components/button/Button";
import ImageHolder from "../../components/image/ImageHolder";
import EditInfoForm from "../../components/editinfoform/EditInfoForm";
import toast from "react-hot-toast";

export default function ProfilePage({ isOpen, setIsOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(""); // Syncs with profileImageUrl
  const [editOpen, setEditOpen] = useState(false);
  const [editType, setEditType] = useState("");

  // FETCH USER DATA
  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:8080/api/users/email?email=${encodeURIComponent(user.email)}`,
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Syncing state with Backend Model
      setName(data.username);
      setEmail(data.email);
      // IMPORTANT: Using profileImageUrl to match your Java User.java
      setImage(data.profileImageUrl || "");
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  // SAVE/UPDATE LOGIC
  const handleSave = async (type, newValue) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      let res;

      if (type === "Photo") {
        const formData = new FormData();
        // newValue is the File object or null (for removal)
        formData.append("file", newValue);
        formData.append("email", user.email);

        res = await fetch(`http://localhost:8080/api/users/upload-photo`, {
          method: "POST",
          body: formData,
        });
      } else {
        let updateBody = {};
        if (type === "Email") updateBody = { email: newValue };
        else if (type === "Password") updateBody = { password: newValue };
        else updateBody = { username: newValue };

        res = await fetch(
          `http://localhost:8080/api/users/update?email=${encodeURIComponent(user.email)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateBody),
          },
        );
      }

      if (!res.ok) throw new Error("Update failed");

      const updatedData = await res.json();

      // Refreshing UI with fresh data from Backend
      setName(updatedData.username);
      setEmail(updatedData.email);
      setImage(updatedData.profileImageUrl || ""); // Update to match Java Model

      localStorage.setItem("user", JSON.stringify(updatedData));

      toast.success(
        newValue === null && type === "Photo"
          ? "Photo removed."
          : `Successfully updated ${type}.`,
      );

      setEditOpen(false);
    } catch (error) {
      console.error("Save error:", error);
      toast.error(`Failed to update ${type}.`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const openEditModal = (type) => {
    setEditType(type);
    setEditOpen(true);
  };

  return (
    <div className="profile-page animate__animated animate__fadeIn">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} name={name} />

      <main className={`profile-main ${isOpen ? "open" : "closed"}`}>
        <div className="profile-content">
          <h1 style={{ fontSize: "3rem" }}>Profile</h1>

          <div className="account-details">
            <div className="profile-image">
              {/* Pass the dynamic image state to ImageHolder */}
              <ImageHolder src={image} />
            </div>

            <div className="profile-actions-wrapper">
              <div className="profile-buttons">
                <Button
                  value="Change Photo"
                  onClick={() => openEditModal("Photo")}
                />
                <Button
                  value="Remove Photo"
                  color="#E4E4E4"
                  onClick={() => handleSave("Photo", null)}
                />
              </div>
              <p className="image-desc">JPG or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="name-plate-wrapper">
            <label>Name</label>
            <input
              type="text"
              value={name}
              className="profile-input"
              readOnly
            />
            <Button
              value="Change Username"
              onClick={() => openEditModal("Username")}
              fontsize="1.0rem"
            />
          </div>

          <div className="email-wrapper">
            <h1 className="email-title">Email</h1>
            <p className="account-email">{email}</p>
            <Button
              value="Change Email"
              fontsize="1.0rem"
              onClick={() => openEditModal("Email")}
            />
          </div>

          <div className="email-wrapper">
            <h1 className="email-title">Password</h1>
            <Button
              value="Change Password"
              fontsize="1.0rem"
              onClick={() => openEditModal("Password")}
            />
          </div>
        </div>

        {editOpen && (
          <EditInfoForm
            type={editType}
            onClose={() => setEditOpen(false)}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
