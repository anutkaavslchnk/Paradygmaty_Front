import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo, fetchToDos } from "../../redux/operations";
import { selectToDo } from "../../redux/selectors";

const ToDo = () => {
 const dispatch=useDispatch();
    const initialValues={
        todo:''
    }

const todos=useSelector(selectToDo);
useEffect(() => {
  dispatch(fetchToDos()); 
}, [dispatch]);
    const handleSubmit=(values,options)=>{
options.resetForm()
dispatch(addToDo(values));
    }

  return (
  <>
  <h1>To do App</h1>
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form>
        <Field type='text' name="todo"></Field>
        <button type="submit">Add</button>
    </Form>
  </Formik>

  <ul>
    {todos!=0 && todos.map(item=>{
      return (
        <div>
      <li key={item._id}>{item.todo}</li>
<button type="button" onClick={()=>dispatch(deleteToDo(item._id))}>Delete</button>
</div>
      )
    })}
  </ul>
  </>
)
};

export default ToDo;
