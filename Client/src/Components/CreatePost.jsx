import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  IconButton,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import axios from "axios";

// Custom styles for the component
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "Technology",
  "Music",
  "Art",
  "Languages",
  "Cooking",
  "Photography",
];
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function CreatePost({ open, handleClose, user, onCreatePost }) {
  // state variables
  const [availabilities, setAvailabilities] = useState([
    { day: "", fromTime: "", toTime: "" },
  ]);
  const [learn, setLearn] = useState("");
  const [teach, setTeach] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerName, setBannerName] = useState("");

  // add new availability for user to input
  const handleAddAvailability = () => {
    setAvailabilities([
      ...availabilities,
      { day: "", fromTime: "", toTime: "" },
    ]);
  };

  // remove availability that was added
  const handleRemoveAvailability = (index) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities.splice(index, 1);
    setAvailabilities(newAvailabilities);
  };

  // change availability
  const handleAvailabilityChange = (index, field, value) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities[index][field] = value;
    setAvailabilities(newAvailabilities);
  };

  // submit post to the backend to be saved in the db
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("availabilities", JSON.stringify(availabilities));
    formData.append("learn", learn);
    formData.append("teach", teach);
    formData.append("description", description);
    if (banner) {
      formData.append("banner", banner);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/posts`,
        formData,
        config
      );
      handleClose(); // Close modal after submit
      onCreatePost(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBanner(file);
      setBannerName(file.name);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Create a Post
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 1, color: "#666" }}>
          Please note that it is better to select at least two available days.
        </Typography>
        {availabilities.map((availability, index) => (
          <Box key={index}>
            <FormControl fullWidth margin="normal">
              <InputLabel
                sx={{
                  "&.Mui-focused": { color: "#07484A" }, // Focused label color
                }}
              >
                Available Day of the Week
              </InputLabel>
              <Select
                value={availability.day}
                onChange={(e) =>
                  handleAvailabilityChange(index, "day", e.target.value)
                }
                input={
                  <OutlinedInput
                    label="Available Day of the Week"
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#07484A", // Border color when the component is focused
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#07484A", // Border color on hover
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#07484A", // Normal state border color
                      },
                      color: "#07484A", // Text color
                    }}
                  />
                }
                MenuProps={MenuProps}
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: "flex", gap: 0.5 }}>{selected}</Box>
                  );
                }}
              >
                {daysOfWeek.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "rgba(7, 72, 74, 0.62)", // Background color when selected
                        color: "#07484A", // Text color when selected
                        "&:hover": {
                          backgroundColor: "rgba(7, 72, 74, 0.82)", // Darken background on hover when selected
                        },
                      },
                      "&:hover": {
                        backgroundColor: "rgba(7, 72, 74, 0.42)", // Background color on hover
                      },
                      color: "#07484A", // Text color
                    }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="From"
                type="time"
                value={availability.fromTime}
                onChange={(e) =>
                  handleAvailabilityChange(index, "fromTime", e.target.value)
                }
                sx={{
                  flexGrow: 1,
                  width: "100px",
                  maxWidth: "150px",
                  marginRight: "5px",
                  "& label.Mui-focused": {
                    color: "#07484A",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#07484A",
                    },
                    "&:hover fieldset": {
                      borderColor: "#07484A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#07484A",
                    },
                    "& .MuiInputBase-input": {
                      color: "#07484A",
                    },
                    "& .MuiInputBase-root": {
                      backgroundColor: "rgba(7, 72, 74, 0.12)", // Lighter background for input
                    },
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="To"
                type="time"
                value={availability.toTime}
                onChange={(e) =>
                  handleAvailabilityChange(index, "toTime", e.target.value)
                }
                sx={{
                  flexGrow: 1,
                  width: "100px",
                  maxWidth: "150px",
                  margin: "0px",
                  marginLeft: "5px",
                  marginRight: "5px",
                  "& label.Mui-focused": {
                    color: "#07484A",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#07484A",
                    },
                    "&:hover fieldset": {
                      borderColor: "#07484A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#07484A",
                    },
                    "& .MuiInputBase-input": {
                      color: "#07484A",
                    },
                    "& .MuiInputBase-root": {
                      backgroundColor: "rgba(7, 72, 74, 0.12)", // Lighter background for input
                    },
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
              {availabilities.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveAvailability(index)}
                  color="error"
                  sx={{
                    color: "#07484A",
                    padding: "4px",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "rgba(7, 72, 74, 0.2)",
                      borderRadius: "50%",
                    },
                    maxWidth: "30px",
                    width: "30px",
                    height: "24px",
                  }}
                >
                  <RemoveCircleOutline />
                </IconButton>
              )}
              {index === availabilities.length - 1 &&
                availabilities.length < 3 && (
                  <IconButton
                    onClick={handleAddAvailability}
                    color="primary"
                    sx={{
                      color: "#07484A",
                      padding: "4px",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "rgba(7, 72, 74, 0.2)",
                        borderRadius: "50%",
                      },
                      maxWidth: "30px",
                      width: "30px",
                      height: "24px",
                    }}
                  >
                    <AddCircleOutline />
                  </IconButton>
                )}
            </Box>
          </Box>
        ))}

        <FormControl fullWidth margin="normal">
          <TextField
            label="Looking to Learn"
            value={learn}
            onChange={(e) => setLearn(e.target.value)}
            sx={{
              "& label.Mui-focused": {
                color: "#07484A",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#07484A",
                },
                "&:hover fieldset": {
                  borderColor: "#07484A",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#07484A",
                },
                "& .MuiInputBase-input": {
                  color: "#07484A",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(7, 72, 74, 0.62)",
                },
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Willing to Teach"
            value={teach}
            onChange={(e) => setTeach(e.target.value)}
            sx={{
              "& label.Mui-focused": {
                color: "#07484A",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#07484A",
                },
                "&:hover fieldset": {
                  borderColor: "#07484A",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#07484A",
                },
                "& .MuiInputBase-input": {
                  color: "#07484A",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(7, 72, 74, 0.62)",
                },
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& label.Mui-focused": {
                color: "#07484A",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#07484A",
                },
                "&:hover fieldset": {
                  borderColor: "#07484A",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#07484A",
                },
                "& .MuiInputBase-input": {
                  color: "#07484A",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(7, 72, 74, 0.62)",
                },
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="banner-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="banner-upload">
            <Button
              variant="outlined"
              component="span"
              sx={{
                borderColor: "#07484A",
                color: "#07484A",
                "&:hover": {
                  borderColor: "#063639",
                  backgroundColor: "rgba(7, 72, 74, 0.1)",
                },
              }}
            >
              Upload Banner
            </Button>
          </label>
          {bannerName && (
            <Typography variant="caption" display="block" gutterBottom>
              {bannerName}
            </Typography>
          )}
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            backgroundColor: "#07484A",
            color: "white",
            "&:hover": {
              backgroundColor: "#0b5b4399",
            },
            display: "block",
            mx: "auto", // Center button horizontally
          }}
        >
          Submit Post
        </Button>
      </Box>
    </Modal>
  );
}

export default CreatePost;
