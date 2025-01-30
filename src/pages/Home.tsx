import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import {
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  IconButton,
  Container,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import taskData, { Task } from '../assets/data/taskData';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in, otherwise redirect to login page
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) navigate('/login');
  }, [navigate]);

  // Retrieve logged-in user details
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;

  // Function to get stored tasks from localStorage or fallback to default task data
  const getStoredData = (): Task[] => {
    const savedData = localStorage.getItem('taskData');
    return savedData ? JSON.parse(savedData) : taskData;
  };

  // State variables for managing tasks, filters, and dialogs
  const [rows, setRows] = useState<Task[]>(getStoredData());
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('');
  const [newStatus, setNewStatus] = useState<'pending' | 'completed'>(
    'pending'
  );

  // Persist task data in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('taskData', JSON.stringify(rows));
  }, [rows]);

  // Function to handle status change of a task
  const handleStatusChange = (
    e: React.ChangeEvent<{ value: unknown }>,
    id: number
  ) => {
    const newStatus = e.target.value as 'pending' | 'completed';
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  // Function to delete a task by ID
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  // Function to process updates to task rows in the DataGrid
  const processRowUpdate = (
    updatedRow: GridRowModel,
    oldRow: GridRowModel
  ): GridRowModel => {
    if (!updatedRow.task.trim()) return oldRow; // Prevent empty task updates
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  // Filter tasks based on selected filter criteria
  const filteredRows = rows.filter(
    (row) => filter === 'all' || row.status === filter
  );

  // Function to create a new task and add it to the task list
  const handleCreateTask = () => {
    const newTaskObj: Task = {
      id: rows.length + 1,
      task: newTask,
      status: newStatus,
    };
    setRows((prevRows) => [...prevRows, newTaskObj]);
    setOpenDialog(false);
    setNewTask('');
    setNewStatus('pending');
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'task', headerName: 'Task Name', flex: 15, editable: true },
    {
      field: 'status',
      headerName: 'Status',
      flex: 3,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleStatusChange(e, params.id as number)}
          fullWidth
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          <IconButton
            color="error"
            onClick={() => handleDelete(params.id as number)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!user) return null; // Prevent rendering if user is not authenticated

  return (
    <Container
      sx={{
        backgroundColor: '#F8F9FC',
        height: '90vh',
        maxWidth: 'none !important',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box padding={4} minWidth="100%">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Grid item>
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              Hi, {user?.name}!
            </Typography>
          </Grid>
          <Grid item display="flex">
            {/* Dropdown to filter tasks by status */}
            <Select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as 'all' | 'pending' | 'completed')
              }
              sx={{ width: 200, mr: 2 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
            {/* Button to open dialog for creating new tasks */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Create New Task
            </Button>
          </Grid>
        </Grid>
        {/* DataGrid displaying tasks */}
        <div style={{ height: 450, width: '100%', marginTop: 20 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            processRowUpdate={processRowUpdate}
          />
        </div>
        {/* Dialog for adding a new task */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Select
              fullWidth
              value={newStatus}
              onChange={(e) =>
                setNewStatus(e.target.value as 'pending' | 'completed')
              }
              sx={{ marginTop: 2 }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateTask} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Home;
