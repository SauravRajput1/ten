import React from "react";
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export default function ProjectList({ projects }) {
  return (
    <>
      {projects.map((project) => (
        <Card
          key={project._id} 
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "lg",
            border: "2px solid #E8F1FF",
            boxShadow: "0px 10px 50px #E8F1FF",
            cursor: "pointer",
            transition: "transform 0.9s",
            "&:hover": {
              borderColor: "#087BE0",
              background: "#E8F1FF",
              boxShadow: "0px 0px 7px #087BE0",
            },
          }}
        >
          <CardHeader
            className="text-sm pb-0 !font-bold pt-2 pl-2 pr-2"
            sx={{
              ".MuiTypography-root": {
                fontWeight: "700",
                fontSize: "1.2rem",
                display: "flex",
                gap: "2px",
              },
              display: "flex",
              alignItems: "start",
              gap: 1,
              paddingBottom: 0,
              p: 2,
              fontWeight: "600",
            }}
            title={
              <>
                <CheckBoxOutlinedIcon
                  sx={{ width: "30px", marginTop: "2px" }}
                />
                {project._id}
              </>
            }
          />
          <CardContent
            sx={{
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "1px",
              paddingBottom: "10px!important",
              minheight: "70px",
            }}
          >
            <Box className="text-black-200 font-bold text-[10px]">
              {new Date(project.updated_at).toLocaleDateString()}
            </Box>
            <Typography className="text-black-200 font-medium text-sm mt-2 line-clamp-2 ">
              {project.raw_information || "No information available"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
