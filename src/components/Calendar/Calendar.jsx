import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToDo } from "../../redux/selectors.js";
import { fetchToDos } from "../../redux/operations.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectToDo) || [];

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  const events = todos
    .filter(todo => todo.deadline)
    .map(todo => ({
      title: todo.todo,
      date: new Date(todo.deadline).toISOString().split('T')[0], 
    }));

  console.log("Todos:", todos);
  console.log("Wydarzenia do kalendarza:", events);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};

export default Calendar;
