import React from "react";
import { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = JSON.parse(localStorage.getItem("list"));
  return list;
};


function App() {
  // log(getLocalStorage());
  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: true, msg: "", type: "" });

  // log(alert);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlertInit(true, "please enter something", "danger");
      const timeOut = setTimeout(() => {
        setAlertInit();
      }, 3000);
      return () => clearTimeout(timeOut);
    } else if (isEditing && name) {
      const newItems = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name };
        } else {
          return item;
        }
      });
      // log(newItems);
      setEditId(null);
      setName("");
      setIsEditing(false);
      setList(newItems);
      setAlertInit(true, "title changed", "success");
    } else {
      setAlertInit(true, "item added to the list", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        isDone: false,
      };
      setList([...list, newItem]);
      setName("");

      // log(newItem);
    }
  };
  // log(name)

  const clearList = () => {
    setAlertInit(true, "empty list", "danger");

    setList([]);
  };

  const setAlertInit = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    setAlertInit(true, "item removed", "danger");
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(editItem.title);
    setEditId(editItem.id);
  };
  const finishItem = (id, isDone) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      })
    );
    if (isDone) {
      setAlertInit(true, "undone", "success");
    } else {
      setAlertInit(true, "done", "success");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    const timeOut = setTimeout(() => {
      setAlertInit();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [list]);
  return (
    <div className="main">
      <div className="container">
        {alert.show && (
          <Alert {...alert} list={list} removeAlert={setAlertInit} />
        )}
        <h2 className="headline">to do list</h2>
        <form className="to-do-form" onSubmit={handleSubmit}>
          <input
            placeholder="enter schedule"
            type="text"
            maxLength="25"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit" className="btn submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </form>

        {/* List */}
        <List
          list={list}
          editItem={editItem}
          removeItem={removeItem}
          finishItem={finishItem}
        />
        <button type="button" className="btn clear-btn" onClick={clearList}>
          clear list
        </button>
      </div>
    </div>
  );
}

export default App;
