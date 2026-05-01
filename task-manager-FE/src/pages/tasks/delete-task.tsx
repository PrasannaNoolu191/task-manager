import { Danger } from "iconsax-reactjs";
import ConfirmDialog from "../../utils/confirm-dialog";
import { deleteTask } from "../../api/tasks";
import { useToast } from "../../context/toast-context";

const DeleteDialog = ({
  deleteDialogDetails,
  setDeleteDialogDetails,
  setTasksList,
}: DeleteDialogProps) => {
  const { showToast } = useToast();
  const handleClose = () => setDeleteDialogDetails({ open: false, data: null });
  const handleDelete = async () => {
    try {
      let res;
      if (deleteDialogDetails.data) {
        res = await deleteTask(deleteDialogDetails.data.id);
      }
      if (res.success) {
        setTasksList(res.data);
        showToast(res?.message, "success");
        handleClose();
      }
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Task creation failed",
        "error",
      );
    }
  };

  return (
    <ConfirmDialog
      open={deleteDialogDetails.open}
      title="Confirm Delete"
      message={
        "Are you sure you want to delete this task?\nThis action cannot be undone."
      }
      icon={<Danger variant="Bold" color="#d32f2f" />}
      confirmText="Delete"
      confirmColor="error"
      cancelText="Cancel"
      onConfirm={handleDelete}
      onCancel={handleClose}
    />
  );
};

export default DeleteDialog;
