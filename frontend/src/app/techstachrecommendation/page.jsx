"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography, Button, IconButton, Tooltip, TextField } from "@mui/material";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import database from "../../../public/assets/images/database.svg";
import frontendIcon from "../../../public/assets/images/frontendicon.svg";
import backendIcon from "../../../public/assets/images/backendicon.svg";
import deploymentIcon from "../../../public/assets/images/deployment.svg";
import VerifiedIcon from "@mui/icons-material/Verified";
import Loader from "@/components/loader/loading";
import { toast } from "react-toastify";

export default function StackRecommendation() {
  const [techStack, setTechStack] = useState(null);
  const [editing, setEditing] = useState({ category: null, tech: null });
  const [newTechKey, setNewTechKey] = useState("");
  const [newTechValue, setNewTechValue] = useState("");

  useEffect(() => {
    const fetchTechStack = async () => {
      const token = localStorage.getItem("access_token");
      const project_id = localStorage.getItem("project_id");
      const preferences = JSON.parse(localStorage.getItem("preferences"));
    
      const body = {
        project_id: project_id,
        preferences: preferences,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tech_stack`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.status === "success") {
        setTechStack(data.techstack);
      }
    };

    fetchTechStack();
  }, []);

  const handleEditChange = (category, tech, value) => {
    const updatedTechStack = { ...techStack };
    updatedTechStack[category][tech] = value;
    setTechStack(updatedTechStack);
  };

  const handleEditSave = (event, category, tech) => {
    if (event.key === 'Enter') {
      setEditing({ category: null, tech: null });
    }
  };

  const handleAddTech = (category) => {
    setEditing({ category, tech: "new" });
  };

  const handleSaveNewTech = (category) => {
    if (newTechKey.trim() === "") {
      toast.error("Please enter a technology name.");
      return;
    }
    if (newTechValue.trim() === "") {
      toast.error("Please enter a technology description.");
      return;
    }

    const updatedTechStack = { ...techStack };
    updatedTechStack[category][newTechKey] = newTechValue;
    setTechStack(updatedTechStack);
    setNewTechKey("");
    setNewTechValue("");
    setEditing({ category: null, tech: null });
  };

  const handleDeleteTech = (category, tech) => {
    const updatedTechStack = { ...techStack };
    delete updatedTechStack[category][tech];
    setTechStack(updatedTechStack);
  };

  const handleCancelAddTech = () => {
    setEditing({ category: null, tech: null });
    setNewTechKey("");
    setNewTechValue("");
  };

  const handleDeleteCategory = (category) => {
    const updatedTechStack = { ...techStack };
    delete updatedTechStack[category];
    setTechStack(updatedTechStack);
  };

  const nextPage = async () => {
    const token = localStorage.getItem("access_token");
    const project_id = localStorage.getItem("project_id");
    const body = {
      "project_id": project_id,
      "recommendation_data": techStack
    };
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update_tech_stack`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Tech Stack updated successfully!");
      } else {
        toast.error("Failed to update Tech Stack.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the Tech Stack.");
      console.error("Error:", error);
    }
  };

  return (
    <Box className="flex">
      <Sidebar />
      <Box className="h-screen flex-1 pl-10 pr-7 max-md:pr-4 max-md:pl-4 pb-6 pt-0">
        <Header />
        <Box className="container flex flex-col pb-10">
          <Typography
            component="h2"
            className="text-xl max-md:text-xl pb-4 max-md:pb-4 font-bold text-black max-md:max-w-full"
          >
            Tech Stack Recommendations
          </Typography>

          {techStack ? (
            <Box className="h-[calc(100vh-200px)] overflow-auto">
              <Box className="max-w-[760px] w-full pb-5">
                <Box className="flex gap-4 flex-col">
                  {Object.entries(techStack).map(([category, recommendations], index) => (
                    <Box key={index} className="flex gap-5 max-md:gap-1">
                      <Box className="flex flex-auto gap-3 justify-between p-4 max-md:p-2 bg-white rounded-lg border-2 border-solid shadow-[0px_10px_50px_#E8F1FF] border-grey max-md:flex-wrap max-md:max-w-full">
                        <Box className="flex flex-col text-base black-200 w-full">
                          <Box className="flex gap-2 self-start items-center text-base text-black font-bold">
                            <Image
                              loading="lazy"
                              src={
                                category === "Database" ? database :
                                category === "Frontend" ? frontendIcon :
                                category === "Backend" ? backendIcon :
                                deploymentIcon
                              }
                              width="20"
                              height="26"
                              alt={`${category} Icon`}
                              className="shrink-0 aspect-square"
                            />
                            <Box className="flex-auto">{category}</Box>
                          </Box>
                          <Box className="userGroupList flex flex-col gap-2 mt-4 w-full text-sm font-medium">
                            {Object.entries(recommendations).map(([tech, description], techIndex) => (
                              <Box key={techIndex} className="flex gap-2.5 max-md:gap-1.5 pr-6 relative min-h-[30px]">
                                <VerifiedIcon className="text-primary text-lg" />
                                <Box className="flex-auto max-md:text-sm">
                                  {editing.category === category && editing.tech === tech ? (
                                    <TextField
                                      value={description}
                                      onChange={(e) => handleEditChange(category, tech, e.target.value)}
                                      onBlur={() => setEditing({ category: null, tech: null })}
                                      onKeyDown={(e) => handleEditSave(e, category, tech)}
                                      fullWidth
                                      autoFocus
                                    />
                                  ) : (
                                    <Box onClick={() => setEditing({ category, tech })}>
                                      {tech} - {description}
                                    </Box>
                                  )}
                                </Box>
                                <Tooltip title="Delete">
                                  <Button
                                    aria-label="delete"
                                    className="deleteUser absolute right-0 w-7 h-7 max-md:w-6 max-md:h-6 min-w-1 hover:shadow-2xl"
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDeleteTech(category, tech)}
                                  >
                                    <DeleteOutlineOutlinedIcon size="small" className="text-md" />
                                  </Button>
                                </Tooltip>
                              </Box>
                            ))}
                          </Box>
                          {editing.category === category && editing.tech === "new" && (
                            <Box className="flex gap-2.5 max-md:gap-1.5 pr-6 relative min-h-[30px]">
                              <TextField
                                placeholder="Enter technology name"
                                value={newTechKey}
                                onChange={(e) => setNewTechKey(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    if (newTechKey.trim() === "") {
                                      setEditing({ category: null, tech: null });
                                    } else if (newTechValue.trim() === "") {
                                      toast.error("Please enter a technology description.");
                                    } else {
                                      setNewTechValue("");
                                      handleSaveNewTech(category);
                                    }
                                  }
                                }}
                              />
                              <TextField
                                placeholder="Enter technology description"
                                value={newTechValue}
                                onChange={(e) => setNewTechValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    if (newTechKey.trim() === "") {
                                      setEditing({ category: null, tech: null });
                                    } else if (newTechValue.trim() === "") {
                                      toast.error("Please enter a technology description.");
                                    } else {
                                      setNewTechKey("");
                                      handleSaveNewTech(category);
                                    }
                                  }
                                }}
                              />
                              <Tooltip title="Save">
                                <Button
                                  aria-label="save"
                                  onClick={() => handleSaveNewTech(category)}
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                >
                                  <CheckCircleIcon size="small" className="text-md" />
                                </Button>
                              </Tooltip>
                              <Tooltip title="Cancel">
                                <Button
                                  aria-label="cancel"
                                  onClick={handleCancelAddTech}
                                  variant="contained"
                                  color="error"
                                  size="small"
                                >
                                  <CancelIcon size="small" className="text-md" />
                                </Button>
                              </Tooltip>
                            </Box>
                          )}
                          {!editing.category && (
                            <Button
                              variant="contained"
                              className="justify-center items-center mt-1 bg-grey-100 rounded h-[24px] w-[24px] text-black min-w-[10px] shadow-none hover:bg-grey"
                              onClick={() => handleAddTech(category)}
                            >
                              <AddOutlinedIcon className="text-base" />
                            </Button>
                          )}
                        </Box>
                      </Box>
                      <Box className="w-[70px] max-md:w-[30px] h-full mt-5">
                        <Box className="flex gap-3 flex-col">
                          <IconButton aria-label="cancel"  onClick={() => handleDeleteCategory(category)}>
                            <CancelIcon className="text-[#F06262] text-4xl max-md:text-2xl" />
                          </IconButton>
                          <IconButton aria-label="check circle">
                            <CheckCircleIcon className="text-green text-4xl max-md:text-2xl" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box><Loader/></Box>
          )}
          {techStack && (
            <Box className="bg-white p-3">
              <Button
                className="text-lg normal-case text-white border-0 py-2 px-3 bg-primary hover:text-white shadow-custom w-full h-10"
                variant="contained"
                size="medium"
                onClick={nextPage}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
