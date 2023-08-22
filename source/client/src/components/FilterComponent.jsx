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
import { getBrandThunk, getColorThunk } from "../redux/slices/filterSlice";
import {
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { getProductThunk } from "../redux/slices/homeSlice";
const FilterComponent = () => {
  const [price, setPrice] = useState(false);
  const [brand, setBrand] = useState(false);
  const [color, setColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const priceObj = {
    "Below Rs.500": "0-500",
    "Rs.500-1000": "500-1000",
    "Rs.1001-1500": "1001-1500",
  };

  //useSelector
  const allcolor = useSelector(
    (state) => state.rootReducer.filterSlice.data.color
  );
  const allbrand = useSelector(
    (state) => state.rootReducer.filterSlice.data.brand
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
  const getBrand = () => {
    const data = {
      type: searchParams.get("type"),
      subCategory: searchParams.get("subcategory"),
    };
    if (!brand) {
      dispatch(getBrandThunk(data));
    }
  };

  const addFilter = (str, data) => {
    // if (!searchParams.getAll(str).includes(data)) {
    //   const newSearchParams = new URLSearchParams(location.search);
    //   newSearchParams.append(str, data);
    //   setSearchParams(newSearchParams);
    // }
    //console.log(searchParams.get(str)?.split(",").includes(data));
    if (!searchParams.get(str)?.split(",")?.includes(data)) {
      if (searchParams.get(str)) {
        const params = Object.fromEntries(searchParams);
        params[str] = searchParams.get(str) + "," + data;
        setSearchParams(createSearchParams(params));
      } else {
        const params = Object.fromEntries(searchParams);
        params[str] = data;
        setSearchParams(createSearchParams(params));
      }
    } else {
      const updatedValues = searchParams
        .get(str)
        .split(",")
        .filter((value) => value !== data);
      searchParams.set(str, updatedValues);
      setSearchParams(createSearchParams(searchParams));
    }
  };

  const addPriceFilter = (data) => {
    if (searchParams.get("price") == data) {
      searchParams.delete("price");
      setSearchParams(createSearchParams(searchParams));
    } else {
      const params = Object.fromEntries(searchParams);
      params["price"] = data;
      setSearchParams(createSearchParams(params));
    }
  };

  useEffect(() => {
    const data = {
      page: searchParams.get("page") - 1,
      pagesize: searchParams.get("pagesize"),
      type: searchParams.get("type"),
      sub: searchParams.get("subcategory"),
    };
    if (searchParams.get("color")) {
      data.color = searchParams.get("color").split(",");
    }
    if (searchParams.get("brand")) {
      data.brand = searchParams.get("brand").split(",");
    }
    if (searchParams.get("price")) {
      data.price = searchParams.get("price");
    }
    // if (searchParams.getAll("brand").length > 0) {
    //   if (Array.isArray(searchParams.getAll("brand"))) {
    //     data.brand = searchParams.getAll("brand");
    //   } else {
    //     data.brand = [searchParams.getAll("brand")];
    //   }
    // }
    dispatch(getProductThunk(data));
  }, [location.search]);

  const removeParam = () => {
    //const params = Object.fromEntries(searchParams);
    // params["color"] = "";
    // params["brand"] = "";
    // params["price"] = "";
    searchParams.delete("color");
    searchParams.delete("price");
    searchParams.delete("brand");
    searchParams.delete("price");
    // const newSearchParams = new URLSearchParams(location.search);
    // newSearchParams.delete("color");
    setSearchParams(createSearchParams(searchParams));
  };
  useEffect(() => {
    setColor(false);
    setPrice(false);
    setBrand(false);
    const updateBrand = searchParams
      .get("brand")
      ?.split(",")
      ?.filter((value) => value.trim() !== "");
    const updatePrice = searchParams
      .get("price")
      ?.split(",")
      ?.filter((value) => value.trim() !== "");
    const updateColor = searchParams
      .get("color")
      ?.split(",")
      ?.filter((value) => value.trim() !== "");
    searchParams.set("brand", updateBrand);
    searchParams.set("color", updateColor);
    searchParams.set("price", updatePrice);
    setSearchParams(createSearchParams(searchParams));
    removeParam();
  }, [searchParams.get("type"), searchParams.get("subcategory")]);

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
              {Object.keys(priceObj).map((elm) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.2rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="price-filter1"
                      style={{ cursor: "pointer" }}
                      checked={searchParams.get("price") == priceObj[elm]}
                    />
                    <label
                      for="price-filter1"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        addPriceFilter(priceObj[elm]);
                      }}
                    >
                      {elm}
                    </label>
                  </div>
                );
              })}
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
              onClick={() => getBrand()}
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
            <AccordionDetails sx={{ marginTop: "-1rem", padding: "0.5rem" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {allbrand?.map((ele) => {
                  return (
                    ele && (
                      <div
                        style={{
                          display: "flex",
                          cursor: "pointer",
                        }}
                        onClick={() => addFilter("brand", ele)}
                      >
                        <input
                          type="checkbox"
                          checked={searchParams
                            .get("brand")
                            ?.split(",")
                            ?.includes(ele)}
                        />
                        <label style={{ cursor: "pointer" }}>{ele}</label>
                      </div>
                    )
                  );
                })}
              </Box>
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
                    ele && (
                      <div
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                          background: `${ele}`,
                          borderRadius: "50%",
                          border: "solid 0.1px black",
                          marginRight: "0.1rem",
                          marginBottom: "0.5rem",
                          cursor: "pointer",
                          opacity: searchParams
                            .get("color")
                            ?.split(",")
                            ?.includes(ele)
                            ? 0.5
                            : 1,
                        }}
                        onClick={() => addFilter("color", ele)}
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
