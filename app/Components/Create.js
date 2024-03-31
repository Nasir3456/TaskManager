"use client";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

const Create = ({ crestate, crefunc ,crud}) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Team, setTeam] = useState("");
  const [Assignee, setAssignee] = useState("");
  const [Priority, setPriority] = useState("P1");
  // const [Status, setStatus] = useState(0);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();


  
  
  return (
    <div className="center-div">
      <div style={{ display: crestate }} className="cre-box">

    {/* this is heading of create page  */}
        <div className="top">
          <h3>CREATE TASK</h3>
          <ImCancelCircle
            onClick={() => {
              crefunc("c");
            }}
            className="cancel"
          />
        </div>

        {/* this is form for create task  */}
        <div className="bottom">
          <div className="row">
            <h2>Title :</h2>
            <input
              type="text"
              value={Title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="row">
            <h2>Description :</h2>
            <input
              type="text"
              value={Description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>
          <div className="row">
            <h2>Team :</h2>
            <input
              type="text"
              value={Team}
              onChange={(e) => {
                setTeam(e.target.value);
              }}
              required
            />
          </div>
          <div className="row">
            <h2>Assignee :</h2>
            <input
              type="text"
              value={Assignee}
              onChange={(e) => {
                setAssignee(e.target.value);
              }}
              required
            />
          </div>
          <div className="row">
            <h2>Priority :</h2>
            <select
              name="Priority"
              onChange={(e) => {
                setPriority(e.target.value);
              }}>
              {["P1", "P2", "P3"].map((value,idx) => {
                return <option key={idx}>{value}</option>;
              })}
              
            </select>
          </div>
        </div>
        {/* these are buttons for create and cancel the new task  */}
        <div className="lower">
          <button
            onClick={() => {
              if(Title !== "" && Description !== "" && Team !== "" && Assignee !== ""){ 
                
                  crud(Title,Description,Team,Assignee,Priority,0,`2024-03-02`,"")
  
                  setTitle("")
                  setDescription("")
                  setTeam("")
                  setAssignee("")
              }
            }}
          >
            Create
          </button>
          <button
            onClick={() => {
              crefunc("c");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
