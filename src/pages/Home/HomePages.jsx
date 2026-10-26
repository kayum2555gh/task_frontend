import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import PopModal from "../../component/PopModal";
import TodoServices from "../../Services/TodoServices";
import Card from "../../component/Card";
import Spinner from "../../component/Spinner";

const HomePages = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  // open modalhandler
  const openModalhandler = () => {
    setShowModal(true);
  };

  //search
  const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase()),
    );
    // console.log("Filterd list===>", filterList);
    setSearchQuery(query);
    if (query && filterList.length > 0) {
      setAllTask(filterList && filterList);
    } else {
      getUserTask();
    }
  };

  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData?.user.id;


  const getUserTask = async () => {
    setLoading(true);

    try {
      const { data } = await TodoServices.getAllTodo(id);
      
      setLoading(false);
      setAllTask(data?.todos);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add-task">
          <h1>Your Task</h1>
          <input
            type="search"
            placeholder="search your task"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="btn btn-primary" onClick={openModalhandler}>
            Create task <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {/* === popmodal */}
        {loading ? (
          <Spinner />
        ) : (
          allTask && <Card allTask={allTask} getUserTask={getUserTask} />
        )}
        <PopModal
          showModal={showModal}
          description={description}
          title={title}
          setTitle={setTitle}
          SetDescription={SetDescription}
          setShowModal={setShowModal}
          getUserTask={getUserTask}
        />
      </div>
    </>
  );
};

export default HomePages;
