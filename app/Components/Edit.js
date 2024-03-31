"use client"
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

const Edit = ({ upstate, upfunc,update ,info}) => {
  const [prio, setprio] = useState("")
  const [stat, setstat] = useState("")
  return (
    <div className="center-div">
      <div style={{ display: upstate }} className="up-box">

        {/* this is top of edit form  */}
        <div className="top">
          <h3>UPDATE TASK</h3>
          <ImCancelCircle
            onClick={() => {
              upfunc("u");
            }}
            className="cancel"
          />
        </div>

        {/* this is the area where all the the details of selected task will be appear */}
        {update() !== undefined &&  
        <div className="bottom">
          <div className="row">
            <h2>Title :</h2>
            <h5>
              {update().Title}
            </h5>
          </div>
          <div className="row">
            <h2>Description :</h2>
            <h5>
              {update().Desc}
            </h5>
          </div>
          <div className="row">
            <h2>Team :</h2>
            <h5>
              {update().Team}
            </h5>
          </div>
          <div className="row">
            <h2>Assignee :</h2>
            <h5>
              {update().Assignee}
            </h5>
          </div>


          {/* user can change priority and status so these two properties can be changed  */}
          <div style={{display:"flex" , justifyContent:"space-between" , alignItems:"center"}} className="row">
            <h3>Priority :</h3>
            <select name="Priority" onChange={(e)=>{
              setprio(e.target.value)
            }}>
              {["P1", "P2", "P3"].map((value) => {
                if(update().Priority == value){
                  return <option value={value} selected>{value}</option>;
                }else{
                  return <option value={value}>{value}</option>;
                }
              })}
            </select>

            <h3>Status :</h3>
            <select name="Status" onChange={(e)=>{
              setstat(e.target.value)
            }}>
              
              {[
                "Pending",
                "In Progress",
                "Completed",
                "Deployed",
                "Deferred",
              ].map((value,idx) => {
                if(update().Status == idx){
                  return <option value={idx} selected>{value}</option>;
                }else{
                  return <option value={idx}>{value}</option>;
                }
              })}
            </select>
          </div>
        </div>}

        {/* these are button for update or cancel th update of exsting task */}
        <div className="lower">
            <button onClick={()=>{
              if(prio !== "" && stat !== ""){
                info(prio,stat)
              }else if(prio == "" && stat == ""){
                info(update().Priority,update().Status)
              }else if(prio !== "" && stat == ""){
                info(prio,update().Status)
              }else if(prio == "" && stat !== ""){
                info(update().Priority,stat)
              }
              setprio("")
              setstat("")
            }}>Update</button>
            <button onClick={()=>{
                upfunc("u");
            }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
