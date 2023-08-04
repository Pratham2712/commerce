import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const FilterComponent = () => {
  const [price, setPrice] = useState(false);
  const [brand, setBrand] = useState(false);
  const [color, setColor] = useState(false);
  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Filter
      </Typography>
      <Box>
        <Box sx={{ marginBottom: "0.1rem" }}>
          <Accordion
            expanded={price === true}
            onChange={() => setPrice(!price)}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0rem 0.6rem",
              }}
            >
              {price ? (
                <RemoveIcon sx={{ fontSize: "1.4rem", paddingTop: "0.2rem" }} />
              ) : (
                <AddIcon
                  sx={{
                    fontSize: "1.4rem",
                    paddingTop: "0.2rem",
                  }}
                />
              )}
              <Typography sx={{ fontSize: "1.2rem", marginLeft: "0.3rem" }}>
                Price
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ marginTop: "-1rem", paddingLeft: "3rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Below Rs.500</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Rs.500-1000</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Rs.1001-1500</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box sx={{ marginBottom: "0.1rem" }}>
          <Accordion
            expanded={brand === true}
            onChange={() => setBrand(!brand)}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0rem 0.6rem",
              }}
            >
              {brand ? (
                <RemoveIcon sx={{ fontSize: "1.4rem", paddingTop: "0.2rem" }} />
              ) : (
                <AddIcon
                  sx={{
                    fontSize: "1.4rem",
                    paddingTop: "0.2rem",
                  }}
                />
              )}
              <Typography sx={{ fontSize: "1.2rem", marginLeft: "0.3rem" }}>
                Brand
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ marginTop: "-1rem", paddingLeft: "3rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Below Rs.500</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Rs.500-1000</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Rs.1001-1500</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box sx={{ marginBottom: "0.1rem" }}>
          <Accordion
            expanded={color === true}
            onChange={() => setColor(!color)}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0rem 0.6rem",
              }}
            >
              {color ? (
                <RemoveIcon sx={{ fontSize: "1.4rem", paddingTop: "0.2rem" }} />
              ) : (
                <AddIcon
                  sx={{
                    fontSize: "1.4rem",
                    paddingTop: "0.2rem",
                  }}
                />
              )}
              <Typography sx={{ fontSize: "1.2rem", marginLeft: "0.3rem" }}>
                Color
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ marginTop: "-1rem", paddingLeft: "3rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Below Rs.500</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Rs.500-1000</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <input type="checkbox" />
                <Typography>Rs.1001-1500</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* <Box>Brand</Box>
        <Box>Color</Box>
        <Box>Size & Fit</Box> */}
      </Box>
    </Box>
  );
};

export default FilterComponent;
