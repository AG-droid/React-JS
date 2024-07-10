import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  let init_data = [];
  let chckd_data = []
  let highestId = 0;

  if (localStorage.getItem("highestId")) {
    highestId = parseInt(localStorage.getItem("highestId"));
    for (let i = 0; i < highestId; i++) {
      let item = localStorage.getItem(i.toString());
      if (item) {
        item = item.split(",")
        let dets = { id: i, name: item[0] };
        if(item.includes("true")){

          chckd_data.push(dets)
        }else{
          init_data.push(dets);
        }
        
      }
    }
  }

  const [arr, setArr] = useState(init_data);
  const [done, setDone] = useState(chckd_data);
  const [inpt, setInpt] = useState("");
  const [id, setId] = useState(highestId);
  const[checked,setChecked] = useState("false");

  const Input = (e) => {
    if (e.key === "Enter" && inpt.trim() !== "") {
      let newTask = {
        id: id,
        name: inpt,
        check: checked
      };
      let newArr = [...arr, newTask];
      let newId = id + 1;

      setTimeout(() => {
        setInpt("");
      }, 0);
  
      newArr.forEach((objct) => {
        let dat = [objct.name,objct.check]
        dat = dat.join()
        localStorage.setItem(objct.id.toString(),dat);
      });

      localStorage.setItem("highestId", newId.toString());

      setId(newId);
      setArr(newArr);
      e.preventDefault();
    }
  };


  const Done = (indx) => {
    let newDone = [...done];
    let newArr = [...arr];

    let [task] = newArr.splice(indx, 1);
    newDone.push(task);

    setDone(newDone);
    setArr(newArr);
    setChecked("true")
  };

  const notDone = (indx) => {
    let newDone = [...done];
    let newArr = [...arr];

    let [task] = newDone.splice(indx, 1);
    newArr.push(task);
    setDone(newDone);
    setArr(newArr);
  };



  return (
    <>
      <h1 style={{ textAlign: "center" }}>TODO LIST</h1>

      <h1 className="fs-1 fw-bold text-center">Tasks</h1>
      <ol className="list-group">
        <div className="mx-auto">
          {arr.map((item, index) => (
            <li key={item.id} style={{ fontSize: "40px",marginBottom:"10px" }} className='list-group-item list-group-item-dark rounded-4'>
              <div className="big-checkbox rounded-4">
                <label style={{marginRight:"100px"}}>
                  <input
                    type="checkbox"
                    onChange={() =>{ Done(index)}}
                    style={{ width: "30px", height: "30px" ,borderRadius:"50%", marginRight:"100px"}}
                    
                  />
                                  {item.name}
                  
                </label>
              </div>
            </li>
          ))}
        </div>
      </ol>

      <h1 className="fs-1 fw-bold text-center">Tasks Completed</h1>
      <ul className="list-group">
        <div className="mx-auto" style={{marginBottom:"100px"}}>
          {done.map((item, index) => (
            <li key={item.id} style={{ fontSize: "40px", marginBottom:"10px" }} className='list-group-item list-group-item-success rounded-4'>
              <div className="big-checkbox">
                <label style={{marginRight:"100px"}}>
                  
                  <input
                    type="checkbox"
                    onChange={() => notDone(index)}
                    style={{ width: "30px", height: "30px" ,borderRadius:"50%", marginRight:"100px" }}
                    checked
                  />
                  <s>{item.name}</s>
                </label>
              </div>
            </li>
          ))}
        </div>
      </ul>

      <input
        type="text"
        className="fixed-bottom bg-light p-3 col-xl-9 mx-auto rounded-4"
        style={{ marginBottom: "10px" }}
        placeholder="Add a new task !"
        value={inpt}
        onChange={(e) => {
          setInpt(e.target.value);
        }}
        onKeyPress={Input}
      ></input>

      <button
      type='button'
      className='fixed-bottom col-sm-1 btn btn-danger'
      style={{marginBottom:"20px",marginLeft:"20px"}}
        onClick={() => {
          localStorage.clear();
          setArr([]);
          setDone([]);
          setId(0);
        }}
      >
        Clear
      </button>
    </>
  );
}

export default App;
