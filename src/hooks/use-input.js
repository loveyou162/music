import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState(""); // Lưu trữ giá trị người dùng nhập vào trường input.
  const [isTouched, setIsTouched] = useState(false); //Theo dõi xem trường input đã được chạm vào
  const [emailError, setEmailError] = useState(""); //

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const InputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const emailBlurHandler = () => {
    if (!enteredValue.trim()) {
      setEmailError("Không được để trống");
    } else if (!enteredValue.includes("@")) {
      setEmailError("Bạn nhập sai định dạng email");
    } else {
      setEmailError("");
      setIsTouched(true);
    }
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    emailError,
    valueChangeHandler,
    InputBlurHandler,
    emailBlurHandler,
    reset,
  };
};
export default useInput;
