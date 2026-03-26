import React, { useState } from "react";
import "./AddNewTaskFormStyle.css";
import Button from "../button/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddNewTaskForm({ onClose, refreshTasks }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.email) {
        toast.error("User not found. Please log in again.");
        return;
      }
      if (!taskName.trim() || !taskDescription.trim() || !dueDate || !status) {
        toast.error("Please fill in all fields.");
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      if (dueDate < today) {
        toast.error("Due date cannot be in the past.");
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
        `http://localhost:8080/api/tasks?email=${encodeURIComponent(user.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        },
      );

      if (!res.ok) {
        throw new Error(responseText || "Failed to create task");
      }

      if (refreshTasks) {
        await refreshTasks();
      }

      onClose();
      nav("/YourTasks");
      toast.success("Task has successfully created.");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error.message);
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
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Done">Done</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

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
