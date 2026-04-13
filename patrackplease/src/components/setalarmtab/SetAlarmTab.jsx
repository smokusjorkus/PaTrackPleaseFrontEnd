import React from "react";
import "./SetAlarmTabStyle.css";
import Button from "../button/Button";
import { useState } from "react";
import ErrorMessage from "../errormessage/ErrorMessage";
import toast from "react-hot-toast";
import "animate.css";

export default function SetAlarmTab({
  task,
  onClose,
  refreshTasks,
  refreshAllAlarms,
}) {
  const [error, setError] = useState(null);
  const [alarmName, setAlarmName] = useState("");
  const [alarmStart, setAlarmStart] = useState("");
  const [alarmFinish, setAlarmFinish] = useState("");
  const [loading, setLoading] = useState(false);

  const saveAlarm = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) {
        setError("User not found. Please log in again.");
        return;
      }

      if (!task || !task.id) {
        setError("Task ID is missing.");
        return;
      }

      if (!alarmName.trim() || !alarmStart.trim() || !alarmFinish.trim()) {
        setError("Please fill in all fields.");
        return;
      }

      setLoading(true);
      setError("");

      const alarmData = {
        alarmName,
        alarmStart,
        alarmFinish,
        taskId: task.id,
      };

      console.log("Sending alarm data:", alarmData);

      const res = await fetch(
        `http://localhost:8080/api/alarms?email=${encodeURIComponent(user.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(alarmData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to save alarm.");
      }

      toast.success("Alarm saved successfully.");

      if (refreshAllAlarms) {
        await refreshAllAlarms();
      }

      onClose();
    } catch (error) {
      console.error("Save alarm error:", error);
      setError(error.message || "An error occurred while saving the alarm.");
      toast.error(error.message || "An error occurred while saving the alarm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal_overlay_setAlarm animate__animated animate__fadeInUp">
      <div className="modal_container_setAlarm">
        {/* Header */}
        <div className="modal_header">
          <h2>Set Alarm ⏰</h2>
          <button className="close_btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="modal_body">
          <label>Alarm Name</label>
          <input
            type="text"
            placeholder="e.g. Reminder before task"
            onChange={(e) => setAlarmName(e.target.value)}
          />

          <label>Start Time</label>
          <input
            type="datetime-local"
            onChange={(e) => setAlarmStart(e.target.value)}
          />

          <label>End Time</label>
          <input
            type="datetime-local"
            onChange={(e) => setAlarmFinish(e.target.value)}
          />
        </div>

        {/* Footer */}
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
          >
            Save Alarm
          </Button>
        </div>
      </div>
    </div>
  );
}
