import React from "react";

function ValidateButton({
  dataTestId,
  onClick,
  disabled,
  children,
}: {
  dataTestId: string;
  onClick: () => void;
  disabled: boolean;
  children: string;
}) {
  return (
    <button data-testid={dataTestId} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default React.memo(ValidateButton);
