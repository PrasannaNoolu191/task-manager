import { ExpandMoreTwoTone } from "@mui/icons-material";
import { FormControl, MenuItem, Select, SelectProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

type Option = { label: string; value: string };

type SelectFieldProps = SelectProps & {
  label: string;
  options: Option[];
  error?: boolean;
  helperText?: string;
};

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { label, options, error, helperText, ...props },
    ref: ForwardedRef<HTMLSelectElement>,
  ) => (
    <FormControl fullWidth error={error} size={props.size ?? "small"}>
      <Select
        IconComponent={ExpandMoreTwoTone}
        displayEmpty
        inputRef={ref}
        renderValue={(selected) =>
          selected
            ? options.find((opt) => opt.value === selected)?.label
            : "Select Status"
        }
        {...props}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <span style={{ color: "#d32f2f", fontSize: 12, marginTop: 2 }}>
          {helperText}
        </span>
      )}
    </FormControl>
  ),
);

export default SelectField;
