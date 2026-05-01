import {
  Box,
  Button,
  Card,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "../../styles/styles";
import { Add, Edit2, Trash } from "iconsax-reactjs";
import SearchField from "../../components/UI/search-field";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomChip from "../../components/UI/status-chip";
import FormSelectField from "../../hooks/form-select-field";
import { Controller, useForm } from "react-hook-form";
import TaskDialog from "./add-task";
import DeleteDialog from "./delete-task";
import { getAllTasks } from "../../api/tasks";
import { statusOptions } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
const Columns = ["Task", "Due Date", "Status", "Actions"];

const menuOptions = [
  { label: "Edit", value: "edit", icon: <Edit2 style={styles.iconStyles} /> },
  {
    label: "Delete",
    value: "delete",
    icon: <Trash style={styles.iconStyles} />,
  },
];

const Tasks = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuTaskId, setMenuTaskId] = useState<number | null>(null);
  const [tasksList, setTasksList] = useState<taskData[]>([]);
  const [taskDialogDetails, setTaskDialogDetails] = useState<{
    open: boolean;
    openFor: string;
    data: taskData | null;
  }>({
    open: false,
    openFor: "",
    data: null,
  });
  const [deleteDialogDetails, setDeleteDialogDetails] = useState<{
    open: boolean;
    data: taskData | null;
  }>({
    open: false,
    data: null,
  });
  const [selectedActions, setSelectedActions] = useState<{
    [key: number]: string;
  }>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchParams] = useSearchParams();
  const statusFromQuery = searchParams.get("status") || "All";

  const { control, watch } = useForm({
    defaultValues: {
      status: statusFromQuery,
      search: "",
    },
  });
  const statusFilter = watch("status");
  const searchFilter = watch("search").toLowerCase();

  // Filter tasks based on status and search
  const filteredTasks =
    tasksList?.length > 0
      ? tasksList?.filter((task) => {
          const matchesStatus =
            statusFilter === "All" || task.status === statusFilter;
          const matchesSearch =
            task.title.toLowerCase().includes(searchFilter) ||
            task.dueDate.toLowerCase().includes(searchFilter) ||
            task.status.toLowerCase().includes(searchFilter);
          return matchesStatus && matchesSearch;
        })
      : [];
  const paginatedTasks = filteredTasks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    taskId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuTaskId(taskId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuTaskId(null);
  };

  const handleMenuItemClick = (
    taskId: number,
    action: string,
    task: taskData,
  ) => {
    setSelectedActions((prev) => ({ ...prev, [taskId]: action }));
    if (action === "edit") {
      handleTaskDialogOpen(task, "edit");
    } else if (action === "delete") {
      setDeleteDialogDetails({ open: true, data: task });
    }
    handleCloseMenu();
  };

  const getSelectedAction = (taskId: number) => {
    return menuOptions.find((opt) => opt.value === selectedActions[taskId]);
  };
  const handleTaskDialogOpen = (taskData: taskData | null, openFor: string) => {
    setTaskDialogDetails({ open: true, data: taskData, openFor });
  };
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getAllTasks();
      setTasksList(res?.data);
    };
    fetchTasks();
  }, []);
  return (
    <>
      <Card sx={{ borderRadius: 2 }}>
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}>
          <Typography sx={styles.cardHeader}>Tasks</Typography>
          <Box sx={styles.flexRowOneGapBox}>
            <Box>
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <SearchField
                    {...field}
                    placeholder="Search..."
                    size="small"
                  />
                )}
              />
            </Box>
            <Box>
              <FormSelectField
                name="status"
                // label="Status"
                control={control}
                options={statusOptions}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={
                  <Add style={{ margin: 0, height: "20px", width: "20px" }} />
                }
                sx={{
                  ...styles.smallButton,
                  padding: "6px",
                  gap: "2px",
                  "& .MuiButton-startIcon": {
                    margin: 0,
                  },
                }}
                onClick={() => handleTaskDialogOpen(null, "add")}>
                Add
              </Button>
            </Box>
          </Box>
        </Box>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              }}>
              {Columns.map((column) => (
                <TableCell
                  key={column}
                  sx={{
                    ...styles.tableHeaderTextStyles,
                    ...(column === "Actions" && {
                      width: 150,
                      minWidth: 150,
                      maxWidth: 150,
                    }),
                  }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTasks?.map((task) => {
              const selectedAction = getSelectedAction(task.id);
              return (
                <TableRow key={task.id}>
                  <TableCell sx={styles.tableBodyTextStyles}>
                    {task.title}
                  </TableCell>
                  <TableCell sx={styles.tableBodyTextStyles}>
                    {task.dueDate}
                  </TableCell>
                  <TableCell>
                    <CustomChip status={task.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ textTransform: "none" }}
                      size="small"
                      variant="outlined"
                      endIcon={<MoreVertIcon />}
                      onClick={(e) => handleOpenMenu(e, task.id)}>
                      {selectedAction?.label ?? "Edit"}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={menuTaskId === task.id && Boolean(anchorEl)}
                      onClose={handleCloseMenu}>
                      {menuOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          selected={selectedActions[task.id] === option.value}
                          onClick={() =>
                            handleMenuItemClick(task.id, option.value, task)
                          }
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}>
                          {option.icon}
                          {option.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredTasks.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Card>
      {taskDialogDetails.open && (
        <TaskDialog
          taskDialogDetails={taskDialogDetails}
          setTaskDialogDetails={setTaskDialogDetails}
          setTasksList={setTasksList}
        />
      )}
      {deleteDialogDetails.open && (
        <DeleteDialog
          deleteDialogDetails={deleteDialogDetails}
          setDeleteDialogDetails={setDeleteDialogDetails}
          setTasksList={setTasksList}
        />
      )}
    </>
  );
};
export default Tasks;
