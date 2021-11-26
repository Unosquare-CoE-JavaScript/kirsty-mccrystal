import React, { useState } from 'react';

import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'
import { Todo } from './todo.model';

// FC = function component - defines it has to be a function but must be a function in react
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [...prevTodos, {id: Math.random(), text}])
  }

  const todoDeleteHandler = (todoId: number) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo =>  todo.id !== todoId)
    })
  }

  return (
    <div className="App">
      <NewTodo 
        todoAddHandler={todoAddHandler}
      />
      <TodoList 
        todosList={todos}
        todoDeleteHandler={todoDeleteHandler}
      />
    </div>
  );
}

export default App;
