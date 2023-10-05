import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  // get blog details
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);
console.log("update--"+inputs.image);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //image input change
  const handleImageUpdate = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setInputs((prevInputs) => ({
        ...prevInputs,
        image: reader.result, // Save the image as base64 or similar
      }));
    };

    reader.readAsDataURL(file);
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("sure you want to edit this blog ?")) {
        const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        });
        if (data?.success) {
          toast.success("Blog Updated");
          navigate("/my-blogs");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update A Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            // margin="normal"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            multiline 
            onChange={handleChange}
            // margin="normal"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Update Image 
          </InputLabel>
          {/* <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          /> */}
          {inputs.image && (
            <img
              src={inputs.image} // Set the src to the image data (URL or base64)
              alt="Uploaded Image"
              style={{ maxWidth: "50%", marginBottom:"20px" }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpdate}
          />
          <br/>
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
          <br/>
          <a href="/my-blogs" >Go to Back</a> 
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
