"use client"

import React, { useContext, useState } from "react";
import { FcBusinessman, FcMenu } from "react-icons/fc";


const Task = ({ tName ,delaction,upaction,data,ChangeStatus,crud_del,crud_up}) => {
    const [DisplayMenu, setDisplayMenu] = useState("none")

  return (
    <div className="task">
      <div className="title">
        <h3>{data.Title}</h3>
        <p>{data.Priority}</p>
      </div>

      <div className="desc">{data.Desc}</div>

      <div className="assign">
        <h4>
          <FcBusinessman /> {data.Assignee}
        </h4>


        {/* here upadte and delete button will be apper  */}
       {/* { data.Status < 3 && } */}
       <h3>
          <FcMenu onClick={()=>{
            if(DisplayMenu == "none"){
              setDisplayMenu("block")
            }else{
              setDisplayMenu("none")
            }
          }}
          />
        </h3>
      </div>


          {/* these two buttons used to open update and delete tak   */}
      <div style={{display:DisplayMenu}} className="drop-down" onMouseEnter={()=>{
              setDisplayMenu("block")
          }}
          onMouseLeave={()=>{
            setDisplayMenu("none")
          }}>
        <h2 className="update" onClick={()=>{
            upaction('u')
            crud_up(data)
            setDisplayMenu("none")
        }}>Update</h2>
        <h2 className="delete" onClick={()=>{
            delaction('d')
            crud_del(data)
            setDisplayMenu("none")
        }}>Delete</h2>
      </div>

        {/* this button is used to forward task to next satatus  */}
      <button onClick={()=>{
        ChangeStatus(data)
      }}>{tName}</button>
    </div>
  );
};

export default Task;
