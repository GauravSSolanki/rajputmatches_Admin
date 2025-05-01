import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

const FreeMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({
    block: null,
    delete: null,
    approve: null,
  });

  const { fetchUserData, updateData } = useAuth();
  const fetchData = async () => {
    const route = "profile";
    const data = await fetchUserData(route);
    console.log(data?.user);
    setLoading(false);
    setMembers(data?.user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBlock = async (memberId) => {
    setActionLoading((prev) => ({ ...prev, block: memberId }));
    try {
      const route = `block-member`;
      const result = await updateData(route, memberId);
      console.log("Blocked member:", result);
      fetchData();
    } catch (error) {
      console.log("Error blocking member:", error);
    } finally {
      setActionLoading((prev) => ({ ...prev, block: null }));
    }
  };

  const handleDelete = async (memberId) => {
    setActionLoading((prev) => ({ ...prev, delete: memberId }));
    try {
      const route = `delete-member`;
      const result = await updateData(route, memberId);
      console.log("Deleted member:", result);
      fetchData();
    } catch (error) {
      console.error("Error deleting member:", error);
    } finally {
      setActionLoading((prev) => ({ ...prev, delete: null }));
    }
  };

  const handleApprove = async (memberId) => {
    setActionLoading((prev) => ({ ...prev, approve: memberId }));
    try {
      const route = `Approve-member`;
      const result = await updateData(route, memberId);
      console.log("Approved member:", result);
      fetchData();
    } catch (error) {
      console.error("Error approving member:", error);
    } finally {
      setActionLoading((prev) => ({ ...prev, approve: null }));
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
                    <h4>Free Members</h4>
                    <div className="card-header-action">
                      <Link
                        to="/Members/Add-Members"
                        className="btn btn-primary"
                      >
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
                            {members?.map((member, index) => (
                              <tr key={member._id}>
                                <td>{index + 1}</td>
                                <td>
                                  <div
                                    className={`badge badge-${
                                      member.isApproved ? "success" : "danger"
                                    } badge-shadow`}
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
                                    className={`badge badge-${
                                      member.isSubscribed ? "success" : "danger"
                                    } badge-shadow`}
                                  >
                                    {member.isSubscribed
                                      ? "Subscribed"
                                      : "Not Subscribed"}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    className={`badge badge-${
                                      member.isEnable ? "success" : "warning"
                                    } badge-shadow`}
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
                                      <a className="dropdown-item"></a>
                                      <Link
                                        to={`/Members/View-Members/${member._id}`}
                                        className="dropdown-item"
                                      >
                                        View
                                      </Link>
                                      <a
                                        className={`dropdown-item ${
                                          actionLoading.block === member._id
                                            ? "disabled"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          actionLoading.block !== member._id &&
                                          handleBlock(member._id)
                                        }
                                      >
                                        {actionLoading.block === member._id
                                          ? "Blocking..."
                                          : "Block"}
                                      </a>

                                      <a
                                        className={`dropdown-item ${
                                          actionLoading.delete === member._id
                                            ? "disabled"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          actionLoading.delete !== member._id &&
                                          handleDelete(member._id)
                                        }
                                      >
                                        {actionLoading.delete === member._id
                                          ? "Deleting..."
                                          : "Delete"}
                                      </a>

                                      <a
                                        className={`dropdown-item ${
                                          actionLoading.approve === member._id
                                            ? "disabled"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          actionLoading.approve !==
                                            member._id &&
                                          handleApprove(member._id)
                                        }
                                      >
                                        {actionLoading.approve === member._id
                                          ? "Approving..."
                                          : "Approve"}
                                      </a>
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

export default FreeMembers;
