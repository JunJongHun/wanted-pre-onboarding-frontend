import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTodos from "../services/getTodos";
import postCreateTodo from "../services/postCreateTodo";
import { TodoType } from "../types/todo";
import hasToken from "../utils/hasToken";
import deleteTodo from "../services/deleteTodo";
import putTodo from "../services/putTodo";

function Todo() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [toggleId, setToggleId] = useState<number>(0);
  const [editTodoText, setEditTodoText] = useState("");

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

  const onChangeEditTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoText(e.target.value);
  };

  const delTodo = async (id: number) => {
    const copy = todos.filter((todo) => todo.id !== id);
    deleteTodo(id);
    setTodos([...copy]);
  };

  const onChangeCheckBox = (id: number) => {
    const copy = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    const data = copy.find((todo) => todo.id === id);
    const todoInfo = { todo: data?.todo, isCompleted: data?.isCompleted };
    putTodo(id, todoInfo);
    setTodos([...copy]);
  };

  const updateTodos = (id: number) => {
    const copy = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: editTodoText } : todo
    );
    const data = copy.find((todo) => todo.id === id);
    const todoInfo = { todo: editTodoText, isCompleted: data?.isCompleted };
    putTodo(id, todoInfo);
    setTodos([...copy]);
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
        {todos?.map(({ id, todo, isCompleted }) => {
          return (
            <li key={id}>
              <label>
                <input
                  type="checkbox"
                  onClick={() => {
                    onChangeCheckBox(id);
                  }}
                  defaultChecked={isCompleted}
                />
                {toggleId !== id ? (
                  <>
                    <span>{todo}</span>
                    <button
                      onClick={() => {
                        setEditTodoText(todo);
                        setToggleId(id);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        delTodo(id);
                      }}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      data-testid="modify-input"
                      type="text"
                      value={editTodoText}
                      onChange={onChangeEditTodoText}
                    />
                    <button
                      data-testid="submit-button"
                      onClick={() => {
                        updateTodos(id);
                        setToggleId(0);
                      }}
                    >
                      제출
                    </button>
                    <button
                      data-testid="cancel-button"
                      onClick={() => {
                        setToggleId(0);
                      }}
                    >
                      취소
                    </button>
                  </>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
