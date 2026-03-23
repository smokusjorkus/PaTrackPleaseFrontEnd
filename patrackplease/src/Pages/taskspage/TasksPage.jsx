import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "animate.css";
import "./TasksPageStyle.css";
import TaskTab from "../../components/task/TaskTab";
import Button from "../../components/button/Button";

export default function TasksPage({ isOpen, setIsOpen }) {
  const [taskCount, setTaskCount] = useState(0);
  return (
    <div className="yourtasks-page">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Apply dynamic margin class for Sidebar responsiveness */}
      <main className={`tasks-main ${isOpen ? "open" : "closed"}`}>
        <div className="tasks-headerbar animate__animated animate__fadeIn">
          <div className="headerbar-left">
            <h1 style={{ fontSize: "3rem" }}>Your Tasks</h1>
            <p>{taskCount} Tasks today</p>
          </div>

          <Button value="Add New Task" />
        </div>
        <div className="tasks-content ">
          <TaskTab />
        </div>
      </main>
    </div>
  );
}
