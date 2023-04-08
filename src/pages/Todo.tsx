import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTodos from "../services/getTodos";
import postCreateTodo from "../services/postCreateTodo";
import { TodoType } from "../types/todo";
import hasToken from "../utils/hasToken";
import CreateTodoInput from "../components/CreateTodoInput";
import TodoList from "../components/TodoList";

function Todo() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const navigate = useNavigate();

  const onChangeTodoText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoText(e.target.value);
    },
    []
  );

  //생성
  const createTodo = useCallback(async () => {
    try {
      await postCreateTodo(todoText);
      getTodos().then((res) => {
        setTodos([...res]);
      });
      setTodoText("");
    } catch (error) {
      alert("값을 입력해주세요!");
    }
  }, [todoText]);

  useEffect(() => {
    if (!hasToken()) navigate("/signin");
    getTodos().then((res) => {
      setTodos([...res]);
    });
  }, []);

  return (
    <div className="mt-6 flex  flex-col items-center">
      <CreateTodoInput
        text={todoText}
        onChange={onChangeTodoText}
        onClick={createTodo}
      ></CreateTodoInput>
      <TodoList todos={todos} setTodos={setTodos}></TodoList>
    </div>
  );
}

export default Todo;
