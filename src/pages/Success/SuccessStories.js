import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

const SuccessStories = () => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const { fetchUserData, updateData, setStoryId } = useAuth();

  const fetchData = async () => {
    const route = "getallstory";
    try {
      const data = await fetchUserData(route);
      setStories(data?.stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleDelete = async (storyId) => {
  //   try {
  //     const route = `admin/change-status`;
  //     await updateData(route, storyId);
  //     console.log("Deleted member with ID:", storyId);
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error deleting member:", error);
  //   }
  // };

  const toggleStatus = async (storyId) => {
    try {
      const route = `change-status`;
      await updateData(route, storyId);
      console.log("status for story with ID:", storyId);
      fetchData();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleEdit = (storyId) => {};

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Success Stories</h4>
                    <div className="card-header-action">
                      <Link to="/Success/Add-Story" className="btn btn-primary">
                        Add Success Stories
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      // Loader while data is being fetched
                      <div className="text-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      // Stories content once loading is complete
                      <div className="row">
                        {stories?.map((story) => (
                          <div key={story.id} className="col-md-4 mb-4">
                            <div className="card">
                              <img
                                src={story.image}
                                className="card-img-top"
                                alt={story.name}
                                style={{
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{story.title}</h5>
                                <p
                                  className="card-text"
                                  style={{
                                    height: "200px",
                                    overflow: "visible",
                                  }}
                                >
                                  {story.description}
                                </p>
                                <p>
                                  Status:{" "}
                                  {story?.status === true
                                    ? "Enabled"
                                    : "Disabled"}
                                </p>
                                <div className="btn-group d-flex">
                                  <button
                                    className="btn btn-info"
                                    onClick={() => setStoryId(story?._id)}
                                  >
                                    <Link
                                      className="text-white"
                                      to="/Success/Edit-Story"
                                    >
                                      Edit
                                    </Link>
                                  </button>
                                  {/* <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(story._id)}
                                  >
                                    Delete
                                  </button> */}
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => toggleStatus(story?._id)}
                                  >
                                    {story?.status === true
                                      ? "Disable"
                                      : "Enable"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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

export default SuccessStories;
