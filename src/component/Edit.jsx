import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";

const Edit = ({ task, setShowModal , getUserTask}) => {
    const [title, setTitle] = useState(task?.title);
    const [description, SetDescription] = useState(task?.description);
    const [isCompleted, setIscompleted] =useState(task?.isCompleted);

    const handleClose = () => {
        setShowModal(false);
        
    };

    const handleSelectChange = (e) => {
        setIscompleted(e.target.value == 'true');
    
    }

    const id = task?._id;

    const handleUpdate = async () => { 
        try {
            const userData = JSON.parse(localStorage.getItem("todoapp"));
            const createdBy = userData && userData.user.id;
            const data = {title, description, createdBy, isCompleted};
            if(!title || !description){
                return toast.error("Please provide title and description");
            }
            await TodoServices.updateTodo(id,data);
            setShowModal(false);
            toast.success("Task updated successfully");
            getUserTask();
            setTitle("");
            SetDescription("")
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    };

    return (
        <>
            {task && (
                <div
                    className="modal"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update your Task</h5>
                                <button
                                    className="btn-close"
                                    aria-label="close"
                                    onClick={handleClose}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        id="floatigTextarea"
                                        value={description}
                                        onChange={(e) => {
                                            SetDescription(e.target.value);
                                        }}
                                    ></textarea>
                                    <label htmlFor="floatigTextarea">Dscription</label>
                                </div>
                                <div className="my-3">
                                    <select className="form-select" value={String(isCompleted)}
                                     onChange={handleSelectChange}>
                                        <option selected>Select Status</option>
                                        <option value={true}>completed</option>
                                        <option value={false}>incompleted</option>
                                    </select>
                                </div>
                            </div>
                            

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Edit;
