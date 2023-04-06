import React from "react";

function CreateTodoInput({
  text,
  onChange,
  onClick,
}: {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}) {
  return (
    <div>
      <input
        data-testid="new-todo-input"
        placeholder="생성할 todo 입력해주세요"
        value={text}
        onChange={onChange}
      />
      <button data-testid="new-todo-add-button" onClick={onClick}>
        추가
      </button>
    </div>
  );
}

export default React.memo(CreateTodoInput);
