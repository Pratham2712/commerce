import React from "react";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addCategoryThunk } from "../../redux/slices/adminSlice";

const AdminAddCategory = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    category: yup.string().required("Category name is required"),
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
      category: "",
      type: "",
    },
  });
  //Function
  const onSubmit = ({ category, type }) => {
    const data = {
      category: category,
      type: type,
    };
    dispatch(addCategoryThunk(data));
  };
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const handleUsernameChange = (event, name) => {
    setValue(name, event.target.value); // Update the value of the username field
    trigger(name); // Trigger validation when the username value changes
  };

  return (
    <Box
      sx={{
        marginLeft: "23rem",
        paddingTop: "3rem",
      }}
    >
      <div
        style={{
          padding: "0rem 0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box>
          <TextField
            margin="dense"
            id="category"
            label="Category name"
            name="category"
            type="text"
            variant="standard"
            {...register("category")}
            onBlur={handleBlur}
          ></TextField>
          <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
            <ErrorMessage
              errors={errors}
              name="category"
              render={({ message }) => (
                <span style={{ color: "maroon" }}>{message}</span>
              )}
            />
          </Typography>
        </Box>
        <FormControl sx={{ marginTop: "1rem" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">TYPE</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="type"
            defaultValue="male"
            {...register("type")}
            onBlur={handleBlur}
            onChange={(e) => handleUsernameChange(e, "type")}
          >
            <FormControlLabel
              name="type"
              value="male"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              name="type"
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              name="type"
              value="kids"
              control={<Radio />}
              label="Kids"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "1rem" }}
          onClick={handleSubmit(onSubmit)}
        >
          {" "}
          Add Category
        </Button>
      </div>
    </Box>
  );
};

export default AdminAddCategory;
