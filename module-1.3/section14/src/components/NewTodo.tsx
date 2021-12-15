import React, { useRef } from 'react';

import './NewTodo.css';

type NewTodoProps = {
  todoAddHandler: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.todoAddHandler(enteredText)
  }

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className='form-control'>
        <label htmlFor="todo-text">Todo Text</label>
        <input ref={textInputRef} type="text" id="todo-text" />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default NewTodo;