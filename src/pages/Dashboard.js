import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const Dashboard = () => {
  const Base_url = process.env.REACT_APP_BASE_URL ;
  const [userCounts, setUserCounts] = useState({
    totalMembers: 0,
    freeMembers: 0,
    blockedMembers: 0,
    premiumMembers: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchUserCounts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${Base_url}/dashboard/user-counts`
      );
      // console.log(response);
      setUserCounts(response?.data?.data);
    } catch (error) {
      console.error("Error fetching user counts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCounts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace with a loader or spinner
  }

  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="card">
              <div className="card-statistic-4">
                <div className="align-items-center justify-content-between">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                      <div className="card-content">
                        <h5 className="font-15">Total Members</h5>
                        <h2 className="mb-3 font-18">
                          {userCounts.totalMembers}
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                      <div className="banner-img">
                        <img src="assets/img/banner/1.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Free Members */}
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="card">
              <div className="card-statistic-4">
                <div className="align-items-center justify-content-between">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                      <div className="card-content">
                        <h5 className="font-15">Free Members</h5>
                        <h2 className="mb-3 font-18">
                          {userCounts.freeMembers}
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                      <div className="banner-img">
                        <img src="assets/img/banner/3.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blocked Members */}
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="card">
              <div className="card-statistic-4">
                <div className="align-items-center justify-content-between">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                      <div className="card-content">
                        <h5 className="font-15">Blocked Members</h5>
                        <h2 className="mb-3 font-18">
                          {userCounts.blockedMembers}
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                      <div className="banner-img">
                        <img src="assets/img/banner/4.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Members */}
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="card">
              <div className="card-statistic-4">
                <div className="align-items-center justify-content-between">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                      <div className="card-content">
                        <h5 className="font-15">Premium Members</h5>
                        <h2 className="mb-3 font-18">
                          {userCounts.premiumMembers}
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                      <div className="banner-img">
                        <img src="assets/img/banner/2.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
