import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const isEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (dayjs.isDayjs(a) && dayjs.isDayjs(b)) {
    return a.isSame(b);
  }

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
};
export const getInitialFormValues = (
  taskDialogDetails: TaskDialogProps["taskDialogDetails"],
) => {
  let dueDateValue = null;
  if (
    taskDialogDetails.openFor === "edit" &&
    taskDialogDetails.data &&
    taskDialogDetails.data?.dueDate
  ) {
    const isoParsed = dayjs(taskDialogDetails.data.dueDate);
    if (isoParsed.isValid()) {
      dueDateValue = isoParsed;
    } else {
      const customParsed = dayjs(taskDialogDetails.data.dueDate, "DD-MM-YYYY");
      dueDateValue = customParsed.isValid() ? customParsed : null;
    }
  }

  return {
    taskTitle:
      taskDialogDetails.openFor === "edit" && taskDialogDetails.data
        ? taskDialogDetails.data?.title
        : "",
    description:
      taskDialogDetails.openFor === "edit" && taskDialogDetails.data
        ? taskDialogDetails.data?.description
        : "",
    dueDate: dueDateValue,
    status:
      taskDialogDetails.openFor === "edit" && taskDialogDetails.data
        ? taskDialogDetails.data?.status
        : "",
  };
};
