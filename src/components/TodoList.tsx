import React from "react";
import { TodoType } from "../types/todo";
import Todo from "./Todo";

function TodoList({
  todos,
  setTodos,
}: {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) {
  return (
    <ul>
      {todos?.map((todo) => (
        <Todo item={todo} setTodos={setTodos}></Todo>
      ))}
    </ul>
  );
}

export default React.memo(TodoList);
