"use client"
import React, { useState } from "react";

const Top = ({FilterStatus,getbtns,FilterAssets}) => {

  const [fstat, setfstat] = useState("");
  const [aname, setaname] = useState("");
  const [sdate, setsdate] = useState("");
  const [sprio, setprio] = useState("");
  
  const [edate, setedate] = useState("");



  return (
    <div className="top">
      <label>
        <div><h2>Filter By :</h2></div>
        <div><input type="text" value={aname} onChange={(e)=>{
          setaname(e.target.value)
        }} placeholder="Assignee Name"/>
        <select name="Priority" onChange={(e)=>{
          setprio(e.target.value)
        }}>
          <option value={""} selected>
            Priority
          </option>
          {["P1", "P2", "P3"].map((value,idx) => {
            return <option value={value}>{value}</option>;
          })}
        </select>
        <input type="date" placeholder="Start Date" onChange={(e)=>{
          setsdate(e.target.value)
        }}></input>
        <input type="date" placeholder="End Date" onChange={(e)=>{
          setedate(e.target.value)
        }} ></input></div>
      </label>
      <label>
        <div><h2>Sort By :</h2></div>
        <div><select name="Status" onChange={(e)=>{
          setfstat(e.target.value)
        }}>
          
          <option value={""} selected>
            Status
          </option>
          {["Pending", "In Progress", "Completed", "Deployed", "Deferred"].map(
            (value,idx) => {
              return <option key={idx} value={idx}>{value}</option>;
            }
          )}
        </select></div>
      </label>
      <div className="btns">
      <button onClick={()=>{
        getbtns(true)
        FilterStatus(fstat)
        FilterAssets(aname,sprio,sdate,edate)
      }} className="btn">Search</button>
      <button onClick={()=>{
        getbtns(false)
        setaname("")
        setprio("")
        setsdate("")
      }}  className="btn">Reset</button>
      </div>
    </div>
  );
};

export default Top;
