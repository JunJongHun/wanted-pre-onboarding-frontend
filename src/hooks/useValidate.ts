import { useEffect, useState } from "react";

function useValidate(str: string, regex: RegExp) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(regex.test(str));
  }, [str, regex]);

  return [check];
}

export default useValidate;
