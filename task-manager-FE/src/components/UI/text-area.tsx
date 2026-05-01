import { TextField, TextFieldProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

type FormInputProps = TextFieldProps & IFormInputPasswordField;

const TextAreaField = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      label,
      value,
      onChange,
      error,
      helperText,
      size,
      rows = 4,
      ...props
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <TextField
        // label={label}
        name={name}
        value={value}
        onChange={onChange}
        size={size}
        error={!!error}
        helperText={error ? helperText : ""}
        fullWidth
        inputRef={ref}
        multiline
        rows={rows}
        {...props}
      />
    );
  }
);

export default TextAreaField;
