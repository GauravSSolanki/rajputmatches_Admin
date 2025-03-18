import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

const Limits = () => {
  const { fetchUserData, updateData } = useAuth();
  const [limits, setLimits] = useState({
    freeMessageLimit: 0,
    freeProfileViews: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const route = "limits";
    const data = await fetchUserData(route);
    if (data) {
      setLimits({
        freeMessageLimit: data.freeMessageLimit || 0,
        freeProfileViews: data.freeProfileViews || 0,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value.replace(/\D/, ""); // Allow only digits
    numericValue =
      numericValue === ""
        ? 0
        : Math.min(999, Math.max(0, Number(numericValue)));

    setLimits((prevLimits) => ({
      ...prevLimits,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const route = "limits/update";
      const result = await updateData(route, limits);
      if (result) setLimits(result);
      fetchData();
    } catch (error) {
      console.error("Error updating limits:", error);
    }
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 m-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Free Limit</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    {/* <div className="form-group">
                      <label>Free Message Limit (0-999)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="freeMessageLimit"
                        value={limits.freeMessageLimit}
                        onChange={handleInputChange}
                        min="0"
                        max="999"
                      />
                    </div> */}
                    <div className="form-group">
                      <label>Free Request Limit(0-999)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="freeProfileViews"
                        value={limits.freeProfileViews}
                        onChange={handleInputChange}
                        min="0"
                        max="999"
                      />
                    </div>
                  </div>
                  <div className="card-footer text-right">
                    <button className="btn btn-primary mr-1" type="submit">
                      Update Limits
                    </button>
                  </div>
                </form>
              </div>

              {/* Display Current Limits */}
              <div className="card mt-4">
                <div className="card-header">
                  <h4>Current Limits</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Free Message Limit:</strong>{" "}
                    {limits.freeMessageLimit}
                  </p>
                  <p>
                    <strong>Free Profile Views:</strong>{" "}
                    {limits.freeProfileViews}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Limits;
