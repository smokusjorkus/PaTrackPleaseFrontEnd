import React from "react";
import "./TaskTabStyle.css";
import "animate.css";
import Button from "../button/Button";

export default function TaskTab({ tasks }) {
  return (
    <div className="task-tab-container animate__animated animate__fadeInUp">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-container ${task.status.toLowerCase()}`}
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
                <span className="task-duedate">{task.dueDate}</span>
                <span className="task-status-pill">{task.status}</span>
              </div>
            </div>

            {/* Left Side: Action Buttons */}
            <div className="taskleft-side">
              <Button value="Edit" fontsize="1rem" />
              <Button value="Delete" color="#ff785a" fontsize="1rem" />
            </div>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks assigned for today.</p>
      )}
    </div>
  );
}
