import React, { useState } from "react";
import axios from "axios";

function ScheduleMeetingForm({ parentSenderId, teacherId }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [meetingMessage, setMeetingMessage] = useState("");
  const [response, setResponse] = useState(null); 

  const handleSchedule = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/parent/schedule-meeting/${teacherId}`,
        { date: selectedDate, time: selectedTime },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResponse(response.data); 
      setMeetingMessage(response.data.message);
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      setMeetingMessage(error.response.data.message);
    }
  };

  const hourIntervals = Array.from({ length: 12 }, (_, index) => {
    const hour = index + 1;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  return (
    <div className="schedule-meeting-form">
      <h3>Schedule Meeting</h3>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        required
      />
      <label htmlFor="time">Time:</label>
      <select
        id="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        required
      >
        <option value="">Select Time</option>
        {hourIntervals.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <button onClick={handleSchedule}>Schedule</button>

     {/* Display meeting message */}
      {meetingMessage && (
   <div
    className={`meeting-message ${
      meetingMessage.includes("Meeting scheduled successfully")
        ? "success-message"
        : "error-message"
    }`}
  >
    <p>{meetingMessage}</p>
    {meetingMessage.includes("Meeting scheduled successfully") &&
      response?.meeting && (
        <p>
          Scheduled Date: {response.meeting.selected_date} | Scheduled Time: {response.meeting.selected_time}
        </p>
      )}
  </div>
)}
    </div>
  );
}

export default ScheduleMeetingForm;
