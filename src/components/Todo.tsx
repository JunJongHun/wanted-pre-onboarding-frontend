import { useRef, useState } from "react";
import deleteTodo from "../services/deleteTodo";
import getTodos from "../services/getTodos";
import putTodo from "../services/putTodo";
import { TodoType } from "../types/todo";

function Todo({
  item,
  setTodos,
}: {
  item: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) {
  const { id, isCompleted, todo } = item;
  const [check, setCheck] = useState(true);
  const [editText, setEditText] = useState("");

  const ref = useRef<HTMLInputElement>(null);

  const handleModify = () => {
    setEditText(todo);
    setCheck((pre) => !pre);
    ref.current?.focus();
  };

  const handleDelete = async () => {
    await deleteTodo(id);
    await getTodos().then((res) => setTodos([...res]));
  };

  const handleSubmit = () => {
    setTodos((pre) => [
      ...pre.map((item) =>
        item.id === id ? { ...item, todo: editText } : item
      ),
    ]);
    setCheck((pre) => !pre);
    putTodo(id, { todo: editText, isCompleted });
  };

  const handleCancel = () => {
    setEditText("");
    setCheck((pre) => !pre);
  };

  const handleCheckBox = () => {
    putTodo(id, { todo, isCompleted: !isCompleted });
  };

  return (
    <li key={id} className="mb-3">
      {check ? (
        <div className="flex w-full items-center justify-center">
          <label className="flex">
            <input
              className=" w-5"
              type="checkbox"
              defaultChecked={isCompleted}
              onClick={handleCheckBox}
            />
            <span className="w-40 break-words p-2">{todo}</span>
          </label>
          <button
            className="w-16  rounded-full text-white bg-blue-500 py-2"
            data-testid="modify-button"
            onClick={handleModify}
          >
            수정
          </button>
          <button
            className="w-16 ml-1 rounded-full text-white bg-red-400 p-2"
            data-testid="delete-button"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      ) : (
        <div className="flex">
          <input
            className=" w-5"
            type="checkbox"
            defaultChecked={isCompleted}
            onClick={handleCheckBox}
          />
          <input
            className="w-40  p-2  font-bold outline-none"
            data-testid="modify-input"
            type="text"
            value={editText}
            ref={ref}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEditText(e.target.value);
            }}
          />
          <button
            className="w-16 text-white  rounded-full bg-green-500 p-2"
            data-testid="submit-button"
            onClick={handleSubmit}
          >
            제출
          </button>
          <button
            className="w-16  ml-1  rounded-full text-white bg-amber-300 p-2"
            data-testid="cancel-button"
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      )}
    </li>
  );
}

export default Todo;
