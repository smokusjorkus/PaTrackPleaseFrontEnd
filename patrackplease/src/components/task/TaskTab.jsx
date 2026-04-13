import React, { useState, useEffect, useRef } from "react";
import "./TaskTabStyle.css";
import "animate.css";
import Button from "../button/Button";
import { toast } from "react-hot-toast";
import { Bell, Calendar } from "lucide-react";
import SetAlarmTab from "../setalarmtab/SetAlarmTab";
import EditTaskTab from "../edittask/EditTaskTab";

export default function TaskTab({
  tasks,
  refreshTasks,
  alarms,
  refreshAllAlarms,
  refreshTaskAlarms,
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskAlarms, setSelectedTaskAlarms] = useState([]);
  const [showEditingTask, setShowEditingTask] = useState(null);
  const [showAlarmTab, setShowAlarmTab] = useState(false);

  // --- CRUD Handlers ---
  const handleMarkAsDone = async (id) => {
    const confirmDone = window.confirm("Are you done with this task?");
    if (!confirmDone) return;
    try {
      const token = localStorage.getItem("token"); // ← add
      const res = await fetch(
        `http://localhost:8080/api/tasks/${id}/status?status=DONE`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // ← add
          },
        },
      );
      if (res.ok) {
        toast.success("Task marked as done ✅");
        await refreshTasks();
      }
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const token = localStorage.getItem("token"); // ← add
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // ← add
        },
      });
      if (res.ok) {
        await refreshTasks();
        await refreshAllAlarms();
        toast.success("Task deleted.");
      }
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  const handleDeleteAlarm = async (alarmId) => {
    if (!window.confirm("Delete this alarm?")) return;
    try {
      const token = localStorage.getItem("token"); // ← add
      const res = await fetch(`http://localhost:8080/api/alarms/${alarmId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // ← add
        },
      });
      if (res.ok) {
        toast.success("Alarm deleted.");
        await refreshAllAlarms();
      }
    } catch (error) {
      toast.error("Failed to delete alarm.");
    }
  };

  const handleOpenAlarmModal = async (task) => {
    if (!task?.id) return;
    const taskAlarmData = await refreshTaskAlarms(task.id);
    setSelectedTask(task);
    setSelectedTaskAlarms(taskAlarmData || []);
    setShowAlarmTab(true);
  };

  const handleOpenEditModal = (task) => {
    if (!task?.id) return;
    setSelectedTask(null); // ← clear first to force re-render
    setShowEditingTask(false); // ← reset before reopening
    setTimeout(() => {
      setSelectedTask(task);
      setShowEditingTask(true);
    }, 0);
  };

  const getStatusClass = (status) => {
    if (!status) return "upcoming";
    return status.toLowerCase().trim().replace(/\s+/g, "-"); // "in-progress" ✅
  };

  return (
    <div className="task-tab-container animate__animated animate__fadeInUp">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => {
          const taskAlarms = alarms.filter((alarm) => alarm.taskId === task.id);
          return (
            <div
              key={task.id}
              className={`task-container ${getStatusClass(task.status)}`}
            >
              <div className="task-header-row">
                <div className="task-info-side">
                  <div className="task-title">
                    <h4>{task.taskName}</h4>
                  </div>
                  <div className="task-description">
                    <p>{task.taskDescription}</p>
                  </div>
                  <div className="task-meta">
                    <span className="task-duedate">
                      <Calendar size={14} /> {task.dueDate}
                    </span>
                    <span className="task-status-pill">{task.status}</span>
                  </div>
                </div>
                <div className="task-actions-side">
                  <Button
                    color="#f0f3ed"
                    onClick={() => handleOpenAlarmModal(task)}
                    fontsize="0.9rem"
                  >
                    <Bell size={16} /> Alarm
                  </Button>
                  <Button
                    value="Edit"
                    fontsize="0.9rem"
                    onClick={() => handleOpenEditModal(task)}
                  />
                  <Button
                    value="Delete"
                    color="#ff785a"
                    onClick={() => handleDelete(task.id)}
                    fontsize="0.9rem"
                  />
                  {task.status !== "DONE" && (
                    <Button
                      value="Done"
                      color="#1fff2a"
                      onClick={() => handleMarkAsDone(task.id)}
                      fontsize="0.9rem"
                    />
                  )}
                </div>
              </div>

              {taskAlarms.length > 0 && (
                <div className="task-alarms-footer">
                  <p className="alarm-label">Active Alarms:</p>
                  <div className="alarm-pills-container">
                    {taskAlarms.map((alarm) => (
                      <div
                        key={alarm.id}
                        className="alarm-pill"
                        data-tooltip={`${alarm.alarmName}\n${
                          alarm.alarmStart
                            ? new Date(
                                alarm.alarmStart.replace("Z", ""),
                              ).toLocaleString()
                            : "No time set"
                        }`}
                      >
                        <Bell size={12} color="#ffd25a" />
                        <span>{alarm.alarmName}</span>
                        <Button
                          style={{ marginLeft: "20px" }}
                          value="Delete"
                          onClick={() => handleDeleteAlarm(alarm.id)}
                          color="transparent"
                          fontsize="0.7rem"
                          fontWeight="500"
                          padding="5px"
                        ></Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="no-tasks-container">
          <p className="no-tasks">No tasks assigned for today.</p>
        </div>
      )}

      {showAlarmTab && selectedTask && (
        <SetAlarmTab
          task={selectedTask}
          alarms={selectedTaskAlarms}
          onClose={() => {
            setShowAlarmTab(false);
            setSelectedTask(null);
            setSelectedTaskAlarms([]);
          }}
          refreshTasks={refreshTasks}
          refreshAllAlarms={refreshAllAlarms}
        />
      )}

      {showEditingTask && selectedTask && (
        <EditTaskTab
          task={selectedTask}
          onClose={() => {
            setShowEditingTask(false);
            setSelectedTask(null); // ← add this
          }}
          refreshTasks={refreshTasks}
        />
      )}
    </div>
  );
}
