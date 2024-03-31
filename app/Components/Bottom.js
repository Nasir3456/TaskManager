import React from "react";
import Card from "./Card";

const Bottom = ({ delaction, upaction, crud_show ,ChangeStatus,crud_del,crud_up}) => {
  return (
    <div className="bottom">
      <div className="cards">

        {/* this is all 5 the task status or task card */}
        {["Pending", "In Progress", "Completed", "Deployed", "Deferred"].map(
          (value,idx) => {
            return <Card name={value} delaction={delaction} upaction={upaction} card_idx={idx} crud_show={crud_show} ChangeStatus={ChangeStatus} crud_del={crud_del} crud_up={crud_up}/>;
          }
        )}     
      </div>
    </div>
  );
};

export default Bottom;
