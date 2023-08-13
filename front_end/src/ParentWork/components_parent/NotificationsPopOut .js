// NotificationsPopOut.js
import React from "react";

function NotificationsPopOut({ onClose }) {
  // Dummy data for notifications
  const notifications = [
    { type: "Assignment", title: "Math Homework", dueDate: "2023-08-10" },
    { type: "Test", title: "Science Test", dueDate: "2023-08-15" },
    { type: "Event", title: "Parent-Teacher Meeting", date: "2023-08-20" },
  ];

  return (
    <div className="notifications-pop-out">
     
      <h3>Upcoming Assignments, Tests, and Events</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification.type}: {notification.title} -{" "}
            {notification.dueDate || notification.date}
          </li>
        ))}
      </ul>

       <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
}

export default NotificationsPopOut;
