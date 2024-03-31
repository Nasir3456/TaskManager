"use client";
import { React, useState, useEffect } from "react";
import Top from "./Components/Top";
import Bottom from "./Components/Bottom";
import Delete from "./Components/Delete";
import Edit from "./Components/Edit";
import Create from "./Components/Create";

export default function Home() {
  // this 3 variable are created display and create , delete and update form
  const [delvar, setdelvar] = useState("none");
  const [upvar, setupvar] = useState("none");
  const [crevar, setcrevar] = useState("none");
  const [TaskID, setTaskID] = useState(
    () => parseInt(localStorage.getItem("Task")) || 1
  );
  useEffect(() => {
    localStorage.setItem("Task", TaskID);
  }, [TaskID]);

  

  // it will give current date to add enddate
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  //this array is like a database all the records will be stored in in

  const [pen, setpen] = useState(() => {
    const storedData = localStorage.getItem("pen");
  
    return storedData ? JSON.parse(storedData) : [];
  });
  const [pro, setpro] = useState(() => {
    const storedData = localStorage.getItem("pro");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [com, setcom] = useState(() => {
    const storedData = localStorage.getItem("com");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [dep, setdep] = useState(() => {
    const storedData = localStorage.getItem("dep");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [def, setdef] = useState(() => {
    const storedData = localStorage.getItem("def");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("pen", JSON.stringify(pen));
    localStorage.setItem("pro", JSON.stringify(pro));
    localStorage.setItem("com", JSON.stringify(com));
    localStorage.setItem("dep", JSON.stringify(dep));
    localStorage.setItem("def", JSON.stringify(def));
  }, [pen, pro, com, dep, def]);

  // this variable is for sorting the prtiority
  let PriorityOrder = { P1: 0, P2: 1, P3: 2 };

  // this function is custom array soting method
  function sorting(a, b) {
    return PriorityOrder[a.Priority] - PriorityOrder[b.Priority];
  }

  // this function will take new record as argument and setstate after sorting
  function insertObject(obj) {
    let arr = [...pen];
    arr.push(obj);
    setpen(arr.sort(sorting));
  }

  // this function will be called when user click on create button on create form
  //all the data as argyment is comming from  Create.js which is basically create task form
  const crud_create = (Title,Desc,Team,Assignee,Priority,Status,StartDate,EndDate) => {
    let obj = {
      Taskid: TaskID,
      Title: Title,
      Desc: Desc,
      Team: Team,
      Assignee: Assignee,
      Priority: Priority,
      Status: Status,
      StartDate: StartDate,
      EndDate: EndDate,
    };
    insertObject(obj);
    setcrevar("none");
    setTaskID(TaskID + 1);
  };

  //this function will be called in Card.js file to render task
  //if there is more then one data found for any status it will send the data priority wise
  //else it wiil send false and false will be handled in card.js file using conditional rendring
  const [btns, setbtns] = useState(false);
  const getbtns = (val) => {
    setbtns(val);
  };
  // this function will filter the status
  const [Filterst, setFilterst] = useState("");
  function FilterStatus(val) {
    setFilterst(val);
  }
  // this function will retirive all the details of filtering 
  const [aname, setaname] = useState("");
  const [sdate, setsdate] = useState("");
  const [edate, setedate] = useState("");
  const [sprio, setsprio] = useState("");
  function FilterAssets(name,prio,sdate,edate) {
    setaname(name)
    setsdate(sdate)
    setedate(edate)
    setsprio(prio)
  }
  const crud_show = (statuss) => {
    if (btns == true && Filterst !== "") {
      if (statuss == 0) {
        if (Filterst == 0) {
          // first 
          if (aname !== "" && sdate !== "" && sprio !== "") {
      
            let arr = [...pen];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // second pending
          else if (aname == "" && sdate !== "" && sprio !== ""){
        
            let arr = [...pen];
            let farr = arr.filter(val=>{
              if (new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // third cleared
          else if (aname !== "" && sdate == "" && sprio !== ""){
            let arr = [...pen];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fourth cleared
          else if (aname !== "" && sdate !== "" && sprio == ""){
            let arr = [...pen];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime()) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fifth cleared
          else if (aname == "" && sdate == "" && sprio !== ""){
            let arr = [...pen];
            let farr = arr.filter(val=>{
              if (val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              
              return farr;
            }else{
             
              return false
            }
          }
          // sixth cleared
          else if (aname !== "" && sdate == "" && sprio == ""){
            let arr = [...pen];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // seventh cleared
          else if (aname == "" && sdate !== "" && sprio == ""){
            let arr = [...pen];
            let farr = arr.filter(val=>{
              if (new Date(val.StartDate).getTime() >= new Date(sdate).getTime() ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }else{
            return false
          }
        } else {
          return false;
        }
      } else if (statuss == 1) {
        if (Filterst == 1) {
          // first 
          if (aname !== "" && sdate !== "" && sprio !== "") {
            let arr = [...pro];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // second 
          else if (aname == "" && sdate !== "" && sprio !== ""){
            let arr = [...pro];
            let farr = arr.filter(val=>{
              if (new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // third 
          else if (aname !== "" && sdate == "" && sprio !== ""){
            let arr = [...pro];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fourth 
          else if (aname !== "" && sdate !== "" && sprio == ""){
            let arr = [...pro];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime()) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fifth 
          else if (aname == "" && sdate == "" && sprio !== ""){
            let arr = [...pro];
            let farr = arr.filter(val=>{
              if (val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // sixth 
          else if (aname !== "" && sdate == "" && sprio == ""){
            let arr = [...pro];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // seventh 
          else if (aname == "" && sdate !== "" && sprio == ""){
            let arr = [...pro];
            let farr = arr.filter(val=>{
              if ( new Date(val.StartDate).getTime() >= new Date(sdate).getTime() ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }else{
            return false
          }
        } else {
          return false;
        }
      } else if (statuss == 2) {
        if (Filterst == 2) {
          // first 
          if (aname !== "" && sdate !== "" && sprio !== "") {
            let arr = [...com];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // second 
          else if (aname == "" && sdate !== "" && sprio !== ""){
            let arr = [...com];
            let farr = arr.filter(val=>{
              if (new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // third 
          else if (aname !== "" && sdate == "" && sprio !== ""){
            let arr = [...com];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fourth 
          else if (aname !== "" && sdate !== "" && sprio == ""){
            let arr = [...com];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime()) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fifth 
          else if (aname == "" && sdate == "" && sprio !== ""){
            let arr = [...com];
            let farr = arr.filter(val=>{
              if (val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // sixth 
          else if (aname !== "" && sdate == "" && sprio == ""){
            let arr = [...com];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // seventh 
          else if (aname == "" && sdate !== "" && sprio == ""){
            let arr = [...com];
            let farr = arr.filter(val=>{
              if ( new Date(val.StartDate).getTime() >= new Date(sdate).getTime() ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }else{
            return false
          }
        } else {
          return false;
        }
      } else if (statuss == 3) {
        if (Filterst == 3) {
          // first 
          if (aname !== "" && sdate !== "" && sprio !== "") {
            let arr = [...dep];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime() && val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // second 
          else if (aname == "" && sdate !== "" && sprio !== ""){
            let arr = [...dep];
            let farr = arr.filter(val=>{
              if (new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime() && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // third 
          else if (aname !== "" && sdate == "" && sprio !== ""){
            let arr = [...dep];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fourth 
          else if (aname !== "" && sdate !== "" && sprio == ""){
            let arr = [...dep];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime()) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fifth 
          else if (aname == "" && sdate == "" && sprio !== ""){
            let arr = [...dep];
            let farr = arr.filter(val=>{
              if (val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // sixth 
          else if (aname !== "" && sdate == "" && sprio == ""){
            let arr = [...dep];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // seventh 
          else if (aname == "" && sdate !== "" && sprio == ""){
            let arr = [...dep];
            let farr = arr.filter(val=>{
              if ( new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime() ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }else{
            return false
          }
        } else {
          return false;
        }
      } else if (statuss == 4) {
        if (Filterst == 4) {
          // first 
          if (aname !== "" && sdate !== "" && sprio !== "") {
            let arr = [...def];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime() && val.Priority == sprio ) {
                return val
              }
            })
            if (farr[0] !== undefined) {
              return farr;
            }else{
              return false
            }
          }
          // second 
          else if (aname == "" && sdate !== "" && sprio !== ""){
            let arr = [...def];
            let farr = arr.filter(val=>{
              if (new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime() && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // third 
          else if (aname !== "" && sdate == "" && sprio !== ""){
            let arr = [...def];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname && val.Priority == sprio) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fourth 
          else if (aname !== "" && sdate !== "" && sprio == ""){
            let arr = [...def];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname  && new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime()) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // fifth 
          else if (aname == "" && sdate == "" && sprio !== ""){
            let arr = [...def];
            let farr = arr.filter(val=>{
              if (val.Priority == sprio ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // sixth 
          else if (aname !== "" && sdate == "" && sprio == ""){
            let arr = [...def];
            let farr = arr.filter(val=>{
              if (val.Assignee == aname ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }
          // seventh 
          else if (aname == "" && sdate !== "" && sprio == ""){
            let arr = [...def];
            let farr = arr.filter(val=>{
              if ( new Date(val.StartDate).getTime() >= new Date(sdate).getTime() && new Date(val.EndDate).getTime() <= new Date(edate).getTime() ) {
                return val
              }
            })
            if (farr.length > 0) {
              return farr;
            }else{
              return false
            }
          }else{
            return false
          }
        } else {
          return false;
        }
      }
    } else {
      if (statuss == 0) {
        let arr = [...pen];
        if (arr[0] !== undefined) {
          return arr;
        } else {
          return false;
        }
      } else if (statuss == 1) {
        let arr = [...pro];
        if (arr[0] !== undefined) {
          return arr;
        } else {
          return false;
        }
      } else if (statuss == 2) {
        let arr = [...com];
        if (arr[0] !== undefined) {
          return arr;
        } else {
          return false;
        }
      } else if (statuss == 3) {
        let arr = [...dep];
        if (arr[0] !== undefined) {
          return arr;
        } else {
          return false;
        }
      } else if (statuss == 4) {
        let arr = [...def];
        if (arr[0] !== undefined) {
          return arr;
        } else {
          return false;
        }
      }
    }
  };

  // this function will delete the task
  const [deltask, setdeltask] = useState();
  const [deltaskstatus, setdeltaskstatus] = useState();
  const [deltaskname, setdeltaskname] = useState("");
  const crud_del = (row) => {
    setdeltask(row);
    setdeltaskname(row.Title);
    setdeltaskstatus(row.Status);
  };
  const delete_task = () => {
    if (deltask.Status == 0) {
      let arr = [...pen];
      arr.splice(arr.indexOf(deltask), 1);
      setpen(arr);
    } else if (deltask.Status == 1) {
      let arr = [...pro];
      arr.splice(arr.indexOf(deltask), 1);
      setpro(arr);
    } else if (deltask.Status == 2) {
      let arr = [...com];
      arr.splice(arr.indexOf(deltask), 1);
      setcom(arr);
    }
    setdelvar("none");
  };

  // this function will update the task
  const [update, setupdate] = useState();
  const crud_update = (row) => {
    setupdate(row);
  };
  function sendupdate() {
    return update;
  }
  const getupdateinfo = (prio, stat) => {
    if (update.Status == 0) {
      let arr = [...pen];
      arr.splice(arr.indexOf(update), 1);
      let row = update;
      row.Status = stat;
      row.Priority = prio;
      if (stat == 0) {
        arr.push(row);
        setpen(arr.sort(sorting));
      } else if (stat == 1) {
        setpen(arr.sort(sorting));
        setpro([...pro, row].sort(sorting));
      } else if (stat == 2) {
        setpen(arr.sort(sorting));
        setcom([...com, row].sort(sorting));
      } else if (stat == 3) {
        setpen(arr.sort(sorting));
        setdep([...dep, row].sort(sorting));
      } else if (stat == 4) {
        setpen(arr.sort(sorting));
        setdef([...pro, row].sort(sorting));
      }
    } else if (update.Status == 1) {
      let arr = [...pro];
      arr.splice(arr.indexOf(update), 1);
      let row = update;
      row.Status = stat;
      row.Priority = prio;
      if (stat == 0) {
        setpro(arr.sort(sorting));
        setpen([...pen, row].sort(sorting));
      } else if (stat == 1) {
        arr.push(row);
        setpro(arr.sort(sorting));
      } else if (stat == 2) {
        setpro(arr.sort(sorting));
        setcom([...com, row].sort(sorting));
      } else if (stat == 3) {
        setpro(arr.sort(sorting));
        setdep([...dep, row].sort(sorting));
      } else if (stat == 4) {
        setpro(arr.sort(sorting));
        setdef([...def, row].sort(sorting));
      }
    } else if (update.Status == 2) {
      let arr = [...com];
      arr.splice(arr.indexOf(update), 1);
      let row = update;
      row.Status = stat;
      row.Priority = prio;
      if (stat == 0) {
        setcom(arr.sort(sorting));
        setpen([...pen, row].sort(sorting));
      } else if (stat == 1) {
        setcom(arr.sort(sorting));
        setpro(arr.sort(sorting));
      } else if (stat == 2) {
        arr.push(row);
        setcom(arr.sort(sorting));
      } else if (stat == 3) {
        setcom(arr.sort(sorting));
        setdep([...dep, row].sort(sorting));
      } else if (stat == 4) {
        setcom(arr.sort(sorting));
        setdef([...def, row].sort(sorting));
      }
    } else if (update.Status == 3) {
      let arr = [...dep];
      arr.splice(arr.indexOf(update), 1);
      let row = update;
      row.Status = stat;
      row.Priority = prio;
      if (stat == 0) {
        setdep(arr.sort(sorting));
        setpen([...pen, row].sort(sorting));
      } else if (stat == 1) {
        setdep(arr.sort(sorting));
        setpro(arr.sort(sorting));
      } else if (stat == 2) {
        setdep(arr.sort(sorting));
        setcom([...com, row].sort(sorting));
      } else if (stat == 3) {
        arr.push(row);
        setdep(arr.sort(sorting));
      } else if (stat == 4) {
        setdep(arr.sort(sorting));
        setdef([...def, row].sort(sorting));
      }
    } else if (update.Status == 4) {
      let arr = [...def];
      arr.splice(arr.indexOf(update), 1);
      let row = update;
      row.Status = stat;
      row.Priority = prio;
      if (stat == 0) {
        setdef(arr.sort(sorting));
        setpen([...pen, row].sort(sorting));
      } else if (stat == 1) {
        setdef(arr.sort(sorting));
        setpro(arr.sort(sorting));
      } else if (stat == 2) {
        setdef(arr.sort(sorting));
        setcom([...com, row].sort(sorting));
      } else if (stat == 3) {
        setdef(arr.sort(sorting));
        setdep([...dep, row].sort(sorting));
      } else if (stat == 4) {
        arr.push(row);
        setdef(arr.sort(sorting));
      }
    }
    setupvar("none");
  };

  // this function will change the satus of task
  const ChangeStatus = (row) => {
    setcom([...com].sort(sorting));
    setdep([...dep].sort(sorting));
    setdef([...def].sort(sorting));

    if (row.Status == 0) {
      let arr = [...pen];
      arr.splice(arr.indexOf(row), 1);
      setpen(arr);
      row.EndDate = "";
      row.Status++;
      setpro([...pro, row].sort(sorting));
    } else if (row.Status == 1) {
      let arr = [...pro];
      arr.splice(arr.indexOf(row), 1);
      setpro(arr);
      row.EndDate = "";
      row.Status++;
      setcom([...com, row].sort(sorting));
    } else if (row.Status == 2) {
      let arr = [...com];
      arr.splice(arr.indexOf(row), 1);
      // here it will add anddate of task
      setcom(arr);
      row.EndDate = `${year}-${month}-${date}`;
      row.Status++;
      setdep([...dep, row].sort(sorting));
    } else if (row.Status == 3) {
      let arr = [...dep];
      arr.splice(arr.indexOf(row), 1);
      setdep(arr);
      row.Status++;
      setdef([...def, row].sort(sorting));
    }
  };

  //this function is nothing just add onclick for form it will make one form diplay as block at a time
  function display(cud) {
    if (cud == "d") {
      if (delvar == "none") {
        setdelvar("block");
        setupvar("none");
        setcrevar("none");
      } else {
        setdelvar("none");
      }
    } else if (cud == "u") {
      if (upvar == "none") {
        setupvar("block");
        setdelvar("none");
        setcrevar("none");
      } else {
        setupvar("none");
      }
    } else if (cud == "c") {
      if (crevar == "none") {
        setcrevar("block");
        setupvar("none");
        setdelvar("none");
      } else {
        setcrevar("none");
      }
    }
  }

  return (
    <div className="main">
      <h1>Task Board</h1>
      <div className="container">
        {/* this top component is  filtering methods which will shown on the top of the container*/}
        <Top FilterStatus={FilterStatus} getbtns={getbtns} FilterAssets={FilterAssets   }/>

        {/* this bottom component is all the card(status of task) and task with in it  */}
        <Bottom
          delaction={display}
          upaction={display}
          crud_show={crud_show}
          ChangeStatus={ChangeStatus}
          crud_del={crud_del}
          crud_up={crud_update}
        />

        {/* this is create task  button  */}
        <button
          onClick={() => {
            display("c");
          }}
        >
          Create New Task
        </button>
      </div>

      {/* this 3 Components are delete upadte and create forms  */}
      <Delete
        delstate={delvar}
        delfunc={display}
        delete_task={delete_task}
        title={deltaskname}
        status={deltaskstatus}
      />
      <Edit
        upstate={upvar}
        upfunc={display}
        update={sendupdate}
        info={getupdateinfo}
      />
      <Create crestate={crevar} crefunc={display} crud={crud_create} />
    </div>
  );
}
