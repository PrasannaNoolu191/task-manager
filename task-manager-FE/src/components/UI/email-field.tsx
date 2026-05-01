import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

type FormInputEmailProps = TextFieldProps & IFormInputPasswordField;

const EmailField = forwardRef<HTMLInputElement, FormInputEmailProps>(
  (
    { name, label, value, onChange, error, helperText, size, ...props },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <TextField
        // label={label}
        name={name}
        type="email"
        value={value}
        onChange={onChange}
        size={size}
        error={!!error}
        helperText={error ? helperText : ""}
        fullWidth
        inputRef={ref}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <EmailOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        {...props}
      />
    );
  }
);

export default EmailField;
