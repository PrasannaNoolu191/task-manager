import { Controller } from "react-hook-form";
import { Box, FormLabel } from "@mui/material";
import styles from "../styles/styles";
import SelectField from "../components/UI/select";

type Option = { label: string; value: string };

interface IFormSelectFields {
  name: string;
  label?: string;
  control: any;
  errors?: any;
  options: Option[];
  size?: "small" | "medium";
  [key: string]: any;
}

const FormSelectField: React.FC<IFormSelectFields> = ({
  name,
  label = "",
  control,
  errors,
  options,
  size,
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <Box sx={styles.flexColumnOneGapBox}>
        {label ? <FormLabel sx={styles.formLabel}>{label}</FormLabel> : null}
        <SelectField
          {...field}
          {...props}
          label={label}
          options={options}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.["message"] ?? ""}
          size={size}
        />
      </Box>
    )}
  />
);

export default FormSelectField;
