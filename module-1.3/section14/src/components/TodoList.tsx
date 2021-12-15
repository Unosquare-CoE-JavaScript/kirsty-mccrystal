import React from "react";

import './TodoList.css'

interface TodoListProps {
  todosList: { id: number, text: string}[];
  todoDeleteHandler: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.todosList.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={props.todoDeleteHandler.bind(null, todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
