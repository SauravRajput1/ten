"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import SearchIcon from "@mui/icons-material/Search";
import SortProject from "./sortby";
import ProjectList from "./projectlisting";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateProject() {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [planningData, setPlanningData] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getQueryParams = (search) => {
      return search
        ? JSON.parse(
            '{"' +
              decodeURIComponent(search)
                .replace(/&/g, '","')
                .replace(/=/g, '":"')
                .replace(/\+/g, " ") +
              '"}'
          )
        : {};
    };
    const params = getQueryParams(window.location.search.substring(1));

    if (params.access_token) {
      localStorage.setItem("access_token", params.access_token);
      localStorage.setItem(
        "user_info",
        JSON.stringify({
          id: params.id,
          email: params.email,
          name: params.name,
          _id: params._id,
        })
      );
    } else {
      console.error("No access token found in query parameters.");
    }
    const fetchProjects = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found.");
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/get_previous_project`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.projects.length > 0) {
          setProjects(response.data.projects);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setErrorMessage("Error fetching project data.");
      }
    };

    fetchProjects();
  }, []);

  const planningSubmit = () => {
    if (!planningData.trim()) {
      toast.error("Please fill raw information for the planning");
      return;
    }
    router.push("/refinement");
    localStorage.setItem("planningData",planningData )
  };

  return (
    <Box className="flex">
      <Sidebar />
      <Box className="h-screen flex-1 pl-10 pr-7 pb-6 pt-0">
        <Header />

        <Box className="container flex flex-col pb-10">
          <Typography
            component="h2"
            className="text-xl max-md:text-xl pb-4 max-md:pb-4 font-bold text-black max-md:max-w-full"
          >
            Create Projects
          </Typography>
          <Box className="flex gap-1 p-1 font-bold bg-white rounded border-2 border-solid border-grey max-md:flex-wrap">
            <Box className="flex-auto my-auto text-xl max-md:max-w-full">
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                className="border-0 focus:border-0 hover:border-0 hover:outline-0 outline-0 focus:outline-0 w-full text-grey-200 text-base"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0px",
                    "& fieldset": {
                      border: "none",
                    },
                    "& input": {
                      padding: "10px",
                    },
                  },
                }}
                placeholder="Raw data information for project planning recommendation..."
                value={planningData}
                onChange={(e) => setPlanningData(e.target.value)}
              />
            </Box>
            <Button
              onClick={planningSubmit}
              variant="contained"
              size="medium"
              className="normal-case justify-center text-base text-white bg-green rounded max-md:pr-5 hover:bg-primary shadow-none max-md:w-full"
            >
              Start Planning
            </Button>
          </Box>
          <Box className="mt-8">
            <Typography
              component="h2"
              className="text-xl max-md:text-xl pb-4 max-md:pb-4 font-bold text-black max-md:max-w-full"
            >
              Previous Project
            </Typography>
            <Box className="flex justify-between gap-4">
              <Box className="searchHeader w-[50%]">
                <TextField
                  sx={{
                    "&.MuiInputBase-input": {
                      fontSize: "14px",
                    },
                  }}
                  className="bg-white border-none text-sm rounded-lg h-[45px] w-128 max-md:w-full max-md:max-w-full max-md:text-xs  max-w-[50%]"
                  id="search_header"
                  label=""
                  placeholder="Search Chat Room"
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box className="filterbtn">
                <SortProject />
              </Box>
            </Box>
          </Box>
          <Box className="h-[calc(100vh-310px)] overflow-auto">
            {errorMessage ? (
              <Box className="flex justify-center items-center h-full">
                <Typography variant="h6" color="error">
                  {errorMessage}
                </Typography>
              </Box>
            ) : (
              <Box className="pt-5 pl-1 pr-1">
                <Box className="grid grid-cols-3 gap-5 max-md:grid-cols-1 ">
                  <ProjectList projects={projects} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
