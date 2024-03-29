import React from "react";
import '../../styles/expandableTree.css'
const ExpandableTree = ({ title, expanded, onClick, children ,hw,openGradingModal ,openFeedbackModal }) => {
  return (
    <div className="expandable-tree">
      <div
        className="expandable-header hw"
        onClick={onClick}
      >
        <div>{expanded ? "▼" : "►"} {title}</div>
        
        {hw&&<><button onClick={openGradingModal} style={{marginLeft:"50px"}} className="btn-primary grade-assignment">
          Grade assignments
        </button><button onClick={openFeedbackModal} style={{marginLeft:"50px"}} className="btn-primary grade-assignment">
          Add Feedback
        </button></>}
        
      </div>
      
      {expanded && <div className="expandable-content">{children}</div>}
    </div>
  );
};

export default ExpandableTree;
