import React from "react";
import "./AboutUsStyle.css";

export default function AboutUs() {
  return (
    <section className="about-container">
      <div className="about-content">
        <h2 className="about-title">About PaTrack Please</h2>

        <p className="about-description">
          PaTrack Please is a simple productivity tool designed for students who
          want a better way to manage assignments and deadlines. Instead of
          juggling multiple notes and reminders, PaTrack Please lets you track
          all your tasks in one organized place.
        </p>

        <div className="about-features">
          <div className="feature-card">
            <h3>Track Assignments</h3>
            <p>
              Easily add and manage your assignments so you never miss an
              important deadline.
            </p>
          </div>

          <div className="feature-card">
            <h3>Set Reminders</h3>
            <p>
              Add alarms to tasks so you get notified before your assignments
              are due.
            </p>
          </div>

          <div className="feature-card">
            <h3>Stay Organized</h3>
            <p>
              Keep all your school tasks in one place and focus on getting work
              done.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
