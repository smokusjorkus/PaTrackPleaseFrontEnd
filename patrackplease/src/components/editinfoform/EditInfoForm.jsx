import React, { useState } from "react";
import Button from "../button/Button";
import ErrorMessage from "../../components/errormessage/ErrorMessage"; // Ensure this import is correct
import "./EditInfoFormStyle.css";
import toast from "react-hot-toast";

export default function EditInfoForm({ type, onClose, onSave }) {
  const [inputValue, setInputValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setNewError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setNewError(""); // Reset error on every attempt

    if (type === "Password") {
      // 1. Check matching
      if (inputValue !== confirmValue) {
        setNewError("Oops! Passwords aren't the same.");
        return;
      }

      // 2. Check Length
      if (inputValue.length < 8) {
        setNewError("Password must be at least 8 characters long.");
        return;
      }

      // 3. Complex Requirements (Regex)
      const hasCapital = /[A-Z]/.test(inputValue);
      const hasNumber = /\d/.test(inputValue);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);

      if (!hasCapital || !hasNumber || !hasSpecialChar) {
        setNewError(
          "Password must contain at least one capital letter, one number, and one special character.",
        );
        return;
      }
    }

    // If all validations pass
    onSave(type, inputValue);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1>Edit {type}</h1>
          <button className="close-x" onClick={onClose} type="button">
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} className="edit-form">
          <label>New {type}</label>
          <input
            type={type === "Password" && !isVisible ? "password" : "text"}
            placeholder={`Enter new ${type.toLowerCase()}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="profile-input"
            required
          />

          {type === "Password" && (
            <>
              <label>Confirm Password</label>
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                className="profile-input"
                required
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "10px",
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

              {error && <ErrorMessage value={error} />}
            </>
          )}

          <div className="modal-actions">
            <Button value="Save Changes" type="submit" />
            <Button
              value="Cancel"
              color="#E4E4E4"
              onClick={onClose}
              type="button"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
