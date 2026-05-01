import { TextField, TextFieldProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

type FormInputProps = TextFieldProps & IFormInputPasswordField;

const InputField = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { name, label, value, onChange, error, helperText, size, ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <TextField
        // label={label}
        name={name}
        // type="email"
        value={value}
        onChange={onChange}
        size={size}
        error={!!error}
        helperText={error ? helperText : ""}
        fullWidth
        inputRef={ref}
        {...props}
      />
    );
  },
);

export default InputField;
