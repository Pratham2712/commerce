import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubThunk,
  deleteCatThunk,
  deleteSubThunk,
  getCategoryThunk,
} from "../../redux/slices/adminSlice";
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
  Chip,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { SUCCESS } from "../../constants/constants";

const AdminCategoryTable = () => {
  const [openDialog, setOpenDialog] = useState({ key: -1, value: false });
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

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
  const addSub = (id) => {
    const subcategory = watch("subcategory");
    const data = {
      subId: id,
      subcategory: subcategory,
    };
    dispatch(addSubThunk(data)).then((data) => {
      if (data.payload.type === SUCCESS) {
        setOpenDialog(false);
        setValue("subcategory", "");
      }
    });
  };
  const handleDeleteSub = (row, ele) => {
    const data = {
      subId: row?._id,
      subCategory: ele,
    };
    dispatch(deleteSubThunk(data));
  };
  const deleteCategory = (id) => {
    const data = {
      catId: id,
    };
    dispatch(deleteCatThunk(data));
  };
  // const setParam = (id) => {
  //   const params = Object.fromEntries(searchParams);
  //   params["id"] = id;
  //   setSearchParams(createSearchParams(params));
  // };
  //useEffect
  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, [updateDone]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "3rem",
          maxWidth: 1000,
          marginLeft: "0rem",
          //maxHeight: "40rem",
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
            {categoryData?.map((row, idx) => (
              <TableRow
                key={row?._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "70px",
                }}
              >
                <TableCell component="th" scope="row">
                  {row?.category}
                </TableCell>
                <TableCell align="center">{row?.type}</TableCell>

                <TableCell
                  align="center"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    //maxHeight: 50,
                    height: "inherit",
                    overflowY: "scroll",
                    alignItems: "center",
                  }}
                >
                  {row?.subCategory.map((ele) => {
                    return (
                      <Chip
                        label={ele}
                        sx={{
                          marginTop: "0.1rem",
                          padding: "1rem 0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          //maxWidth: "10rem",
                        }}
                        onDelete={() => handleDeleteSub(row, ele)}
                      />
                    );
                  })}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    sx={{ color: "primary" }}
                    onClick={() => {
                      setOpenDialog({ key: idx, value: true });
                    }}
                  >
                    Add Sub
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    sx={{ color: "primary" }}
                    onClick={() => deleteCategory(row?._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <Dialog
              open={openDialog.value}
              onClose={() => {
                setOpenDialog({ key: -1, value: false });
                setValue("subcategory", "");
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
                  onClick={() => addSub(categoryData[openDialog.key]?._id)}
                >
                  Add
                </Button>
              </DialogContent>
            </Dialog>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminCategoryTable;
