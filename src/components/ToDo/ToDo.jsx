import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo, editToDo, fetchToDos } from "../../redux/operations";
import { selectToDo } from "../../redux/selectors";
import { Toaster } from "react-hot-toast";
import s from './ToDo.module.css';
import deleteImg from '/public/Vector.png';
import edit from '/public/edit.png';
import close from '/public/close.png';
import { useNavigate } from "react-router-dom";
import calendar from '/public/calendar.png';
const ToDo = () => {
  const [open, setOpen] = useState(null); // which todo is being edited
  const dispatch = useDispatch();
  const nav=useNavigate();
  const initialValues = {
    todo: '',
    deadline:''
  };

  const handleClickEdit = (id) => {
    setOpen(id);
  };
  const handleCalendar=()=>{
nav('/calendar');
  }

  const todos = useSelector(selectToDo) || [];

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  const handleSubmit = (values, options) => {
    options.resetForm();
    dispatch(addToDo(values));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className={s.container}>
        
              <button  className={s.calendar_btn}onClick={handleCalendar}><img src={calendar}  alt="calendar_icon"/> </button>
    <p className={s.txt_cal}>Calendar</p>
        <h1 className={s.title}>Plan your days</h1>


        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={s.form}>
            <Field className={s.input} type='text' name="todo" placeholder="Add the task" />
            <Field className={s.input} type="date" name="deadline"  min={new Date().toISOString().split("T")[0]}/>
            <button className={s.button} type="submit">Add</button>
          </Form>
        </Formik>

   
        <ul className={s.list}>
          {todos.length > 0 && todos.map(item => (
            <li key={item._id} className={s.item}>
            
              {open === item._id ? (
                <Formik
                  initialValues={{ todo: item.todo || '' }}
                  onSubmit={(values, options) => {
                    options.resetForm();
                    dispatch(editToDo({ todoId: item._id, updatedData: { todo: values.todo } }));
                    setOpen(null); 
                  }}
                >
                  <Form className={s.inlineForm}>
                    <Field
                      className={s.input_change}
                      type="text"
                      name="todo"
                      placeholder="Change the task"
                    />
                    <button className={s.button_ch} type="submit">Change</button>
                    <button
                      type="button"
                      className={s.close}
                      onClick={() => setOpen(null)} 
                    >
                     <img src={close} alt="delete" />
                    </button>
                  </Form>
                </Formik>
              ) : (
                <>
                  <p>{item.todo}</p>
                  <div>
                    <button
                      type="button"
                      className={s.delete}
                      onClick={() => dispatch(deleteToDo(item._id))}
                    >
                      <img src={deleteImg} alt="delete" />
                    </button>
                    <button
                      type="button"
                      className={s.delete}
                      onClick={() => handleClickEdit(item._id)}>
                      <img src={edit} alt="edit" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDo;
