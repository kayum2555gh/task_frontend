import React, { useState } from "react";
import Edit from "../Edit";
import TodoServices from "../../Services/TodoServices";
import toast from "react-hot-toast";

const Card = ({ allTask, getUserTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // Handle edit
  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  // Handle close
  const handleClose = () => {
    setSelectedTask(null);
  };

  // handle delte
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("task Delelte Succuessfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => (
          <div
            className="card border-primary mb-3 mt-3"
            style={{ maxWidth: "18rem" }}
            key={task._id}
          >
            <div className="card-header">
              <div className="chead">
                <h6>{task?.title.substring(0, 10)}</h6>

                <h6 className={task?.isCompleted ? "task-cmp" : "task-inc"}>
                  {task?.isCompleted ? "Completed" : "Incompleted"}
                </h6>
              </div>
            </div>

            <div className="card-body">
              <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>

              <p>{task?.description}</p>

              <h6>Date: {task?.createdAt.substring(0, 10)}</h6>
            </div>

            <div className="card-footer bg-transparent border-primary">
              <button
                className="btn btn-warning"
                title="EDIT Task"
                onClick={() => handleEdit(task)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>

              <button
                className="btn btn-danger ms-2"
                title="Delete Task"
                onClick={() => handleDelete(task?._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}

        {/* Render only one modal for the selected task */}
        {selectedTask && (
          <Edit task={selectedTask} setShowModal={handleClose}  getUserTask={getUserTask}/>
        )}
      </div>
    </>
  );
};

export default Card;
