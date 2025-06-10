import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo, editToDo, fetchToDos } from "../../redux/operations";
import { selectToDo } from "../../redux/selectors";
import { Toaster } from "react-hot-toast";
import s from './ToDo.module.css';
import deleteImg from '/public/Vector.png';
const ToDo = () => {
  const [open,setOpen]=useState(null);


 const dispatch=useDispatch();
    const initialValues={
        todo:''
    }
  const handleClickEdit=(id)=>{
    setOpen(id);
  }
const todos=useSelector(selectToDo)|| [];
useEffect(() => {
  dispatch(fetchToDos()); 
}, [dispatch]);
    const handleSubmit=(values,options)=>{
options.resetForm()
dispatch(addToDo(values));
    }

  return (
    <>
    <Toaster position="top-right" />
  <div className={s.container}>
 
  <h1 className={s.title}>To do App</h1>
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={s.form}>
        <Field className={s.input} type='text' name="todo" placeholder="Add the task"></Field>
        <button className={s.button} type="submit">Add</button>
    </Form>
  </Formik>

  <ul className={s.list}>
    {todos!=0 && todos.map(item=>{
      return (
        <div key={item._id}>
      <li className={s.item}>
        <p>{item.todo}</p>

      <button type="button" className={s.delete} onClick={()=>dispatch(deleteToDo(item._id))}><img src={deleteImg} ></img></button>
      <button type='button' onClick={() => handleClickEdit(item._id)}>Edit</button>


      </li>
      {open === item._id &&  (
        <div>
 <Formik initialValues={{ todo: item.todo || '' } } onSubmit={(values, options) => {
options.resetForm(); 
dispatch(editToDo({todoId:item._id, updatedData:{todo:values.todo}}));
 }}>
    <Form className={s.form}>
        <Field className={s.input} type='text' name="todo" placeholder="Change the task"></Field>
        <button className={s.button} type="submit">Change</button>
    </Form>
  </Formik>
      </div>)}

</div>
      )
    })}
  </ul>
  </div>
  </>
)
};

export default ToDo;
