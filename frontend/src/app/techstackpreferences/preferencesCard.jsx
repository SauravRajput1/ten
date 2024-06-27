import * as React from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { Box, Typography, Checkbox } from "@mui/material";
import database from "../../../public/assets/images/database.svg";
import frontendIcon from "../../../public/assets/images/frontendicon.svg";
import backendIcon from "../../../public/assets/images/backendicon.svg";
import deploymentIcon from "../../../public/assets/images/deployment.svg";

export default function PreferencesCard() {
  const [preferences, setPreferences] = React.useState({
    frontend: [],
    backend: [],
    database: [],
    deployment: [],
  });

  const handleCheckboxChange = (category, value, checked) => {
    setPreferences((prevPreferences) => {
      const newPreferences = { ...prevPreferences };
      if (checked) {
        newPreferences[category].push(value);
      } else {
        newPreferences[category] = newPreferences[category].filter(
          (item) => item !== value
        );
      }
      newPreferences[category] = Array.from(new Set(newPreferences[category]));
      const projectId = localStorage.getItem("project_id") ;
      const data = {
        project_id: projectId,
        preferences: newPreferences,
      };
      localStorage.setItem("preferences", JSON.stringify(data));

      return newPreferences;
    });
  };

  const UncheckedLabel = styled("div")(({ theme }) => ({
    border: "2px solid var(--primary)",
    padding: "0.5rem 1.25rem",
    borderRadius: 30,
    display: "inline-block",
    minWidth: 120,
    fontSize: "0.9rem",
    textAlign: "center",
    color: "var(--primary)",
    fontWeight: "600",
  }));

  const CheckedLabel = styled(UncheckedLabel)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }));

  return (
    <Box className="h-[calc(100vh-216px)] overflow-auto">
      <Box sx={{ marginBottom: "26px" }}>
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
            src={database}
            width="20"
            height="26"
            alt="database"
          />
          <Typography component="h4" className="text-lg font-bold">
            Database
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            marginTop: "5px",
            width: { xs: "100%", md: "42%" },
            flexWrap: "wrap",
          }}
        >
          <Checkbox
            checked={preferences.database.includes("MySQL")}
            onChange={(e) =>
            handleCheckboxChange("database", "MySQL", e.target.checked)
          }
            icon={<UncheckedLabel>MySQL</UncheckedLabel>}
            checkedIcon={<CheckedLabel>MySQL</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.database.includes("PostgreSQL")}
            onChange={(e) =>
            handleCheckboxChange("database", "PostgreSQL", e.target.checked)
          }
            icon={<UncheckedLabel>PostgreSQL</UncheckedLabel>}
            checkedIcon={<CheckedLabel>PostgreSQL</CheckedLabel>}
          />

           <Checkbox
            checked={preferences.database.includes("SQLite")}
            onChange={(e) =>
            handleCheckboxChange("database", "SQLite", e.target.checked)
          }
            icon={<UncheckedLabel>SQLite</UncheckedLabel>}
            checkedIcon={<CheckedLabel>SQLite</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.database.includes("Oracle")}
            onChange={(e) =>
            handleCheckboxChange("database", "Oracle", e.target.checked)
          }
            icon={<UncheckedLabel>Oracle</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Oracle</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.database.includes("Redis")}
            onChange={(e) =>
            handleCheckboxChange("database", "Redis", e.target.checked)
          }
            icon={<UncheckedLabel>Redis</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Redis</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.database.includes("Neo4j")}
            onChange={(e) =>
            handleCheckboxChange("database", "Neo4j", e.target.checked)
          }
            icon={<UncheckedLabel>Neo4j</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Neo4j</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.database.includes("Oracle Database")}
            onChange={(e) =>
              handleCheckboxChange("database", "Oracle Database", e.target.checked)
            }
            icon={<UncheckedLabel>Oracle Database</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Oracle Database</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.database.includes("mongoDB")}
            onChange={(e) =>
              handleCheckboxChange("database", "mongoDB", e.target.checked)
            }
            icon={<UncheckedLabel>mongoDB</UncheckedLabel>}
            checkedIcon={<CheckedLabel>mongoDB</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.database.includes("Amazon DynamoDB")}
            onChange={(e) =>
              handleCheckboxChange("database", "Amazon DynamoDB", e.target.checked)
            }
            icon={<UncheckedLabel>Amazon DynamoDB</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Amazon DynamoDB</CheckedLabel>}
          />
        </Box>
      </Box>

      <Box sx={{ marginBottom: "26px" }}>
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
            src={frontendIcon}
            width="20"
            height="26"
            alt="database"
          />
          <Typography component="h4" className="text-lg font-bold">
            Frontend
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            marginTop: "5px",
            width: { xs: "100%", md: "42%" },
            flexWrap: "wrap",
          }}
        >
           <Checkbox
            checked={preferences.frontend.includes("JavaScript")}
            onChange={(e) =>
              handleCheckboxChange("frontend", "JavaScript", e.target.checked)
            }
            icon={<UncheckedLabel>JavaScript</UncheckedLabel>}
            checkedIcon={<CheckedLabel>JavaScript</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.frontend.includes("React Js")}
            onChange={(e) =>
              handleCheckboxChange("frontend", "React Js", e.target.checked)
            }
            icon={<UncheckedLabel>React Js</UncheckedLabel>}
            checkedIcon={<CheckedLabel>React Js</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.frontend.includes("Next Js")}
            onChange={(e) =>
              handleCheckboxChange("frontend", "Next Js", e.target.checked)
            }
            icon={<UncheckedLabel>Next Js</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Next Js</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.frontend.includes("Angular")}
            onChange={(e) =>
              handleCheckboxChange("frontend", "Angular", e.target.checked)
            }
            icon={<UncheckedLabel>Angular</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Angular</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.frontend.includes("TypeScript")}
            onChange={(e) =>
              handleCheckboxChange("frontend", "TypeScript", e.target.checked)
            }
            icon={<UncheckedLabel>TypeScript</UncheckedLabel>}
            checkedIcon={<CheckedLabel>TypeScript</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.frontend.includes("VueJs")}
            onChange={(e) =>
              handleCheckboxChange("frontend", "VueJs", e.target.checked)
            }
            icon={<UncheckedLabel>VueJs</UncheckedLabel>}
            checkedIcon={<CheckedLabel>VueJs</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.frontend.includes("React Native")}
            onChange={(e) =>
              handleCheckboxChange("frontend", "React Native", e.target.checked)
            }
            icon={<UncheckedLabel>React Native</UncheckedLabel>}
            checkedIcon={<CheckedLabel>React Native</CheckedLabel>}
          />
        </Box>
      </Box>

      <Box sx={{ marginBottom: "26px" }}>
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
            src={backendIcon}
            width="20"
            height="26"
            alt="database"
          />
          <Typography component="h4" className="text-lg font-bold">
            Backend
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            marginTop: "5px",
            width: { xs: "100%", md: "42%" },
            flexWrap: "wrap",
          }}
        >
          <Checkbox
            checked={preferences.backend.includes("Node Js")}
            onChange={(e) =>
              handleCheckboxChange("backend", "Node Js", e.target.checked)
            }
            icon={<UncheckedLabel>Node Js</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Node Js</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.backend.includes("Python")}
            onChange={(e) =>
              handleCheckboxChange("backend", "Python", e.target.checked)
            }
            icon={<UncheckedLabel>Python</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Python</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.backend.includes("Java")}
            onChange={(e) =>
              handleCheckboxChange("backend", "Java", e.target.checked)
            }
            icon={<UncheckedLabel>Java</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Java</CheckedLabel>}
          />

<Checkbox
            checked={preferences.backend.includes("Ruby")}
            onChange={(e) =>
              handleCheckboxChange("backend", "Ruby", e.target.checked)
            }
            icon={<UncheckedLabel>Ruby</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Ruby</CheckedLabel>}
          />

<Checkbox
            checked={preferences.backend.includes("C#")}
            onChange={(e) =>
              handleCheckboxChange("backend", "C#", e.target.checked)
            }
            icon={<UncheckedLabel>C#</UncheckedLabel>}
            checkedIcon={<CheckedLabel>C#</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.backend.includes("PHP")}
            onChange={(e) =>
              handleCheckboxChange("backend", "PHP", e.target.checked)
            }
            icon={<UncheckedLabel>PHP</UncheckedLabel>}
            checkedIcon={<CheckedLabel>PHP</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.backend.includes("Golang")}
            onChange={(e) =>
              handleCheckboxChange("backend", "Golang", e.target.checked)
            }
            icon={<UncheckedLabel>Golang</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Golang</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.backend.includes("Rust")}
            onChange={(e) =>
              handleCheckboxChange("backend", "Rust", e.target.checked)
            }
            icon={<UncheckedLabel>Rust</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Rust</CheckedLabel>}
          />
        </Box>
      </Box>

      <Box sx={{ marginBottom: "26px" }}>
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
            src={deploymentIcon}
            width="20"
            height="26"
            alt="database"
          />
          <Typography component="h4" className="text-lg font-bold">
            Deployment
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            marginTop: "5px",
            width: { xs: "100%", md: "42%" },
            flexWrap: "wrap",
          }}
        >
          <Checkbox
            checked={preferences.deployment.includes("Docker")}
            onChange={(e) =>
              handleCheckboxChange("deployment", "Docker", e.target.checked)
            }
            icon={<UncheckedLabel>Docker</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Docker</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.deployment.includes("Kubernetes")}
            onChange={(e) =>
              handleCheckboxChange("deployment", "Kubernetes", e.target.checked)
            }
            icon={<UncheckedLabel>Kubernetes</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Kubernetes</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.deployment.includes("OpenShift")}
            onChange={(e) =>
              handleCheckboxChange("deployment", "OpenShift", e.target.checked)
            }
            icon={<UncheckedLabel>OpenShift</UncheckedLabel>}
            checkedIcon={<CheckedLabel>OpenShift</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.deployment.includes("Jenkins")}
            onChange={(e) =>
              handleCheckboxChange("deployment", "Jenkins", e.target.checked)
            }
            icon={<UncheckedLabel>Jenkins</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Jenkins</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.deployment.includes("Terraform")}
            onChange={(e) =>
              handleCheckboxChange("deployment", "Terraform", e.target.checked)
            }
            icon={<UncheckedLabel>Terraform</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Terraform</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.deployment.includes("AWS")}
            onChange={(e) =>
              handleCheckboxChange("deployment", "AWS", e.target.checked)
            }
            icon={<UncheckedLabel>AWS</UncheckedLabel>}
            checkedIcon={<CheckedLabel>AWS</CheckedLabel>}
          />

          <Checkbox
            checked={preferences.deployment.includes("Azure")}
            onChange={(e) =>
              handleCheckboxChange("deployment", "Azure", e.target.checked)
            }
            icon={<UncheckedLabel>Azure</UncheckedLabel>}
            checkedIcon={<CheckedLabel>Azure</CheckedLabel>}
          />
        </Box>
      </Box>
    </Box>
  );
}
