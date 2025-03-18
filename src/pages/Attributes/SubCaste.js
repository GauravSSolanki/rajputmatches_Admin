import React, { useState } from "react";

const SubCaste = () => {
  const [subCastes, setSubCastes] = useState([]);
  const [newSubCaste, setNewSubCaste] = useState("");

  const handleInputChange = (e) => {
    setNewSubCaste(e.target.value);
  };

  const handleAddSubCaste = () => {
    if (newSubCaste.trim() === "") {
      alert("Sub-Caste name cannot be empty.");
      return;
    }

    const newEntry = { id: subCastes.length + 1, name: newSubCaste };
    setSubCastes([...subCastes, newEntry]);
    setNewSubCaste(""); // Clear the input field
  };

  const handleDeleteSubCaste = (id) => {
    setSubCastes(subCastes.filter((subCaste) => subCaste.id !== id));
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            {/* Form Section */}
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>Add New Sub-Caste</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter sub-caste name"
                      value={newSubCaste}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="card-footer text-right">
                  <button
                    className="btn btn-primary mr-1"
                    onClick={handleAddSubCaste}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-Caste List Section */}
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>All Sub-Castes</h4>
                </div>
                <div className="card-body">
                  {subCastes.length === 0 ? (
                    <p>No sub-castes available. Add a new one!</p>
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
                          {subCastes.map((subCaste) => (
                            <tr key={subCaste.id}>
                              <td>{subCaste.id}</td>
                              <td>{subCaste.name}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleDeleteSubCaste(subCaste.id)
                                  }
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

export default SubCaste;
