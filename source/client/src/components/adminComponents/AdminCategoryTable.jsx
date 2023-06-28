import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryThunk } from "../../redux/slices/adminSlice";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  tableCellClasses,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AdminCategoryTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  //schema
  const schema = yup.object().shape({
    subcategory: yup.string().required("Subcategory name is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValidating },
    trigger,
    watch,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subcategory: "",
    },
  });
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "black",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
      fontWeight: 500,
    },
  }));
  //useSelector
  const categoryData = useSelector(
    (state) => state.rootReducer.adminSlice.data.allCategory
  );

  const updateDone = useSelector(
    (state) => state.rootReducer.adminSlice.updateDone
  );
  //Functions
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const addSub = ({ subcategory }) => {
    console.log(subcategory);
  };
  //useEffect
  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  //   useEffect(() => {
  //     dispatch(getCategoryThunk());
  //   }, [updateDone]);
  console.log("called");
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "10rem",
          maxWidth: 1000,
          marginLeft: "0rem",
          maxHeight: "40rem",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            maxWidth: 1000,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Subcategory</StyledTableCell>
              <StyledTableCell align="center">Add Sub</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData?.map((row) => (
              <TableRow
                key={row?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.category}
                </TableCell>
                <TableCell align="center">{row?.type}</TableCell>

                <TableCell align="center">{row?.subcategory}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    sx={{ color: "primary" }}
                    onClick={() => {
                      setOpenDialog(!openDialog);
                      setId(row?._id);
                    }}
                  >
                    Add Sub
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" sx={{ color: "primary" }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle>Add subcategory</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="subcategory"
            label="Enter subcategory"
            name="subcategory"
            type="text"
            variant="standard"
            {...register("subcategory")}
            onBlur={handleBlur}
          />
          <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
            <ErrorMessage
              errors={errors}
              name="subcategory"
              render={({ message }) => (
                <span style={{ color: "maroon" }}>{message}</span>
              )}
            />
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "1rem" }}
            type="submit"
            onClick={handleSubmit(addSub)}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminCategoryTable;
