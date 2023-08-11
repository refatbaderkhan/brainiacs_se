import React from "react";
import { useLocation } from "react-router-dom";
import "./Child_details.css";

function ChildPage() {
  const location = useLocation();
  const child = location.state || {};

  return (
    <div>
      <h2>{child.name || "Child Name"}</h2>
      {/* Display child's progress, grades, assignments, etc. */}
    </div>
  );
}

export default ChildPage;
