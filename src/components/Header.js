import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import { FaBars, FaExpand, FaRegEnvelope } from "react-icons/fa";
import { FaBell, FaUser, FaChevronRight } from "react-icons/fa";

import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { logout, fetchUserData, updateData } = useAuth();
  const isLoggedIn = !!localStorage.getItem("token");

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const fetchNotifications = async () => {
    try {
      const data = await fetchUserData("notifications"); // Replace with your API call
      setNotifications(data);
      setUnreadCount(data.filter((notif) => !notif.isRead).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await updateData("notifications/mark-all-read", {}); // Replace with your API call
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  var visibleNotifications = notifications?.slice(0, 4);

  return (
    <>
      <div className="navbar-bg"></div>

      <nav className="navbar navbar-expand-lg main-navbar sticky">
        <div className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li>
              <Link
                to="#"
                data-toggle="sidebar"
                className="nav-link nav-link-lg collapse-btn text-dark"
              >
                <FaBars style={{ color: "#333" }} />
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className="nav-link nav-link-lg fullscreen-btn text-dark"
              >
                <FaExpand style={{ color: "#333" }} />
              </Link>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav navbar-right">
          <li className="dropdown dropdown-list-toggle">
            <Link
              to="#"
              data-toggle="dropdown"
              className="nav-link notification-toggle nav-link-lg"
            >
              <FaBell color="black" />
              {unreadCount > 0 && (
                <span className="badge badge-danger">{unreadCount}</span>
              )}
            </Link>

            <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
              <div className="dropdown-header">
                Notifications
                <div className="float-right">
                  <Link to="#" onClick={markAllAsRead}>
                    Mark All As Read
                  </Link>
                </div>
              </div>

              <div
                className="dropdown-list-content dropdown-list-icons"
                style={{
                  height: "300px",
                  overflowY: "scroll",
                }}
              >
                {visibleNotifications?.length > 0 ? (
                  (showAll ? notifications : visibleNotifications).map(
                    (notif, index) => (
                      <Link
                        to="#"
                        key={index}
                        className={`dropdown-item ${
                          notif.isRead ? "" : "dropdown-item-unread"
                        }`}
                      >
                        <span className="dropdown-item-icon bg-primary text-white">
                          {notif.avatar ? (
                            <img
                              src={notif.avatar}
                              alt="User Avatar"
                              className="rounded-circle"
                              style={{ width: "30px", height: "30px" }}
                            />
                          ) : (
                            <FaUser />
                          )}
                        </span>
                        <span className="dropdown-item-desc">
                          <strong>{notif.userId.email}</strong> {notif.message}
                          <span className="time">{notif.time}</span>
                        </span>
                      </Link>
                    )
                  )
                ) : (
                  <p className="text-center p-2">No notifications</p>
                )}
              </div>

              {/* <div className="dropdown-footer text-center">
                {notifications.length > 4 && (
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAll(!showAll);
                    }}
                  >
                    {showAll ? "Show Less" : "View All"} <FaChevronRight />
                  </Link>
                )}
              </div> */}
              <div className="dropdown-footer text-center">
                {notifications?.length > 4 && (
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevents dropdown from closing
                      setShowAll(!showAll);
                    }}
                  >
                    {showAll ? "Show Less" : "View All"} <FaChevronRight />
                  </Link>
                )}
              </div>
            </div>
          </li>

          <li className="dropdown">
            <Link
              to="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              <img
                alt="User"
                src={require("../images/demoprofile.jpg")}
                className="user-img-radious-style"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-right pullDown">
              {/* <div className="dropdown-title">Hello Sarah Smith</div>
            <Link to="profile.html" className="dropdown-item has-icon">
              <i className="fa fa-user"></i> Profile
            </Link>
            <Link to="timeline.html" className="dropdown-item has-icon">
              <i className="fas fa-bolt"></i> Activities
            </Link>
            <Link to="#" className="dropdown-item has-icon">
              <i className="fas fa-cog"></i> Settings
            </Link>
            <div className="dropdown-divider"></div> */}
              <Link
                to="Members/Create-New-Admin"
                className="dropdown-item has-icon text-success"
              >
                <i className="fas fa-user-shield text-lg"></i>
                Add New Admin
              </Link>
              <Link
                to="#"
                onClick={logout}
                className="dropdown-item has-icon text-danger"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </div>
          </li>
        </ul>

        <li className="dropdown dropdown-list-toggle">
          {/* <Link to="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg">
          <i className="fa fa-bell"></i>
          {unreadCount > 0 && <span className="badge headerBadge1">{unreadCount}</span>}
        </Link> */}
          {/* <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
          <div className="dropdown-header">
            Notifications
            <div className="float-right">
              <Link to="#" onClick={markAllAsRead}>Mark All As Read</Link>
            </div>
          </div>
          <div className="dropdown-list-content dropdown-list-icons">
            {notifications.map((notif) => (
              <Link to="#" key={notif._id} className="dropdown-item">
                <span className={`dropdown-item-icon bg-${notif.isRead ? "secondary" : "primary"} text-white`}>
                  <i className="fa fa-info-circle"></i>
                </span>
                <span className="dropdown-item-desc">
                  {notif.message}
                  <span className="time">{new Date(notif.createdAt).toLocaleString()}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="dropdown-footer text-center">
            <Link to="#">View All <i className="fas fa-chevron-right"></i></Link>
          </div>
        </div> */}
        </li>
      </nav>

      <div className="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <Link to="/dashboard">
              {/* <span className="logo-name">Rajput Matches</span> */}
              <img
                alt="User"
                src={require("../images/image.png")}
                className=""
                style={{
                  width: "168px",
                }}
              />
            </Link>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header">Main</li>
            <li className="dropdown active">
              <Link to="/dashboard" className="nav-link">
                <i className="fa fa-desktop"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="dropdown">
              <Link to="#" className="menu-toggle nav-link has-dropdown">
                <i className="fa fa-users"></i>
                <span>Members</span>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="nav-link" to="/Members/Free-Members">
                    Free Members
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/Members/Blocked-Members">
                    Blocked Members
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/Members/Deleted-Members">
                    Deleted Members
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu-header">Profile Attributes</li>
            <li className="dropdown">
              <Link to="#" className="menu-toggle nav-link has-dropdown">
                <i className="fa fa-user"></i>
                <span>Profile Attributes</span>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="nav-link" to="/Attributes/limit">
                    Limits
                  </Link>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="/Success/Success-Stories" className="nav-link">
                <i className="fa fa-trophy"></i>
                <span>Success Stories</span>
              </Link>
            </li>

            <li className="dropdown">
              <Link to="/Contact/Contactus" className="nav-link">
                <i className="fa fa-envelope"></i>
                <span>Contact Me</span>
              </Link>
            </li>

            <li className="dropdown">
              <Link to="terms-of-use" className="nav-link">
                <i className="fa fa-gavel"></i>
                <span>Terms of Use</span>
              </Link>
            </li>

            <li className="dropdown">
              <Link to="/Site-Setting/Site-Setting" className="nav-link">
                <i className="fa fa-cogs"></i>
                <span>Site Setting</span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Header;
