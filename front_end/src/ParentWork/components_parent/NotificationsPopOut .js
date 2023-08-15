import React, { useState, useEffect } from "react";
import axios from "axios"; 

function NotificationsPopOut({ onClose, childId }) {
  const [upcomingItems, setUpcomingItems] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/api/parent/upcoming-items/${childId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUpcomingItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming items:", error);
      });
  }, [childId]); 

  return (
    <div className="notifications-pop-out">
      <h3>Upcoming Assignments, Tests, and Events</h3>
      <ul>
        {Array.isArray(upcomingItems.upcoming_assignments) &&
          upcomingItems.upcoming_assignments.map((notification) => (
            <li key={notification.id}>
              <strong>Title:</strong> {notification.title}<br />
              {notification.description && (
                <div>
                  <strong>Description:</strong> {notification.description}<br />
                </div>
              )}
              {notification.due_date && (
                <div>
                  <strong>Due Date:</strong> {notification.due_date}<br />
                </div>
              )}
              <br />
            </li>
          ))}
      </ul>

      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default NotificationsPopOut;
