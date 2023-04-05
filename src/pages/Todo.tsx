import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTodos from "../services/getTodos";
import postCreateTodo from "../services/postCreateTodo";
import { TodoType } from "../types/todo";
import hasToken from "../utils/hasToken";

function Todo() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const navigate = useNavigate();

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const createTodo = async () => {
    await postCreateTodo(todoText);
    getTodos().then((res) => {
      setTodos([...res]);
    });
    setTodoText("");
  };

  useEffect(() => {
    if (!hasToken()) navigate("/signin");
    getTodos().then((res) => {
      setTodos([...res]);
    });
  }, []);

  return (
    <div>
      <div>
        <input
          data-testid="new-todo-input"
          placeholder="생성할 todo 입력해주세요"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button data-testid="new-todo-add-button" onClick={createTodo}>
          추가
        </button>
      </div>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" defaultChecked={todo.isCompleted} />
              <span>{todo.todo}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
