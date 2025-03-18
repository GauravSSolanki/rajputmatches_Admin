import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddStory = () => {
  const Base_url =
    process.env.REACT_APP_BASE_URL || "http://localhost:5000/admin";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const regexRules = {
      title: /^[a-zA-Z0-9 ,._\s]{0,40}$/, // Max 50 characters for title
      description: /^[a-zA-Z0-9 ,._\s]{0,100}$/, // Max 100 characters for description
    };
  
    if (regexRules[name] && regexRules[name].test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleImageChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const getToken = () => {
    return localStorage.getItem("adminAuthToken");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    } else {
      alert("Please upload an image!");
      return;
    }

    try {
      const token = getToken();
      console.log("Submitting story data:", formDataToSend);
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        `${Base_url}/stories`,
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

      if (response.data?.message) {
        toast.success(response.data.message);
      }
      console.log("Story submitted successfully:", response.data);
      setFormData({ title: "", description: "", avatar: null });
      alert("Story added successfully!");
    } catch (error) {
      console.error(
        "Error submitting story:",
        error.response?.data?.message || error.message
      );
      alert("Error submitting the story. Please try again.");
    }
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-body">
            <div className="row">
              <div className="col-10 m-auto col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Add Success Story</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Title</label>
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
                          rows="5"
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
                          onChange={(e) => {
                            handleImageChange(e);
                          }}
                          accept="image/*"
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Save Story
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddStory;
