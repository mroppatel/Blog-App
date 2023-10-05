import BlogDetails from "./Pages/BlogDetails";
import Blogs from "./Pages/Blogs";
import CreateBlog from "./Pages/CreateBlog";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserBlogs from "./Pages/UserBlogs";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AllUsers from "./components/AllUsers";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/desh-board" element={<AllUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
