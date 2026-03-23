import React from "react";
import "./TaskTabStyle.css";
import { FiEdit2, FiTrash2, FiCheckCircle } from "react-icons/fi";

export default function TaskTab() {
  // These would eventually come from your Spring Boot backend
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
  ];

  return <div className="task-tab-container"></div>;
}
