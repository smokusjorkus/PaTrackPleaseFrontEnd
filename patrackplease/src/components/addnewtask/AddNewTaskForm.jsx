import React, { useState } from "react";
import "./AddNewTaskFormStyle.css";
import Button from "../button/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../errormessage/ErrorMessage";

export default function AddNewTaskForm({ onClose, refreshTasks }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const nav = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.email) {
        setError("User not found. Please log in again.");
        return;
      }

      if (!taskName.trim() || !taskDescription.trim() || !dueDate || !status) {
        setError("Please fill in all fields.");
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      if (dueDate < today) {
        setError("Due date cannot be in the past.");
        return;
      }

      setLoading(true);

      const taskData = {
        taskName,
        taskDescription,
        dueDate,
        status,
      };

      const res = await fetch(
        `${API_BASE_URL}/api/tasks?email=${encodeURIComponent(user.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(taskData),
        },
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to create task");
      }

      console.log("Task created successfully");
      toast.success("Task has successfully created.");

      onClose();

      nav("/YourTasks");

      if (refreshTasks) {
        refreshTasks();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate__animated animate__fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add New Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label>Status</label>
          <select
            className="select-form"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Done">Done</option>
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In-Progress</option>
          </select>
        </div>
        {error && <ErrorMessage value={error} />}
        <div className="modal-actions">
          <Button
            onClick={onClose}
            value="Cancel"
            color="#FF785A"
            fontsize="1rem"
          />
          <Button
            onClick={handleSubmit}
            value={loading ? "Creating..." : "Create Task"}
            color="#e6d851"
            fontsize="1rem"
          />
        </div>
      </div>
    </div>
  );
}
