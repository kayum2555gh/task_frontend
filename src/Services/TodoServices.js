import axios from 'axios'

// get token
const user = JSON.parse(localStorage.getItem("todoapp"));
axios.defaults.headers.common['Authorization'] = `bearer ${user?.token}`;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// create todo
const createTodo = (data) => {
    return axios.post(`${BASE_URL}/todo/create`, data);
}

//GET ALL TODO
const getAllTodo = (id) => {
  return axios.post(`${BASE_URL}/todo/getAll/${id}`);
};
// update todo
const updateTodo = (id, data) =>{
    return axios.patch(`${BASE_URL}/todo/update/${id}`, data);
}

// delete 
const deleteTodo = (id) => {
    return axios.delete(`${BASE_URL}/todo/delete/${id}`)
}
 
const TodoServices = {createTodo, getAllTodo, updateTodo, deleteTodo}

export default TodoServices;