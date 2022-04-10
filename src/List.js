import React from "react";
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";

const List = ({ list, editItem, removeItem, finishItem}) => {
  // const {} = props;
  // console.log(props, editItem);


  return (
    <div className="to-do-container">
      {list.map((item, index) => {
        const { id, title , isDone} = item;
        console.log(isDone)
        return (
          <div className={`to-do ${isDone && "done"}`} key={index}>
            <div className="title-container" onClick={() => finishItem(id,isDone)}>
              <i className="check"> {isDone && <AiOutlineCheck />}</i>
              <p className="to-do-title">{title}</p>
            </div>
            <div className="btn-container">
              <button className="btn edit-btn" onClick={() => editItem(id)}>
                <AiFillEdit />
              </button>
              <button className="btn delete-btn" onClick={() => removeItem(id)}>
                <AiFillDelete />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
