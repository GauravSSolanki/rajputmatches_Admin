import React, { useState } from "react";

const MaritalStatuses = () => {
  const predefinedStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleAddStatus = () => {
    if (selectedStatus.trim() === "") {
      alert("Please select a marital status.");
      return;
    }

    // Check for duplicates
    if (statuses.some((status) => status.name === selectedStatus)) {
      alert("This marital status is already added.");
      return;
    }

    const newEntry = { id: statuses.length + 1, name: selectedStatus };
    setStatuses([...statuses, newEntry]);
    setSelectedStatus(""); // Reset the selection
  };

  const handleDeleteStatus = (id) => {
    setStatuses(statuses.filter((status) => status.id !== id));
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            {/* Form Section */}
            <div className="col-12 col-md-6 m-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Add New Marital Status</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Select Marital Status</label>
                    <select
                      className="form-control"
                      value={selectedStatus}
                      onChange={handleSelectChange}
                    >
                      <option value="">-- Select Status --</option>
                      {predefinedStatuses.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="card-footer text-right">
                  <button
                    className="btn btn-primary mr-1"
                    onClick={handleAddStatus}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Marital Status List Section */}
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>All Marital Statuses</h4>
                </div>
                <div className="card-body">
                  {statuses.length === 0 ? (
                    <p>No marital statuses available. Add a new one!</p>
                  ) : (
                    <div className="table-responsive">
                      <table
                        className="table table-striped table-hover"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Options</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statuses.map((status) => (
                            <tr key={status.id}>
                              <td>{status.id}</td>
                              <td>{status.name}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteStatus(status.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default MaritalStatuses;
