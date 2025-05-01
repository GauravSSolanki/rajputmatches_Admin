import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const TermsAndPrivacy = () => {
  const { updateData, fetchUserData } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "terms-of-use",
  });
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showError = (err, fallback) => {
    const msg = err?.response?.data?.message || err?.message || fallback;
    toast.error(msg);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData?.title?.trim() || !formData?.content?.trim()) {
      return toast.error("Title and content are required.");
    }

    const toastId = toast.loading("Saving policy...");
    try {
      setLoading(true);
      const res = await updateData?.(`terms/${formData?.slug}`, formData);
      if (res?.success) {
        toast.success("Policy saved successfully!", { id: toastId });
        await fetchPages();
        setFormData({
          title: "",
          content: "",
          slug: "terms-of-use",
        });
      } else throw new Error();
    } catch (err) {
      toast.error("Failed to save policy.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem("adminAuthToken");

  const handleDelete = async (url) => {
    try {
      const token = getToken();
      if (!token) {
        console.warn("No token found. Aborting delete.");
        return { success: false, error: "Unauthorized" };
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/terms/${url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        await fetchPages();
        return { success: true };
      } else {
        console.warn("Delete failed on server:", response?.data?.message);
        return {
          success: false,
          error: response?.data?.message || "Delete failed",
        };
      }
    } catch (error) {
      console.error("Delete request failed:", error);
      return { success: false, error: error.message || "Unknown error" };
    }
  };

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetchUserData("terms");
      console.log(res);
      setPages(res?.data);
      console.log(pages);
    } catch (err) {
      showError(err, "Failed to fetch pages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>Add / Edit Terms or Privacy Policy</h4>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <div
                        className="spinner-border"
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    </div>
                  ) : (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block font-medium mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            required
                            value={formData.title}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block font-medium mb-1">
                            Content
                          </label>
                          <textarea
                            name="content"
                            className="form-control"
                            rows="4"
                            required
                            value={formData.content}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block font-medium mb-1">Slug</label>
                          <select
                            name="slug"
                            className="form-control"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                          >
                            <option value="terms-of-use">Terms of Use</option>
                            <option value="privacy-policy">
                              Privacy Policy
                            </option>
                          </select>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                      {!!pages?.length && (
                        <div className="mt-5">
                          {["terms-of-use", "privacy-policy"].map((slugKey) => {
                            const filteredPages = pages.filter(
                              (page) => page.slug === slugKey
                            );
                            if (!filteredPages.length) return null;

                            return (
                              <div key={slugKey} className="mb-5">
                                <h3 className="mb-3 text-dark">
                                  {slugKey === "terms-of-use"
                                    ? "Terms of Use"
                                    : "Privacy Policy"}
                                </h3>
                                <ul style={{ paddingLeft: 0 }}>
                                  {filteredPages.map((page, idx) => (
                                    <li
                                      key={page._id || idx}
                                      className="bg-white text-dark mb-3 p-3 rounded relative"
                                      style={{ listStyle: "none" }}
                                    >
                                      <h5>{page.title}</h5>
                                      <p>{page.content}</p>
                                      <button
                                        onClick={() => handleDelete(page._id)}
                                        className="btn btn-primary"
                                      >
                                        Delete
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndPrivacy;
