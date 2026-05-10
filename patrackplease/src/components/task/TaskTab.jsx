import React, { useState } from "react";
import "./SetAlarmTabStyle.css";
import Button from "../button/Button";
import ErrorMessage from "../errormessage/ErrorMessage";
import toast from "react-hot-toast";
import "animate.css";

export default function SetAlarmTab({ task, onClose, refreshAllAlarms }) {
  const [error, setError] = useState(null);
  const [alarmName, setAlarmName] = useState("");
  const [alarmStart, setAlarmStart] = useState("");
  const [alarmFinish, setAlarmFinish] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const saveAlarm = async () => {
    // 1. Validation
    if (!alarmName.trim() || !alarmStart || !alarmFinish) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userStr = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user?.email || !token) {
        setError("Session expired. Please log in again.");
        return;
      }

      console.log("Save button clicked!");
      console.log("Current User:", localStorage.getItem("user"));
      console.log("Task ID:", task?.id);
      setLoading(true);
      setError("");

      // 2. Format dates to ISO (Add seconds and Z if your backend requires it)
      const alarmData = {
        alarmName: alarmName.trim(),
        alarmStart: new Date(alarmStart).toISOString(),
        alarmFinish: new Date(alarmFinish).toISOString(),
        taskId: task.id,
      };

      console.log("Payload:", alarmData);

      const res = await fetch(
        `${API_BASE_URL}/api/alarms?email=${encodeURIComponent(user.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(alarmData),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save alarm.");
      }

      toast.success("Alarm saved successfully! 🔔");

      if (refreshAllAlarms) await refreshAllAlarms();
      onClose();
    } catch (err) {
      console.error("Save alarm error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal_overlay_setAlarm animate__animated animate__fadeInUp">
      <div className="modal_container_setAlarm">
        <div className="modal_header">
          <h2>Set Alarm ⏰</h2>
          <button className="close_btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal_body">
          {error && <ErrorMessage message={error} />}

          <label>Alarm Name</label>
          <input
            type="text"
            value={alarmName}
            placeholder="e.g. Reminder before task"
            onChange={(e) => setAlarmName(e.target.value)}
          />

          <label>Start Time</label>
          <input
            type="datetime-local"
            value={alarmStart}
            onChange={(e) => setAlarmStart(e.target.value)}
          />

          <label>End Time</label>
          <input
            type="datetime-local"
            value={alarmFinish}
            onChange={(e) => setAlarmFinish(e.target.value)}
          />
        </div>

        <div className="modal_footer">
          <Button onClick={onClose} fontsize="1rem" fontWeight="300">
            Cancel
          </Button>
          <Button
            className="save_btn"
            fontsize="1rem"
            fontWeight="300"
            color="#1fff2a"
            onClick={saveAlarm}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Alarm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
