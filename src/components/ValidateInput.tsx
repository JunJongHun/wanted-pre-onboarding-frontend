import React from "react";

function ValidateInput({
  type,
  dataTestId,
  value,
  onChange,
}: {
  type: string;
  dataTestId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <input
        name={type}
        placeholder={type}
        type={type}
        data-testid={dataTestId}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default React.memo(ValidateInput);
