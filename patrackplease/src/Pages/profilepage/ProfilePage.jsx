import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./ProfilePageStyle.css";
import Button from "./../../components/button/Button";
import ImageHolder from "../../components/image/ImageHolder";
import EditInfoForm from "../../components/editinfoform/EditInfoForm";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [image, setImage] = useState();
  const [email, setEmail] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editType, setEditType] = useState("");

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
      setEmail(data.email);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const handleSave = async (type, newValue) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      let updateBody = {};
      if (type === "Photo") updateBody = { imageName: newValue };
      else if (type === "Email") updateBody = { email: newValue };
      else if (type === "Password") updateBody = { password: newValue };
      else updateBody = { username: newValue };

      const res = await fetch(
        `http://localhost:8080/api/users/update?email=${encodeURIComponent(user.email)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateBody),
        },
      );

      if (!res.ok) throw new Error("Update failed");
      const updatedData = await res.json();

      // Refresh states
      setName(updatedData.username);
      setEmail(updatedData.email);

      if (updatedData.email == newValue) {
        toast.success("Successfully updated Email.");
      } else {
        toast.success("Successfully updated Password.");
      }
      // Update local storage so the session stays current
      localStorage.setItem("user", JSON.stringify(updatedData));

      setEditOpen(false); // Close modal on success
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes.");
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
                <Button
                  value="Change Photo"
                  onClick={() => openEditModal("Photo")}
                />
                <Button value="Remove Photo" color="#E4E4E4" />
              </div>
              <p className="image-desc">JPG or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="name-plate-wrapper">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="profile-input"
              readOnly // Recommendation: Make this readOnly if you want them to use the Modal to change it
            />
          </div>

          <div className="email-wrapper">
            <h1 className="email-title">Email</h1>
            <p className="account-email">{email}</p>
            <Button
              value="Change Email"
              onClick={() => openEditModal("Email")}
            />
          </div>

          <div className="email-wrapper">
            <h1 className="email-title">Password</h1>
            <Button
              value="Change Password"
              onClick={() => openEditModal("Password")}
            />
          </div>
        </div>

        {editOpen && (
          <EditInfoForm
            type={editType}
            onClose={() => setEditOpen(false)}
            onSave={handleSave} // ADDED: Passing the function as a prop
            currentValue={editType === "Email" ? email : name}
          />
        )}
      </main>
    </div>
  );
}
