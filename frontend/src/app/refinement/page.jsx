// "use client";
// import React, { useState, useEffect } from "react";
// import { Box, Typography, Button, TextField } from "@mui/material";
// import Image from "next/image";
// import ScopeIcon from "../../../public/assets/images/scopeIcon.svg";
// import ProblemStatement from "../../../public/assets/images/problemStatement.svg";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import Header from "@/components/header/header";
// import Sidebar from "@/components/sidebar/sidebar";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import CircularProgress from '@mui/material/CircularProgress';
// import { toast } from "react-toastify";

// export default function Refinement() {
//   const [planningData, setPlanningData] = useState("");
//   const [editablePlanningData, setEditablePlanningData] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [problemStatement, setProblemStatement] = useState("");
//   const [scope, setScope] = useState([]);
//   const [projectId, setProjectId] = useState("");
//   const router = useRouter();

//   useEffect(() => {

//     const fetchData = async () => {
//       const token = localStorage.getItem("access_token");
//       const storedPlanningData = localStorage.getItem("planningData");
//       setPlanningData(storedPlanningData);
//       setEditablePlanningData(storedPlanningData);
//       if (!token) {
//         console.error("No access token found.");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/refinement_project`,
//           { raw_information: planningData },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.data.status === "success") {
//           setProblemStatement(response.data.problem_statement);
//           setScope(response.data.scope);
//           setProjectId(response.data.project_id);
//         } else {
//           console.error("Error fetching refinement data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching refinement data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApplyChanges = async () => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       console.error("No access token found.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/update_refinement`,
//         {
//           project_id: projectId,
//           raw_information: editablePlanningData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         setProblemStatement(response.data.problem_statement);
//         setScope(response.data.scope);
//         toast.success("Changes applied successfully!");
//       } else {
//         toast.error("Failed to apply changes.");
//         console.error("Error updating refinement data:", response.data);
//       }
//     } catch (error) {
//       toast.error("An error occurred while applying changes.");
//       console.error("Error updating refinement data:", error);
//     }
//   };


//   const nextPage = () => {
//     router.push(`/usergroup?projectId=${projectId}`);
//   };

  

//   return (
//     <Box className="flex">
//       <Sidebar />
//       <Box className="h-screen flex-1 pl-10 pr-7 pb-6 pt-0">
//         <Header />
//         <Box className="container flex flex-col pb-10">
//           <Typography
//             component="h2"
//             className="text-xl max-md:text-xl pb-4 max-md:pb-4 font-bold text-black max-md:max-w-full"
//           >
//             Create Projects
//           </Typography>
//           <Box className="h-[calc(100vh-175px)] overflow-auto">
//             <Box className="flex gap-1 p-1 font-bold bg-white rounded border-2 border-solid border-grey max-md:flex-wrap">
//               <Box className="flex-auto my-auto text-xl max-md:max-w-full">
//                 <TextField
//                   id="outlined-basic"
//                   label=""
//                   variant="outlined"
//                   className="border-0 focus:border-0 hover:border-0 hover:outline-0 outline-0 focus:outline-0 w-full text-grey-200 text-base"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       padding: "0px",
//                       "& fieldset": {
//                         border: "none",
//                       },
//                       "& input": {
//                         padding: "10px",
//                       },
//                     },
//                   }}
//                   value={editablePlanningData}
//                   onChange={(e) => setEditablePlanningData(e.target.value)}
//                 />
//               </Box>
//               <Button
//                 variant="contained"
//                 size="medium"
//                 className="normal-case justify-center text-base text-white bg-green rounded max-md:pr-5 hover:bg-primary shadow-none max-md:w-full"
//                 onClick={handleApplyChanges}
//               >
//                 Apply Changes
//               </Button>
//             </Box>
//             <Box className="mt-8">
//               <Box>
//                 <Box className="grid grid-cols-2 gap-5 max-md:grid-cols-1 ">
//                   <Box className="border-2 border-solid border-grey p-3 rounded-lg shadow_0px_10px_50px_#E8F1FF bg-white shadow-[0px_10px_50px_#E8F1FF]">
//                     <Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: "1rem",
//                           alignItems: "center",
//                           fontWeight: "bold",
//                         }}
//                         className="pl-0 pr-0 pt-0 text-base"
//                       >
//                         <Image
//                           loading="lazy"
//                           src={ProblemStatement}
//                           width="30"
//                           height="30"
//                           alt="Scope"
//                         />
//                         <Typography
//                           component="h4"
//                           className="text-lg font-bold"
//                         >
//                           Problem Statement
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box>
//                       {loading ? (
//                         <Box className="flex justify-center items-center mt-5">
//                           <CircularProgress/>
//                         </Box>
//                       ) : (
//                         <Typography className="text-black-200 text-sm mt-5 font-semibold">
//                           {problemStatement ||
//                             "No problem statement available."}
//                         </Typography>
//                       )}
//                     </Box>
//                   </Box>
//                   <Box className="border-2 border-solid border-grey p-3 rounded-lg shadow_0px_10px_50px_#E8F1FF bg-white shadow-[0px_10px_50px_#E8F1FF]">
//                     <Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: "1rem",
//                           alignItems: "center",
//                           fontWeight: "bold",
//                         }}
//                         className="pl-0 pr-0 pt-0 text-base"
//                       >
//                         <Image
//                           loading="lazy"
//                           src={ScopeIcon}
//                           width="30"
//                           height="30"
//                           alt="Scope"
//                         />
//                         <Typography
//                           component="h4"
//                           className="text-lg font-bold"
//                         >
//                           Project Scope
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box>
//                       <Box className="text-black-200 text-sm font-semibold mt-5 keyTake">
//                         {loading ? (
//                           <Box className="flex justify-center items-center mt-5">
//                             <CircularProgress/>
//                           </Box>
//                         ) : (
//                           <div className="flex flex-col gap-2">
//                             {scope.length > 0 ? (
//                               scope.map((item, index) => (
//                                 <div key={index} className="flex gap-2.5">
//                                   <VerifiedIcon className="text-primary" />
//                                   <div className="flex-auto">{item}</div>
//                                 </div>
//                               ))
//                             ) : (
//                               <Typography>No scope available.</Typography>
//                             )}
//                           </div>
//                         )}
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
           
//           </Box>
//           <Box className="bg-white p-3">
//               <Button
//                 onClick={nextPage}
//                 className="text-lg normal-case text-white border-0 py-2 px-3 bg-primary hover:text-white shadow-custom w-full h-10"
//                 variant="contained"
//                 size="medium"
//               >
//                 Next
//               </Button>
//             </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }



// "use client";
// import React, { useState, useEffect } from "react";
// import { Box, Typography, Button, TextField, IconButton, CircularProgress } from "@mui/material";
// import Image from "next/image";
// import ScopeIcon from "../../../public/assets/images/scopeIcon.svg";
// import ProblemStatement from "../../../public/assets/images/problemStatement.svg";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import Header from "@/components/header/header";
// import Sidebar from "@/components/sidebar/sidebar";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export default function Refinement() {
//   const [planningData, setPlanningData] = useState("");
//   const [editablePlanningData, setEditablePlanningData] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [problemStatement, setProblemStatement] = useState("");
//   const [scope, setScope] = useState([]);
//   const [projectId, setProjectId] = useState("");
//   const [editingProblemStatement, setEditingProblemStatement] = useState(false);
//   const [editingScopeIndex, setEditingScopeIndex] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("access_token");
//       const storedPlanningData = localStorage.getItem("planningData");
//       setPlanningData(storedPlanningData);
//       setEditablePlanningData(storedPlanningData);
//       if (!token) {
//         console.error("No access token found.");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/refinement_project`,
//           { raw_information: storedPlanningData },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.data.status === "success") {
//           setProblemStatement(response.data.problem_statement);
//           setScope(response.data.scope);
//           setProjectId(response.data.project_id);
//         } else {
//           console.error("Error fetching refinement data:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching refinement data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApplyChanges = async () => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       console.error("No access token found.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/update_refinement`,
//         {
//           project_id: projectId,
//           raw_information: editablePlanningData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         setProblemStatement(response.data.problem_statement);
//         setScope(response.data.scope);
//         toast.success("Changes applied successfully!");
//       } else {
//         toast.error("Failed to apply changes.");
//         console.error("Error updating refinement data:", response.data);
//       }
//     } catch (error) {
//       toast.error("An error occurred while applying changes.");
//       console.error("Error updating refinement data:", error);
//     }
//   };

//   const handleProblemStatementChange = (e) => {
//     setProblemStatement(e.target.value);
//   };

//   const handleScopeChange = (index, value) => {
//     const newScope = [...scope];
//     newScope[index] = value;
//     setScope(newScope);
//   };

//   const handleAddScope = () => {
//     setScope([...scope, ""]);
//   };

//   const handleNext = () => {
//     console.log(JSON.stringify({ problemStatement, scope }, null, 2));
//     router.push(`/usergroup?projectId=${projectId}`);
//   };

//   const handleKeyPress = (e, type, index = null) => {
//     if (e.key === "Enter") {
//       if (type === "problemStatement") {
//         setEditingProblemStatement(false);
//       } else if (type === "scope") {
//         setEditingScopeIndex(null);
//       }
//     }
//   };

//   return (
//     <Box className="flex">
//       <Sidebar />
//       <Box className="h-screen flex-1 pl-10 pr-7 pb-6 pt-0">
//         <Header />
//         <Box className="container flex flex-col pb-10">
//           <Typography
//             component="h2"
//             className="text-xl max-md:text-xl pb-4 max-md:pb-4 font-bold text-black max-md:max-w-full"
//           >
//             Create Projects
//           </Typography>
//           <Box className="h-[calc(100vh-175px)] overflow-auto">
//             <Box className="flex gap-1 p-1 font-bold bg-white rounded border-2 border-solid border-grey max-md:flex-wrap">
//               <Box className="flex-auto my-auto text-xl max-md:max-w-full">
//                 <TextField
//                   id="outlined-basic"
//                   label=""
//                   variant="outlined"
//                   className="border-0 focus:border-0 hover:border-0 hover:outline-0 outline-0 focus:outline-0 w-full text-grey-200 text-base"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       padding: "0px",
//                       "& fieldset": {
//                         border: "none",
//                       },
//                       "& input": {
//                         padding: "10px",
//                       },
//                     },
//                   }}
//                   value={editablePlanningData}
//                   onChange={(e) => setEditablePlanningData(e.target.value)}
//                 />
//               </Box>
//               <Button
//                 variant="contained"
//                 size="medium"
//                 className="normal-case justify-center text-base text-white bg-green rounded max-md:pr-5 hover:bg-primary shadow-none max-md:w-full"
//                 onClick={handleApplyChanges}
//               >
//                 Apply Changes
//               </Button>
//             </Box>
//             <Box className="mt-8">
//               <Box>
//                 <Box className="grid grid-cols-2 gap-5 max-md:grid-cols-1 ">
//                   <Box className="border-2 border-solid border-grey p-3 rounded-lg shadow_0px_10px_50px_#E8F1FF bg-white shadow-[0px_10px_50px_#E8F1FF]">
//                     <Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: "1rem",
//                           alignItems: "center",
//                           fontWeight: "bold",
//                         }}
//                         className="pl-0 pr-0 pt-0 text-base"
//                       >
//                         <Image
//                           loading="lazy"
//                           src={ProblemStatement}
//                           width="30"
//                           height="30"
//                           alt="Scope"
//                         />
//                         <Typography component="h4" className="text-lg font-bold">
//                           Problem Statement
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box>
//                       {loading ? (
//                         <Box className="flex justify-center items-center mt-5">
//                           <CircularProgress />
//                         </Box>
//                       ) : (
//                         <Box
//                           onClick={() => setEditingProblemStatement(true)}
//                           className="cursor-pointer"
//                         >
//                           {editingProblemStatement ? (
//                             <TextField
//                               fullWidth
//                               value={problemStatement}
//                               onChange={handleProblemStatementChange}
//                               onBlur={() => setEditingProblemStatement(false)}
//                               onKeyPress={(e) => handleKeyPress(e, "problemStatement")}
//                               autoFocus
//                               multiline
//                               variant="outlined"
//                             />
//                           ) : (
//                             <Typography>{problemStatement}</Typography>
//                           )}
//                         </Box>
//                       )}
//                     </Box>
//                   </Box>
//                   <Box className="border-2 border-solid border-grey p-3 rounded-lg shadow_0px_10px_50px_#E8F1FF bg-white shadow-[0px_10px_50px_#E8F1FF] relative">
//                     <Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: "1rem",
//                           alignItems: "center",
//                           fontWeight: "bold",
//                         }}
//                         className="pl-0 pr-0 pt-0 text-base"
//                       >
//                         <Image
//                           loading="lazy"
//                           src={ScopeIcon}
//                           width="30"
//                           height="30"
//                           alt="Scope"
//                         />
//                         <Typography component="h4" className="text-lg font-bold">
//                           Project Scope
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box>
//                       <Box className="text-black-200 text-sm font-semibold mt-5 keyTake">
//                         {loading ? (
//                           <Box className="flex justify-center items-center mt-5">
//                             <CircularProgress />
//                           </Box>
//                         ) : (
//                           <div className="flex flex-col gap-2">
//                             {scope.length > 0 ? (
//                               scope.map((item, index) => (
//                                 <div key={index} className="flex gap-2.5 items-center">
//                                   <VerifiedIcon className="text-primary" />
//                                   <Box
//                                     onClick={() => setEditingScopeIndex(index)}
//                                     className="flex-1 cursor-pointer"
//                                   >
//                                     {editingScopeIndex === index ? (
//                                       <TextField
//                                         fullWidth
//                                         value={item}
//                                         onChange={(e) =>
//                                           handleScopeChange(index, e.target.value)
//                                         }
//                                         onBlur={() => setEditingScopeIndex(null)}
//                                         onKeyPress={(e) => handleKeyPress(e, "scope", index)}
//                                         autoFocus
//                                         variant="outlined"
//                                       />
//                                     ) : (
//                                       <Typography>{item}</Typography>
//                                     )}
//                                   </Box>
//                                 </div>
//                               ))
//                             ) : (
//                               <p>No scope items found.</p>
//                             )}
//                           </div>
//                         )}
//                       </Box>
//                     </Box>
//                     <Box
//                       className="justify-center items-center mt-1 bg-grey-100 rounded h-[24px] w-[24px] text-black min-w-[10px] shadow-none hover:bg-grey"
//                       onClick={handleAddScope}
//                     >
//                       <IconButton>
//                         <AddOutlinedIcon className="text-base" />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//             <Box className="mt-8">
//               <Button
//                 variant="contained"
//                 size="medium"
//                 className="normal-case justify-center text-base text-white bg-primary rounded max-md:pr-5 hover:bg-primary shadow-none max-md:w-full"
//                 onClick={handleNext}
//                 disableElevation
//                 fullWidth
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, IconButton, CircularProgress } from "@mui/material";
import Image from "next/image";
import ScopeIcon from "../../../public/assets/images/scopeIcon.svg";
import ProblemStatement from "../../../public/assets/images/problemStatement.svg";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Refinement() {
  const [planningData, setPlanningData] = useState("");
  const [editablePlanningData, setEditablePlanningData] = useState("");
  const [loading, setLoading] = useState(true);
  const [problemStatement, setProblemStatement] = useState("");
  const [scope, setScope] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [editingProblemStatement, setEditingProblemStatement] = useState(false);
  const [editingScopeIndex, setEditingScopeIndex] = useState(null);
  const [newScope, setNewScope] = useState("");
  const [addingScope, setAddingScope] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      const storedPlanningData = localStorage.getItem("planningData");
      setPlanningData(storedPlanningData);
      setEditablePlanningData(storedPlanningData);
      if (!token) {
        console.error("No access token found.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refinement_project`,
          { raw_information: storedPlanningData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === "success") {
          setProblemStatement(response.data.problem_statement);
          setScope(response.data.scope);
          setProjectId(response.data.project_id);
        } else {
          console.error("Error fetching refinement data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching refinement data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApplyChanges = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found.");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/update_refinement`,
        {
          project_id: projectId,
          raw_information: editablePlanningData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setProblemStatement(response.data.problem_statement);
        setScope(response.data.scope);
        toast.success("Changes applied successfully!");
      } else {
        toast.error("Failed to apply changes.");
        console.error("Error updating refinement data:", response.data);
      }
    } catch (error) {
      toast.error("An error occurred while applying changes.");
      console.error("Error updating refinement data:", error);
    }
  };

  const handleProblemStatementChange = (e) => {
    setProblemStatement(e.target.value);
  };

  const handleScopeChange = (index, value) => {
    const newScope = [...scope];
    newScope[index] = value;
    setScope(newScope);
  };

  const handleAddScope = () => {
    setAddingScope(true);
    setNewScope("");
  };

  const handleSaveNewScope = () => {
    if (newScope.trim() === "") {
      toast.error("Please fill the project data.");
      setAddingScope(false);
      return;
    }
    setScope([...scope, newScope]);
    setAddingScope(false);
  };

  const handleNext = () => {
    console.log(JSON.stringify({ problemStatement, scope, projectId:projectId }, null, 2));
    localStorage.setItem("problem_statement",problemStatement)
    localStorage.setItem("scope", JSON.stringify(scope));
    localStorage.setItem("project_id", projectId);
    router.push(`/usergroup?projectId=${projectId}`);
  };

  const handleKeyPress = (e, type, index = null) => {
    if (e.key === "Enter") {
      if (type === "problemStatement") {
        if (problemStatement.trim() === "") {
          toast.error("Please fill the project data.");
        } else {
          setEditingProblemStatement(false);
        }
      } else if (type === "scope") {
        if (scope[index].trim() === "") {
          toast.error("Please fill the project data.");
        } else {
          setEditingScopeIndex(null);
        }
      } else if (type === "newScope") {
        handleSaveNewScope();
      }
    }
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
          <Box className="h-[calc(100vh-200px)] overflow-auto">
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
                  value={editablePlanningData}
                  onChange={(e) => setEditablePlanningData(e.target.value)}
                />
              </Box>
              <Button
                variant="contained"
                size="medium"
                className="normal-case justify-center text-base text-white bg-green rounded max-md:pr-5 hover:bg-primary shadow-none max-md:w-full"
                onClick={handleApplyChanges}
              >
                Apply Changes
              </Button>
            </Box>
            <Box className="mt-8">
              <Box>
                <Box className="grid grid-cols-2 gap-5 max-md:grid-cols-1 ">
                  <Box className="border-2 border-solid border-grey p-3 rounded-lg shadow_0px_10px_50px_#E8F1FF bg-white shadow-[0px_10px_50px_#E8F1FF]">
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                        className="pl-0 pr-0 pt-0 text-base"
                      >
                        <Image
                          loading="lazy"
                          src={ProblemStatement}
                          width="30"
                          height="30"
                          alt="Scope"
                        />
                        <Typography component="h4" className="text-lg font-bold">
                          Problem Statement
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      {loading ? (
                        <Box className="flex justify-center items-center mt-5">
                          <CircularProgress />
                        </Box>
                      ) : (
                        <Box
                          onClick={() => setEditingProblemStatement(true)}
                          className="cursor-pointer"
                        >
                          {editingProblemStatement ? (
                            <TextField
                              fullWidth
                              value={problemStatement}
                              onChange={handleProblemStatementChange}
                              onBlur={() => setEditingProblemStatement(false)}
                              onKeyPress={(e) => handleKeyPress(e, "problemStatement")}
                              autoFocus
                              multiline
                              variant="outlined"
                            />
                          ) : (
                            <Typography>{problemStatement}</Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box className="border-2 border-solid border-grey p-3 rounded-lg shadow_0px_10px_50px_#E8F1FF bg-white shadow-[0px_10px_50px_#E8F1FF] relative">
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                        className="pl-0 pr-0 pt-0 text-base"
                      >
                        <Image
                          loading="lazy"
                          src={ScopeIcon}
                          width="30"
                          height="30"
                          alt="Scope"
                        />
                        <Typography component="h4" className="text-lg font-bold">
                          Project Scope
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box className="text-black-200 text-sm font-semibold mt-5 keyTake">
                        {loading ? (
                          <Box className="flex justify-center items-center mt-5">
                            <CircularProgress />
                          </Box>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {scope.length > 0 ? (
                              scope.map((item, index) => (
                                <div key={index} className="flex gap-2.5 items-center">
                                  <VerifiedIcon className="text-primary" />
                                  <Box
                                    onClick={() => setEditingScopeIndex(index)}
                                    className="flex-1 cursor-pointer"
                                  >
                                    {editingScopeIndex === index ? (
                                      <TextField
                                        fullWidth
                                        value={item}
                                        onChange={(e) =>
                                          handleScopeChange(index, e.target.value)
                                        }
                                        onBlur={() => setEditingScopeIndex(null)}
                                        onKeyPress={(e) => handleKeyPress(e, "scope", index)}
                                        autoFocus
                                        variant="outlined"
                                      />
                                    ) : (
                                      <Typography>{item}</Typography>
                                    )}
                                  </Box>
                                </div>
                              ))
                            ) : (
                              <p>No scope items found.</p>
                            )}
                          </div>
                        )}
                      </Box>
                    </Box>
                    {addingScope ? (
                      <Box className="flex gap-2.5 items-center mt-2.5">
                        <VerifiedIcon className="text-primary" />
                        <TextField
                          fullWidth
                          value={newScope}
                          onChange={(e) => setNewScope(e.target.value)}
                          onBlur={handleSaveNewScope}
                          onKeyPress={(e) => handleKeyPress(e, "newScope")}
                          autoFocus
                          variant="outlined"
                        />
                      </Box>
                    ) : (
                      <Box
                        className="justify-center items-center mt-1 bg-grey-100 rounded h-[24px] w-[24px] text-black min-w-[10px] shadow-none hover:bg-grey"
                        onClick={handleAddScope}
                      >
                        <IconButton>
                          <AddOutlinedIcon className="text-base" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="mt-8">
              <Button
                variant="contained"
                size="medium"
                className="normal-case justify-center text-base text-white bg-primary rounded max-md:pr-5 hover:bg-primary shadow-none max-md:w-full"
                onClick={handleNext}
                disableElevation
                fullWidth
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
