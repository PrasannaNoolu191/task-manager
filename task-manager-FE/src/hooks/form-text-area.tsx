import { Controller } from "react-hook-form";
import { Box, FormLabel } from "@mui/material";
import styles from "../styles/styles";
import TextAreaField from "../components/UI/text-area";

const FormTextAreaField: React.FC<IFormInputFields> = ({
  name,
  label,
  control,
  errors,
  size,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Box sx={styles.flexColumnOneGapBox}>
          <FormLabel sx={styles.formLabel}>{label}</FormLabel>
          <TextAreaField
            {...field}
            {...props}
            label={label}
            error={errors?.[name]}
            helperText={errors?.[name]?.["message"] ?? ""}
            size={size}
          />
        </Box>
      )}
    />
  );
};

export default FormTextAreaField;
