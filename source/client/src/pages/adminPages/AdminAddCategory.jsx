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

const AdminAddCategory = () => {
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
      type: "Male",
    },
  });
  //Function
  const onSubmit = () => {};
  const handleBlur = async (e) => {
    await trigger(e.target.name);
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
        <TextField
          margin="dense"
          id="category"
          label="Category name"
          name="category"
          type="text"
          variant="standard"
          {...register("category")}
          onBlur={handleBlur}
        >
          <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
            <ErrorMessage
              errors={errors}
              name="category"
              render={({ message }) => (
                <span style={{ color: "maroon" }}>{message}</span>
              )}
            />
          </Typography>
        </TextField>
        <FormControl sx={{ marginTop: "1rem" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">TYPE</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="female"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="kids" control={<Radio />} label="Kids" />
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
