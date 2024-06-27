"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Tooltip, TextField } from "@mui/material";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UserGroupIcon from "../../../public/assets/images/usergroupIcon.svg";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/loading";
import { toast } from "react-toastify";

export default function UserGroup() {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectId, setProjectId] = useState("");
  const [editing, setEditing] = useState({ groupIndex: null, descriptionIndex: null, titleIndex: null });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {

        const projectId = localStorage.getItem("project_id");
        const scope = JSON.parse(localStorage.getItem("scope")); 
        const problemStatement = localStorage.getItem("problem_statement");

        if (!projectId || !scope || !problemStatement) {
          console.error("Missing data in localStorage.");
          return;
        }

        const token = localStorage.getItem("access_token");

        if (!token) {
          console.error("No access token found.");
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_groups_api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ project_id: projectId,
            problem_statement:problemStatement, 
            scope:scope }),
        });

        const data = await response.json();
        
        const formattedData = data.user_groups.map(group => ({
          ...group,
          descriptions: group.descriptions ? group.descriptions : [{ text: group.description }],
        }));
        
        setUserGroups(formattedData);
        setProjectId(data.project_id);
        localStorage.setItem("project_id", data.project_id);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddGroup = () => {
    const newUserGroupId = userGroups.length > 0
      ? Math.max(...userGroups.map(group => group.userGroupId)) + 1
      : 1;
    
    setUserGroups([...userGroups, { userGroupId: newUserGroupId, title: "New Group", descriptions: [] }]);
  };

  const handleAddDescription = (index) => {
    const updatedGroups = [...userGroups];
    updatedGroups[index].descriptions.push({ text: "" });
    setUserGroups(updatedGroups);
    setEditing({ ...editing, groupIndex: index, descriptionIndex: updatedGroups[index].descriptions.length - 1 });
  };

  const handleDescriptionChange = (groupIndex, descriptionIndex, value) => {
    const updatedGroups = [...userGroups];
    updatedGroups[groupIndex].descriptions[descriptionIndex].text = value;
    setUserGroups(updatedGroups);
  };

  const handleDescriptionSave = (groupIndex, descriptionIndex, value) => {
    if (value.trim() === "") {
      const updatedGroups = [...userGroups];
      updatedGroups[groupIndex].descriptions.splice(descriptionIndex, 1);
      setUserGroups(updatedGroups);
    }
    setEditing({ ...editing, groupIndex: null, descriptionIndex: null });
  };

  const handleDeleteDescription = (groupIndex, descriptionIndex) => {
    const updatedGroups = [...userGroups];
    updatedGroups[groupIndex].descriptions.splice(descriptionIndex, 1);
    setUserGroups(updatedGroups);
  };

  const handleTitleChange = (groupIndex, value) => {
    const updatedGroups = [...userGroups];
    updatedGroups[groupIndex].title = value;
    setUserGroups(updatedGroups);
  };

  const handleTitleSave = (groupIndex, value) => {
    if (value.trim() === "") {
      toast.error("Please enter a title name.");
    } else {
      setEditing({ ...editing, titleIndex: null });
    }
  };

  const handleDeleteGroup = (groupIndex) => {
    const updatedGroups = userGroups.filter((_, index) => index !== groupIndex);
    setUserGroups(updatedGroups);
  };

  const featureClick = () => {
    const formattedUserGroups = userGroups.map(group => ({
      userGroupId: group.userGroupId,
      title: group.title,
      description: group.descriptions.map(desc => desc.text),
    }));
    localStorage.setItem('formattedUserGroups', JSON.stringify(formattedUserGroups));
    router.push(`/usergroupfeature?projectId=${projectId}`);
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
            User Group
          </Typography>

          <Box className="h-[calc(100vh-220px)] overflow-auto">
            <Box className="mb-6">
              <Button
                variant="contained"
                className="text-sm gap-1 normal-case text-black-200 border-0 py-2 px-3 bg-grey-100 hover:bg-primary hover:text-white shadow-none font-semibold  rounded-lg"
                size="medium"
                onClick={handleAddGroup}
              >
                <AddToPhotosOutlinedIcon /> Add Group
              </Button>
            </Box>
            {isLoading ? (
              <Loader />
            ) : (
              userGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="max-w-[760px] w-full pb-5">
                  <div className="flex gap-4 flex-col">
                    <div className="flex gap-5 max-md:gap-1">
                      <div className="flex flex-auto gap-3 justify-between p-3 max-md:p-1.5 bg-white rounded-lg border-2 border-solid shadow-[0px_10px_50px_#E8F1FF] border-grey max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col text-base black-200 w-full">
                          <div className="flex gap-4 self-start items-center text-base text-black font-bold">
                            <Image
                              loading="lazy"
                              src={UserGroupIcon}
                              width="30"
                              height="30"
                              alt="user group"
                              className="shrink-0 aspect-square w-[30px]"
                            />
                            {editing.titleIndex === groupIndex ? (
                              <TextField
                                value={group.title}
                                onChange={(e) => handleTitleChange(groupIndex, e.target.value)}
                                onBlur={(e) => handleTitleSave(groupIndex, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleTitleSave(groupIndex, e.target.value);
                                  }
                                }}
                                fullWidth
                                autoFocus
                              />
                            ) : (
                              <div onClick={() => setEditing({ ...editing, titleIndex: groupIndex })}>
                                {group.title}
                              </div>
                            )}
                          </div>
                          <div className="userGroupList flex flex-col gap-2 mt-4 w-full text-sm font-medium">
                            {group.descriptions.map((desc, descIndex) => (
                              <div key={descIndex} className="flex gap-2.5 max-md:gap-1.5 pr-6 relative min-h-[30px]">
                                <VerifiedIcon className="text-primary text-lg" />
                                {editing.groupIndex === groupIndex && editing.descriptionIndex === descIndex ? (
                                  <TextField
                                    value={desc.text}
                                    onChange={(e) => handleDescriptionChange(groupIndex, descIndex, e.target.value)}
                                    onBlur={(e) => handleDescriptionSave(groupIndex, descIndex, e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleDescriptionSave(groupIndex, descIndex, e.target.value);
                                      }
                                    }}
                                    fullWidth
                                    autoFocus
                                  />
                                ) : (
                                  <div onClick={() => setEditing({ ...editing, groupIndex, descriptionIndex: descIndex })}>
                                    {desc.text}
                                  </div>
                                )}
                                <Tooltip title="Delete">
                                  <Button
                                    aria-label="delete"
                                    className="deleteUser absolute right-0 w-7 h-7 max-md:w-6 max-md:h-6 min-w-1 hover:shadow-2xl"
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDeleteDescription(groupIndex, descIndex)}
                                  >
                                    <DeleteOutlineOutlinedIcon size="small" className="text-md" />
                                  </Button>
                                </Tooltip>
                              </div>
                            ))}
                          </div>
                          <Button
                            variant="contained"
                            className="justify-center items-center mt-1 bg-grey-100 rounded h-[24px] w-[24px] text-black min-w-[10px] shadow-none hover:bg-grey"
                            onClick={() => handleAddDescription(groupIndex)}
                          >
                            <AddOutlinedIcon className="text-base" />
                          </Button>
                        </div>
                      </div>
                      <div className="w-[70px] max-md:w-[30px] h-full mt-5">
                        <div className="flex gap-3 flex-col">
                          <IconButton aria-label="cancel" onClick={() => handleDeleteGroup(groupIndex)}>
                            <CancelIcon className="text-[#F06262] text-4xl max-md:text-2xl" />
                          </IconButton>
                          <IconButton aria-label="check circle">
                            <CheckCircleIcon className="text-green text-4xl max-md:text-2xl" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Box>

          <Box className="bg-white p-3">
            <Button
              onClick={featureClick}
              className="text-lg normal-case text-white border-0 py-2 px-3 bg-primary hover:text-white shadow-custom w-full h-10"
              variant="contained"
              size="medium"
            >
              Next
            </Button>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
}
