import { Box, Button, Dialog, Divider, Typography } from "@mui/material";
import styles from "../../styles/styles";
import { Clear } from "@mui/icons-material";
import FormInputField from "../../hooks/form-input-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskDetailsSchema } from "../../utils/validations";
import FormTextAreaField from "../../hooks/form-text-area";
import FormDatePickerField from "../../hooks/form-date-picker";
import FormSelectField from "../../hooks/form-select-field";
import dayjs from "dayjs";
import { selectFieldOptions } from "../../utils/constants";
import { createTask, updateTask } from "../../api/tasks";
import { useToast } from "../../context/toast-context";
import { getInitialFormValues, isEqual } from "../../utils/tasks-util";
import { useMemo } from "react";

const TaskDialog = ({
  taskDialogDetails,
  setTaskDialogDetails,
  setTasksList,
}: TaskDialogProps) => {
  const { showToast } = useToast();
  const initialFormValues = useMemo(
    () => getInitialFormValues(taskDialogDetails),
    [taskDialogDetails],
  );
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: initialFormValues,
    resolver: zodResolver(taskDetailsSchema),
    mode: "onChange",
  });
  const watchedValues = watch();
  const isChanged = useMemo(
    () =>
      taskDialogDetails.openFor === "edit"
        ? !isEqual(initialFormValues, watchedValues)
        : true,
    [initialFormValues, watchedValues, taskDialogDetails.openFor],
  );
  const handleClose = () => {
    setTaskDialogDetails({ open: false, data: null, openFor: "" });
  };
  const onSubmit = async (data: TaskFormData) => {
    const payload = {
      title: data.taskTitle,
      description: data.description,
      dueDate: data.dueDate ? dayjs(data.dueDate).format("YYYY-MM-DD") : null,
      status: data.status,
    };
    try {
      let res;
      if (taskDialogDetails.openFor === "edit" && taskDialogDetails.data) {
        res = await updateTask(taskDialogDetails.data.id, payload);
      } else {
        res = await createTask(payload);
      }
      if (res.success) {
        setTasksList(res.data);
        showToast(res?.message, "success");
        setTaskDialogDetails({ open: false, data: null, openFor: "" });
      }
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Task creation failed",
        "error",
      );
    }
  };

  return (
    <Dialog
      open={taskDialogDetails.open}
      slotProps={{ paper: { sx: { ...styles.dialogStyles } } }}>
      <Box>
        <Box sx={styles.flexSpaceBetweenBox} padding={2}>
          <Typography sx={styles.cardHeader}>
            {taskDialogDetails.openFor === "edit" ? "Edit Task" : "Add Task"}
          </Typography>
          <Clear onClick={handleClose} sx={{ cursor: "pointer" }} />
        </Box>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box
        sx={{
          maxHeight: "85vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box p={2} sx={styles.flexColumnOneGapBox}>
            <FormInputField
              name="taskTitle"
              label="Task Title"
              placeholder="Enter Task Title"
              control={control}
              errors={errors}
              // size="small"
            />
            <FormTextAreaField
              name="description"
              label="Description"
              placeholder="Enter Task Description"
              control={control}
              errors={errors}
            />
            <FormDatePickerField
              name="dueDate"
              label="Due Date"
              control={control}
              errors={errors}
            />
            <FormSelectField
              name="status"
              label="Status"
              control={control}
              options={selectFieldOptions}
              size="medium"
            />
          </Box>
          <Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <Box p={"15px"}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.2, ...styles.button }}
              disabled={!isValid || !isChanged}>
              {taskDialogDetails.openFor === "edit" ? "Save" : "Add Task"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
export default TaskDialog;
