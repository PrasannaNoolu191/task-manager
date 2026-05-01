import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "../styles/styles";
import { Box, FormLabel } from "@mui/material";

const FormDatePickerField: React.FC<IFormInputFields> = ({
  name,
  label,
  control,
  errors,
  size,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box sx={styles.flexColumnOneGapBox}>
          <FormLabel sx={styles.formLabel}>{label}</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: !!errors.dueDate,
                  helperText: errors.dueDate?.message,
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      )}
    />
  );
};

export default FormDatePickerField;
