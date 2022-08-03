import React from 'react';
import './style.css';

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Wash dishes', done: false },
    { id: 2, text: 'Do laundry', done: false },
    { id: 3, text: 'Take shower', done: false },
  ]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done,
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? 'line-through' : '',
          }}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDelete() {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== todo.id);
    });
    /*
    const confirmed = window.confirm('Do you want to delete this?');
    if (confirmed) {
      
    } */
  }

  return (
    <span
      onClick={handleDelete}
      role="button"
      style={{
        color: 'red',
        fontWeight: 'bold',
        marginLeft: '10px',
        cursor: 'pointer',
      }}
    >
      x
    </span>
  );
}
function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: 4,
      text,
      done: false,
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = '';
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="addTodo" placeholder="Add todo" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
