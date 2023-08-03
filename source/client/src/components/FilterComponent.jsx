import { Box, Typography } from "@mui/material";
import React from "react";

const FilterComponent = () => {
  return (
    <Box>
      <Typography variant="h5">Filter</Typography>
      <Box>Price</Box>
      <Box>Brand</Box>
      <Box>Color</Box>
      <Box>Size & Fit</Box>
    </Box>
  );
};

export default FilterComponent;
