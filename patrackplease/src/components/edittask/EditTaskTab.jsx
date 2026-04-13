import { useEffect, useState } from "react";
import "./EditTaskTabStyle.css";
import "animate.css";
import Button from "../button/Button";
import { toast } from "react-hot-toast";

export default function EditTaskTab({ task, onClose, refreshTasks }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = storedUser?.email || "";

  const [formData, setFormData] = useState({
    id: "",
    taskName: "",
    taskDescription: "",
    dueDate: "",
    status: "PENDING",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id || "",
        taskName: task.taskName || "",
        taskDescription: task.taskDescription || "",
        dueDate: task.dueDate || "",
        status: task.status || "PENDING",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!formData.taskName || !formData.taskDescription || !formData.dueDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!userEmail) {
      toast.error("User email not found.");
      return;
    }

    console.log("Updating task ID:", formData.id);
    console.log(
      "URL:",
      `http://localhost:8080/api/tasks/${formData.id}?email=${encodeURIComponent(userEmail)}`,
    );

    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/edit/${formData.id}?email=${encodeURIComponent(userEmail)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data || "Failed to update task.");
      }

      toast.success("Task updated successfully ✅");

      if (refreshTasks) {
        await refreshTasks();
      }

      onClose();
    } catch (error) {
      console.error("Update task error:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="modal_overlay_editTask animate__animated animate__fadeIn">
      <div className="editTask_modal ">
        <div className="editTask_header">
          <h2>Edit Task</h2>
          <button
            type="button"
            className="close_btn_editTask"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="editTask_form" onSubmit={handleUpdateTask}>
          <div className="form_group_editTask">
            <label>Task Name</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              placeholder="Enter task name"
            />
          </div>

          <div className="form_group_editTask">
            <label>Task Description</label>
            <textarea
              name="taskDescription"
              value={formData.taskDescription}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="4"
            />
          </div>

          <div className="form_group_editTask">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form_group_editTask">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="ONGOING">Ongoing</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div className="editTask_buttons">
            <Button value="Cancel" color="#E5E7EB" onClick={onClose} />
            <Button value="Save Changes" color="#FFF05A" />
          </div>
        </form>
      </div>
    </div>
  );
}
