"use client";
import Task from "./Task";



const Card = ({ name , delaction ,upaction ,card_idx,crud_show,ChangeStatus,crud_del,crud_up}) => { 
  return (
    <div className="card">
      <div className="head">{name}</div>

      {/* this logic will display all the task status wise using conditionl rendring  */}
      {
        crud_show(card_idx) !== false && crud_show(card_idx).map((val)=>{
          return <Task tName={name} delaction={delaction} upaction={upaction} data={val} ChangeStatus={ChangeStatus} crud_del={crud_del} crud_up={crud_up}/>
        }) 
      }

      
      
    </div>
  );
};

export default Card;
