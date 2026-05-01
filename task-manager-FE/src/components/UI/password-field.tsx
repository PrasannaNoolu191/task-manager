import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Lock1, Unlock } from "iconsax-reactjs";
import { ForwardedRef, forwardRef, useState } from "react";

type FormInputPasswordProps = TextFieldProps & IFormInputPasswordField;

const PasswordField = forwardRef<HTMLInputElement, FormInputPasswordProps>(
  (
    { name, label, value, onChange, error, helperText, size, ...props },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <TextField
        // label={label}
        name={name}
        type={showPassword ? "text" : "password"}
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
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? (
                    <Lock1 style={{ height: "21px", width: "21px" }} />
                  ) : (
                    <Unlock style={{ height: "21px", width: "21px" }} />
                  )}
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

export default PasswordField;
