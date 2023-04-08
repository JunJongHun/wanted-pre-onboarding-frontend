import React, { useEffect, useState } from "react";

function CreateTodoInput({
  text,
  onChange,
  onClick,
}: {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}) {
  const [isTextEmpty, setIsTextEmpty] = useState(true);

  useEffect(() => {
    setIsTextEmpty(text === "");
  }, [text]);
  return (
    <div className="mb-6 flex">
      <input
        className="border p-2"
        data-testid="new-todo-input"
        placeholder="생성할 todo 입력해주세요"
        value={text}
        onChange={onChange}
      />
      <button
        className="bg-blue-100
        p-2 disabled:opacity-20"
        data-testid="new-todo-add-button"
        onClick={onClick}
        disabled={isTextEmpty}
      >
        추가
      </button>
    </div>
  );
}

export default React.memo(CreateTodoInput);
