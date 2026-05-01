interface taskData {
  id: number;
  description: string;
  title: string;
  dueDate: string;
  status: string;
}
interface TaskDialogProps {
  taskDialogDetails: {
    open: boolean;
    openFor: string;
    data: taskData | null;
  };
  setTaskDialogDetails: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      openFor: string;
      data: taskData | null;
    }>
  >;
  setTasksList: React.Dispatch<React.SetStateAction<taskData[]>>;
}
interface DeleteDialogProps {
  deleteDialogDetails: {
    open: boolean;
    data: taskData | null;
  };
  setDeleteDialogDetails: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      data: taskData | null;
    }>
  >;
  setTasksList: React.Dispatch<React.SetStateAction<taskData[]>>;
}
type TaskFormData = {
  taskTitle: string;
  description?: string;
  dueDate: any;
  status: string;
};
interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate: string | null;
  status: string;
}
