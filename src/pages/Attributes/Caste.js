import React, { useState } from "react";

const Caste = () => {
  const [castes, setCastes] = useState([]);
  const [newCaste, setNewCaste] = useState("");

  const handleInputChange = (e) => {
    setNewCaste(e.target.value);
  };

  const handleAddCaste = () => {
    if (newCaste.trim() === "") {
      alert("Caste name cannot be empty.");
      return;
    }

    const newEntry = { id: castes.length + 1, name: newCaste };
    setCastes([...castes, newEntry]);
    setNewCaste(""); // Clear the input field
  };

  const handleDeleteCaste = (id) => {
    setCastes(castes.filter((caste) => caste.id !== id));
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
                  <h4>Add New Caste</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter caste name"
                      value={newCaste}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="card-footer text-right">
                  <button
                    className="btn btn-primary mr-1"
                    onClick={handleAddCaste}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Caste List Section */}
            <div className="col-12 col-md-6 m-auto">
              <div className="card">
                <div className="card-header">
                  <h4>All Castes</h4>
                </div>
                <div className="card-body">
                  {castes.length === 0 ? (
                    <p>No castes available. Add a new one!</p>
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
                          {castes.map((caste) => (
                            <tr key={caste.id}>
                              <td>{caste.id}</td>
                              <td>{caste.name}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteCaste(caste.id)}
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

export default Caste;
