import React from "react";
import "./TaskTabStyle.css";
import "animate.css";
import Button from "../button/Button";
import { toast } from "react-hot-toast";

export default function TaskTab({ tasks, refreshTasks }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Trigger the parent to re-fetch the updated list
        refreshTasks();
        toast.success("Task deleted successfully.");
      } else {
        toast.error("Server error: Could not delete task.");
      }
    } catch (error) {
      toast.erorr("Delete request failed:", error);
    }
  };

  return (
    <div className="task-tab-container animate__animated animate__fadeInUp">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-container ${task.status ? task.status.toLowerCase() : "upcoming"}`}
          >
            {/* Right Side: Task Information */}
            <div className="taskright-side">
              <div className="task-title">
                <h4>{task.taskName}</h4>
              </div>
              <div className="task-description">
                <p>{task.taskDescription}</p>
              </div>
              <div className="task-meta">
                <span className="task-duedate">📅 {task.dueDate}</span>
                <span className="task-status-pill">{task.status}</span>
              </div>
            </div>

            {/* Left Side: Action Buttons */}
            <div className="taskleft-side">
              <Button value="Edit" fontsize="1rem" />
              <Button
                value="Delete"
                color="#ff785a"
                fontsize="1rem"
                onClick={() => handleDelete(task.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="no-tasks-container">
          <p className="no-tasks">No tasks assigned for today.</p>
        </div>
      )}
    </div>
  );
}
