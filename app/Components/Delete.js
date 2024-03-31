"use client";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";


const Delete = ({ delstate, delfunc ,delete_task,title,status}) => {
  // console.log(title.Status)
  return (
    <div className="center-div">
      <div style={{ display: delstate }} className="del-box">

        {/* this is top section ofn delete form  */}
      <div className="top">
          <h3>DELETE TASK</h3>
          <ImCancelCircle
            onClick={() => {
              delfunc("d");
            }}
            className="cancel"
          />
        </div>


        {/* this is message for deleting task  */}
        <div className="bottom">
          {status < 3 ? <p>Are you sure! you want to delete this task?</p> : <p  style={{textAlign:"center"}}>This Task cant be deleted</p>}

          {/* these are buttons for delete or cancel delete exsting task  */}

          {status < 3 && <div className="lower">
            <h3>{title}</h3>
            <button onClick={()=>{
              delete_task()
            }}>Yes</button>
            <button
              onClick={() => {
                delfunc("d");
              }}
            >
              No
            </button>
          </div>}
         
          
        </div>
      </div>
    </div>
  );
};

export default Delete;
