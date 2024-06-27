"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import googleIcon from "../../../public/assets/images/googleIcon.png";
import projectDashboardImg from "../../../public/assets/images/project_dashboard.jpg";
import stackPreferencesImg from "../../../public/assets/images/stackPreferencesImg.png";
import axios from "axios";

export default function Login() {
  const googleLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/login/google`
      );
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error("No URL found in response");
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    // container
    <Grid container>
      {/* left side box */}
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          backgroundColor: "var(--primary)",
          height: "100vh",
          position: "relative",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: { xs: "80%", md: "55%" },
            aspectRatio: "1/1",
            borderRadius: "50%",
            backgroundImage: "linear-gradient(#2D8FE5 20%, #ffffff00 100%)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "6%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundImage: "linear-gradient(#2D8FE5 20%, #ffffff00 100%)",
              border: "1px solid #ffffff33",
              boxSizing: "border-box",
              padding: "12%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundImage: "linear-gradient(#2D8FE5 20%, #ffffff00 100%)",
                border: "1px solid #ffffff33",
                boxSizing: "border-box",
                padding: "18%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundImage:
                    "linear-gradient(#2D8FE5 20%, #ffffff00 100%)",
                  border: "1px solid #ffffff33",
                  boxSizing: "border-box",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            position: "relative",
            zIndex: "5",
            paddingTop: "3%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "7vw", sm: "2rem" },
              fontWeight: "bold",
              textAlign: "center",
              color: "var(--white)",
            }}
          >
            Create your Project with AI
          </Typography>

          <Box
            sx={{
              marginTop: "8%",
              display: "flex",
              paddingInline: "10%",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-between" },
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  marginBottom: "12px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "var(--white)",
                }}
              >
                Easy to Create Project
              </Typography>
              <Image
                loading="lazy"
                src={projectDashboardImg}
                width="370"
                alt="Scope"
                className="relative"
              />
            </Box>
            <Box
              sx={{
                marginTop: "10%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  marginBottom: "12px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "var(--white)",
                }}
              >
                You Can Select your Preferences
              </Typography>
              <Image
                loading="lazy"
                src={stackPreferencesImg}
                width="370"
                alt="Scope"
                className="relative"
              />
            </Box>
          </Box>
        </Box>

        {/* <SwipeableTextMobileStepper /> */}

        <Box sx={{ marginBottom: "3%" }}>
          <Typography
            variant="h6"
            sx={{
              color: "var(--white)",
              fontSize: { xs: "5vw", sm: "1.5rem" },
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Customize Your Dashboard Effortlessly
          </Typography>
          <Typography
            sx={{
              color: "var(--white)",
              textAlign: "center",
              fontSize: { xs: "4vw", sm: "1rem" },
            }}
          >
            Everything you need in an easily customizable dashboard
          </Typography>
        </Box>
      </Grid>

      {/* right side box */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{ backgroundColor: { xs: "var( --primary-400)", md: "#fff" } }}
        >
          <Box sx={{ paddingTop: "80px" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "3.75rem",
                color: "#087BE0",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Logo
            </Typography>
          </Box>
          <Box
            sx={{
              padding: { xs: "80px 0px 80px 0px", md: "120px 0px 80px 0px" },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              Log In
            </Typography>

            <Button
              onClick={googleLogin}
              className="text-sm gap-1 normal-case border-grey font-bold hover:bg-primary-400 shadow-custom"
              variant="outlined"
              sx={{
                color: "var(--black--200)",
                padding: "8px 16px",
                minWidth: "300px",
              }}
            >
              <Image
                loading="lazy"
                src={googleIcon}
                width="30"
                height="30"
                alt="googleIcon"
              />{" "}
              <Typography
                sx={{
                  marginLeft: "10px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                Continue with Google
              </Typography>
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
