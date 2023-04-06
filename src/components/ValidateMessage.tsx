import React from "react";
function ValidateMessage({
  isCheck,
  children,
}: {
  isCheck: boolean;
  children: string;
}) {
  return <>{!isCheck ? <span>{children}</span> : undefined}</>;
}

export default React.memo(ValidateMessage);
