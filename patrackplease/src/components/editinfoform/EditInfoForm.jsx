import React, { useState, useRef } from "react";
import Button from "../button/Button";
import ErrorMessage from "../../components/errormessage/ErrorMessage";
import "./EditInfoFormStyle.css";

export default function EditInfoForm({ type, onClose, onSave }) {
  const [inputValue, setInputValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setNewError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Ref to trigger the hidden browser file input
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a temporary URL to show a preview of the image
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setNewError("");

    if (type === "Photo") {
      if (!selectedFile) {
        setNewError("Please select an image first.");
        return;
      }
      onSave("Photo", selectedFile);
      onClose();
      return;
    }

    if (type === "Username") {
      if (inputValue.trim().length < 3) {
        setNewError("Username must be at least 3 characters long.");
        return;
      }
    }

    if (type === "Password") {
      if (inputValue !== confirmValue) {
        setNewError("Oops! Passwords aren't the same.");
        return;
      }
      if (inputValue.length < 8) {
        setNewError("Password must be at least 8 characters long.");
        return;
      }

      const hasCapital = /[A-Z]/.test(inputValue);
      const hasNumber = /\d/.test(inputValue);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);

      if (!hasCapital || !hasNumber || !hasSpecialChar) {
        setNewError(
          "Password must have a capital letter, a number, and a symbol.",
        );
        return;
      }
    }

    onSave(type, inputValue);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate__animated animate__zoomIn animate__fast">
        <div className="modal-header">
          <h1>Edit {type}</h1>
          <button className="close-x" onClick={onClose} type="button">
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} className="edit-form">
          {type === "Photo" ? (
            /* --- PHOTO UPLOAD UI --- */
            <div
              className="file-upload-section"
              style={{
                textAlign: "center",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                />
              ) : (
                <label>Select a new profile picture</label>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <Button
                value={selectedFile ? "Change Photo" : "Choose File"}
                type="button"
                onClick={() => fileInputRef.current.click()}
              />

              {selectedFile && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    marginTop: "10px",
                    color: "#666",
                  }}
                >
                  Ready to upload: {selectedFile.name}
                </p>
              )}
            </div>
          ) : (
            /* --- TEXT INPUT UI (Username/Email/Password) --- */
            <>
              <label>New {type}</label>
              <input
                type={type === "Password" && !isVisible ? "password" : "text"}
                placeholder={`Enter new ${type.toLowerCase()}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="profile-input"
                required
              />
            </>
          )}

          {/* PASSWORD CONFIRMATION SECTION */}
          {type === "Password" && (
            <>
              <label style={{ marginTop: "15px", display: "block" }}>
                Confirm Password
              </label>
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                className="profile-input"
                required
              />

              <div
                className="show-pw-container"
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  id="show-pw"
                  checked={isVisible}
                  onChange={() => setIsVisible(!isVisible)}
                />
                <label htmlFor="show-pw" style={{ cursor: "pointer" }}>
                  Show Password
                </label>
              </div>
            </>
          )}

          {error && <ErrorMessage value={error} />}

          <div className="modal-actions" style={{ marginTop: "20px" }}>
            <Button value="Save Changes" type="submit" fontsize="1rem" />
            <Button
              value="Cancel"
              color="#E4E4E4"
              onClick={onClose}
              type="button"
              fontsize="1rem"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
