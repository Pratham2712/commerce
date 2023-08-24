import { Box, LinearProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh", position: "absolute" }}>
      <LinearProgress
        color="secondary"
        sx={{ top: "30%", zIndex: "100", width: "30%", left: "25%" }}
      />
    </Box>
  );
};

export default Loading;
