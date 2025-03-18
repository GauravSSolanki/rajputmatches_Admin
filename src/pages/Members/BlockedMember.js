import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const BlockedMember = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchUserData, updateData } = useAuth();

  const fetchData = async () => {
    const route = "blocked-profile";
    const data = await fetchUserData(route);
    console.log("blocked", data);
    setLoading(false);
    setMembers(data.user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = async (memberId) => {
    try {
      const route = `view-member`;
      const result = await updateData(route, memberId);
      console.log("Blocked member:", result);
      setMembers((prev) =>
        prev.map((member) =>
          member._id === memberId ? { ...member, isbloacked: false } : member
        )
      );
    } catch (error) {
      console.log("Error blocking member:", error);
    }
  };

  const handleBlock = async (memberId) => {
    try {
      const route = `block-member`;
      const result = await updateData(route, memberId);
      console.log("Blocked member:", result);
      fetchData();
    } catch (error) {
      console.log("Error blocking member:", error);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      const route = `delete-member`;
      const result = await updateData(route, memberId);
      console.log("Deleted member with ID:", result);
      fetchData();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Blocked Members</h4>
                    <div className="card-header-action">
                      <Link to="/Members/Add-Members" className="btn btn-primary">
                        Add Members
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "300px",
                        }}
                      >
                        <div
                          className="spinner-border"
                          style={{ width: "3rem", height: "3rem" }}
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table
                          className="table table-striped table-hover"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Status</th>
                              <th>Approval Status</th>
                              <th>Image</th>
                              <th>MatarID</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Email</th>
                              <th>Subscribed</th>
                              <th>Status</th>
                              <th>Options</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {members.map((member, index) => (
                              <tr key={member._id}>
                                <td>{index + 1}</td>
                                <td>
                                  <div
                                    className={`badge badge-$
                                      {member.isbloacked ? "danger" : "success"} badge-shadow`}
                                  >
                                    {member.isbloacked
                                      ? "Blocked"
                                      : "Available"}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    className={`badge badge-$
                                      {member.isApproved ? "success" : "warning"} badge-shadow`}
                                  >
                                    {member.isApproved
                                      ? "Approved"
                                      : "Not Approved"}
                                  </div>
                                </td>
                                <td>
                                  <img
                                    alt="avatar"
                                    src={member.avatar || "/default-avatar.png"}
                                    width="45"
                                    height="45"
                                    style={{
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </td>
                                <td>{member.martrId}</td>
                                <td>
                                  {member.firstName} {member.lastName}
                                </td>
                                <td>{member.gender}</td>
                                <td>{member.email}</td>
                                <td>
                                  <div
                                    className={`badge badge-$
                                      {member.isSubscribed ? "success" : "danger"} badge-shadow`}
                                  >
                                    {member.isSubscribed
                                      ? "Subscribed"
                                      : "Not Subscribed"}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    className={`badge badge-$
                                      {member.isEnable ? "success" : "warning"} badge-shadow`}
                                  >
                                    {member.isEnable ? "Active" : "Inactive"}
                                  </div>
                                </td>
                                <td>
                                  <div className="btn-group">
                                    <button
                                      className="btn btn-success dropdown-toggle"
                                      type="button"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      Options
                                    </button>
                                    <div className="dropdown-menu">
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleView(member._id)}
                                      >
                                        View
                                      </button>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleBlock(member._id)}
                                      >
                                        Unblock
                                      </button>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleDelete(member._id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td>{member.view}</td>
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
    </>
  );
};

export default BlockedMember;
