import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "animate.css";
import "./TasksPageStyle.css";
import TaskTab from "../../components/task/TaskTab";
import Button from "../../components/button/Button";

export default function TasksPage({ isOpen, setIsOpen }) {
  const testTasks = [
    {
      id: 1,
      taskName: "Laundry",
      taskDescription: "Wash and fold the whites",
      dueDate: "Sunday, Mar 8",
      time: "12:00 PM",
      status: "Upcoming",
    },
    {
      id: 2,
      taskName: "Kitchen Trash",
      taskDescription: "Take out the bins before pickup",
      dueDate: "Thursday, Mar 12",
      time: "10:30 AM",
      status: "Overdue",
    },
    {
      id: 3,
      taskName: "Kitchen Trash",
      taskDescription: "Take out the bins before pickup",
      dueDate: "Thursday, Mar 12",
      time: "10:30 AM",
      status: "Done",
    },
  ];

  const taskCount = testTasks.length;

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
          <TaskTab tasks={testTasks} />
        </div>
      </main>
    </div>
  );
}
