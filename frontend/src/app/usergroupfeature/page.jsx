"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, TextField } from "@mui/material";
import Image from "next/image";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FeatureIcon from "../../../public/assets/images/featureIcon.svg";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/loading";

export default function UserGroupFeature() {
  const [features, setFeatures] = useState([]);
  const [userGroupTitles, setUserGroupTitles] = useState([]);
  const [userGroupIds, setUserGroupIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [editing, setEditing] = useState({ featureIndex: null });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("projectId");
        if (id) {
          setProjectId(id);
        }

        const token = localStorage.getItem("access_token");
        const formattedData = localStorage.getItem("formattedUserGroups");
        const parsedData = JSON.parse(formattedData);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/feature_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ project_id: id, user_group_data: parsedData }),
          }
        );
        const data = await response.json();
        setFeatures(data.features);
        setUserGroupTitles(data.user_group_titles);
        setUserGroupIds(data.user_group_ids);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDescriptionChange = (featureIndex, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].description = value;
    setFeatures(updatedFeatures);
  };

  const handleDescriptionSave = (featureIndex, value) => {
    if (value.trim() === "") {
      const updatedFeatures = [...features];
      updatedFeatures[featureIndex].description = "";
      setFeatures(updatedFeatures);
    }
    setEditing({ featureIndex: null });
  };

  const handleToggleIcon = (featureIndex, userGroupTitle, userGroupId) => {
    const updatedFeatures = [...features];
    const feature = updatedFeatures[featureIndex];
    if (feature.userGroupTitles.includes(userGroupTitle)) {
      feature.userGroupTitles = feature.userGroupTitles.filter(title => title !== userGroupTitle);
      feature.userGroupIds = feature.userGroupIds.filter(id => id !== userGroupId);
    } else {
      feature.userGroupTitles.push(userGroupTitle);
      feature.userGroupIds.push(userGroupId);
    }
    setFeatures(updatedFeatures);
  };

  const handleDeleteFeature = (featureIndex) => {
    const updatedFeatures = features.filter((_, index) => index !== featureIndex);
    setFeatures(updatedFeatures);
  };

  const nextPage = async () => {
    const filteredFeatures = features.map(({ userGroupTitles, ...rest }) => rest);
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update_feature`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ features: filteredFeatures, project_id: projectId }),
      });

      if (response.ok) {
        router.push("./techstackpreferences");
      } else {
        console.error("Failed to update features:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating features:", error);
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
            User group & features
          </Typography>
          {isLoading ? (
            <Loader />
          ) : (
            <Box className="h-[calc(100vh-200px)] overflow-auto">
              <Box className="max-w-[1260px] w-full pb-5">
                <Box className="flex flex-auto gap-3 justify-between p-3 pt-0 max-md:p-1.5 maxmd:pt-0 bg-white max-w-full">
                  <Box className="flex flex-row max-md:flex-col text-base black-200 w-full gap-4">
                    <Box className="w-[50%] max-md:hidden"> </Box>
                    <Box className="grid grid-flow-col auto-cols-max justify-end w-[50%] max-md:w-full max-md:justify-start">
                      {userGroupTitles.map((title, index) => (
                        <Box key={index} className="text-center md:w-32 w-20">
                          <Typography
                            className="text-sm text-black font-bold"
                            component="h4"
                          >
                            {title}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box className="w-10"></Box>
                  </Box>
                </Box>
                <Box className="max-h-[calc(100vh-239px)] overflow-auto flex gap-4 flex-col">
                  {features.map((feature, featureIndex) => (
                    <Box
                      key={featureIndex}
                      className="flex flex-auto gap-3 justify-between p-3 max-md:p-1.5 bg-white rounded-lg border-2 border-solid shadow-[0px_10px_50px_#E8F1FF] border-grey max-md:flex-wrap max-md:max-w-full"
                    >
                      <Box className="flex flex-row max-md:flex-col text-base black-200 w-full relative gap-4 items-center">
                        <Box className="w-[50%] max-md:w-full">
                          <Box className="flex gap-4 self-start items-center text-sm text-black font-bold max-md:pr-7 max-md:text-xs">
                            <Image
                              loading="lazy"
                              src={FeatureIcon}
                              width="24"
                              height="24"
                              alt="user group"
                              className="shrink-0 aspect-square w-[24px]"
                            />
                            <Box className="flex-auto">{feature.title}</Box>
                            </Box>
                            <Typography className="text-sm mt-2 max-md:text-xs" component="div">
                            {editing.featureIndex === featureIndex ? (
                              <TextField
                                value={feature.description}
                                onChange={(e) => handleDescriptionChange(featureIndex, e.target.value)}
                                onBlur={(e) => handleDescriptionSave(featureIndex, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleDescriptionSave(featureIndex, e.target.value);
                                  }
                                }}
                                fullWidth
                                autoFocus
                              />
                            ) : (
                              <div onClick={() => setEditing({ featureIndex })}>
                                {feature.description}
                              </div>
                            )}
                          </Typography>
                        </Box>
                        <Box className="grid grid-flow-col auto-cols-max justify-end w-[50%] max-md:w-full max-md:justify-start">
                          {userGroupTitles.map((title, index) => (
                            <Box key={index} className="text-center md:w-32 w-20">
                              {feature.userGroupTitles.includes(title) ? (
                                <CheckCircleIcon
                                  className="text-green text-4xl max-md:text-2xl cursor-pointer"
                                  onClick={() => handleToggleIcon(featureIndex, title, userGroupIds[index])}
                                />
                              ) : (
                                <CancelIcon
                                  className="text-[#F06262] text-4xl max-md:text-2xl cursor-pointer"
                                  onClick={() => handleToggleIcon(featureIndex, title, userGroupIds[index])}
                                />
                              )}
                            </Box>
                          ))}
                        </Box>
                        <Tooltip title="Delete">
                          <Box className="w-10 h-[100%] flex items-center">
                            <Button
                              aria-label="delete"
                              className="deleteUser absolute right-0 w-7 h-7 max-md:w-6 max-md:h-6 min-w-1 hover:shadow-2xl !min-w-2"
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleDeleteFeature(featureIndex)}
                            >
                              <DeleteOutlineOutlinedIcon
                                size="small"
                                className="text-md"
                              />
                            </Button>
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
          <Box className="bg-white p-3">
            <Button
              onClick={nextPage}
              className="text-lg normal-case text-white border-0 py-2 px-3 bg-primary hover:text-white shadow-custom w-full h-10"
              variant="contained"
              size="medium"
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
