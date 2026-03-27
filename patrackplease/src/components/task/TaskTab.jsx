import React from "react";
import "./TaskTabStyle.css";
import "animate.css";
import Button from "../button/Button";
import { toast } from "react-hot-toast";

export default function TaskTab({ tasks, refreshTasks }) {
  const handleMarkAsDone = async (id) => {
    const confirmDone = window.confirm("Are you done with this task?");
    if (!confirmDone) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${id}/status?status=DONE`,
        {
          method: "PUT",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to mark task as done.");
      }

      toast.success("Task marked as done ✅");
      console.log("Task status changed!");
      await refreshTasks();
    } catch (error) {
      console.error("Mark as done error:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Server error: Could not delete task.");
      }

      await refreshTasks();
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.error("Delete request failed:", error);
      toast.error(error.message || "Delete request failed.");
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

            <div className="taskleft-side">
              <Button value="Edit" fontsize="1rem" />
              <Button
                value="Delete"
                color="#ff785a"
                fontsize="1rem"
                onClick={() => handleDelete(task.id)}
              />
              <Button
                value="Mark as Done"
                color="#1fff2a"
                fontsize="1rem"
                onClick={() => handleMarkAsDone(task.id)}
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
