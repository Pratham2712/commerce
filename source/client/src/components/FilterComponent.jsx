import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { getColorThunk } from "../redux/slices/filterSlice";
import {
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
const FilterComponent = () => {
  const [price, setPrice] = useState(false);
  const [brand, setBrand] = useState(false);
  const [color, setColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();
  //useSelector
  const allcolor = useSelector(
    (state) => state.rootReducer.filterSlice.data.color
  );
  //function
  const getColor = () => {
    const data = {
      type: searchParams.get("type"),
      subCategory: searchParams.get("subcategory"),
    };
    if (!color) {
      dispatch(getColorThunk(data));
    }
  };

  const addFilter = (data) => {
    // const params = Object.fromEntries(searchParams);
    // if (params.color) {
    //   params.color = Array.isArray(params.color)
    //     ? params.color
    //     : [params.color];
    //   params.color.push(data);
    // } else {
    //   params.color = [data];
    // }
    // setSearchParams(createSearchParams(params));
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.append("color", data);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    console.log("called");
    console.log(Object.fromEntries(searchParams));
    console.log("search params", searchParams);
  }, [location.search]);

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
              onClick={() => {
                getColor();
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
            <AccordionDetails sx={{ marginTop: "-1rem", padding: "1rem" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {allcolor?.map((ele) => {
                  return (
                    ele?.color && (
                      <div
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                          background: ele?.color,
                          borderRadius: "50%",
                          border: "solid 0.1px black",
                          marginRight: "0.1rem",
                          marginBottom: "0.5rem",
                          cursor: "pointer",
                        }}
                        onClick={() => addFilter(ele?.color)}
                      ></div>
                    )
                  );
                })}
              </Box>
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
