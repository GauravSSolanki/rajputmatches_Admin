import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const EditStory = () => {
  const { updateData, storyId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const Base_url =
    process.env.REACT_APP_BASE_URL || "http://localhost:5000/admin";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const regexRules = {
      title: /^[a-zA-Z0-9 ,._\s]{0,30}$/, // Max 50 characters for title
      description: /^[a-zA-Z0-9 ,._\s]{0,100}$/, // Max 100 characters for description
    };
  
    if (regexRules[name] && regexRules[name].test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  useEffect(() => {
    const fetchStory = async () => {
      try {
        console.log(storyId);
        let route = "getStory";
        const response = await updateData(route, storyId);
        // console.log(response);
        const { title, description } = response.user;
        setFormData({ title, description, avatar: null });
      } catch (error) {
        console.error(
          "Error fetching story:",
          error.response?.data?.message || error.message
        );
        toast.error("Error fetching the story. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  const handleImageChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    try {
      const token = localStorage.getItem("adminAuthToken");
      const response = await axios.put(
        `${Base_url}/update-story/${storyId}`,
        {
          title: formData.title,
          description: formData.description,
          avatar: formData.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      navigate("/Success/Success-Stories");
    } catch (error) {
      console.error(
        "Error updating story:",
        error.response?.data?.message || error.message
      );
      toast.error("Error updating the story. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12 m-auto col-sm-8 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>Edit Success Story</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength="500"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="image">Upload Image</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        className="form-control"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Story
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditStory;
