import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postCreateTodo from "../services/postCreateTodo";
import hasToken from "../utils/hasToken";

function Todo() {
  const [todoText, setTodoText] = useState("");

  const navigate = useNavigate();

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const createTodo = async () => {
    await postCreateTodo(todoText);
    setTodoText("");
  };

  useEffect(() => {
    if (!hasToken()) navigate("/signin");
  });

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
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 1</span>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 2</span>
          </label>
        </li>
      </ul>
    </div>
  );
}

export default Todo;
