"use client";
import { Box, Typography, Button } from "@mui/material";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import PreferencesCard from "./preferencesCard";
import { useRouter } from "next/navigation";

export default function StackPreferences() {
  const router = useRouter()

  const handleNextClick = () => {
    router.push("./techstachrecommendation")
    const projectId = localStorage.getItem("project_id"); 
    const preferences = JSON.parse(localStorage.getItem("preferences"))?.preferences || {};
    for (let category in preferences) {
      preferences[category] = Array.from(new Set(preferences[category]));
    }
    const data = {
      project_id: projectId,
      preferences: preferences,
    };

    localStorage.setItem("preferences", JSON.stringify(data.preferences));
  }

  return (
    <Box className="flex">
      <Sidebar />
      <Box className={`-screen flex-1 pl-10 pr-7 pb-6 pt-0`}>
        <Header />
        <Box className="container flex gap-8 flex-col">
          <Typography className="text-2xl font-bold text-black max-md:mt-10 max-md:max-w-full">
            Tech Stack Preferences
          </Typography>
          <Box>
            <PreferencesCard />

            <Box className="bg-white p-3">
              <Button
                onClick={handleNextClick}
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
    </Box>
  );
}
