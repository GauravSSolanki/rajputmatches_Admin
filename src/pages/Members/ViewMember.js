import React, { useState, useEffect } from "react";
// import { MdOutlineCancelPresentation } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom"; // Added useParams
import { useAuth } from "../AuthContext";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { LuBadgeCheck } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function ViewMember() {
  const { updateData } = useAuth();
  const [error, setError] = useState(null);
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [details, setDetails] = useState({});
  const [activedetails, setActivedetails] = useState("Basic");
  const [paternaldetails, setPaternaldetails] = useState({});
  const [Data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [documents, setdocuments] = useState([]);
  const [isApproved, setisApproved] = useState(false);

  const handleView = async () => {
    try {
      const route = `view-member`;
      console.log(profileId);
      const result = await updateData(route, profileId);
      var response = result.user;
      console.log("view", response);
      if (!response) {
        setLoading(false);
        return;
      }

      const formattedHeight = response.height
        ? `${response.height.feet} feet ${response.height.inches} inches`
        : "N/A";

      const formattedDateOfBirth = response.dateOfBirth
        ? new Date(response.dateOfBirth)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
            .replace(/ /g, "-")
        : "N/A";

      setData(response);
      setisApproved(response?.isApproved);
      setImages(response?.filesId?.photos || []);
      setdocuments(response?.filesId?.documents || []);

      if (response?.paternaldetails) {
        setPaternaldetails(response?.paternaldetails);
      }

      setFormData({
        matrimonialid: response.martrId || "N/A",
        name: `${response.firstName || ""} ${response.middleName || ""} ${
          response.lastName || ""
        }`.trim(),
        dateOfBirth: formattedDateOfBirth,
        mobile: response.mobile || "N/A",
        email: response.email || "N/A",
        height: formattedHeight,
        weight: response.weight || "N/A",
        maritalStatus: response.maritalStatus || "N/A",
        address:
          `${response.address?.city || ""}, ${response.address?.state || ""}, ${
            response.address?.country || ""
          }`.trim() || "N/A",
        profileFor: response.profilefor || "N/A",
      });

      setDetails({
        matrimonialid: response.martrId || "N/A",
        name: `${response.firstName || ""} ${response.middleName || ""} ${
          response.lastName || ""
        }`.trim(),
        dateOfBirth: formattedDateOfBirth,
        mobile: response.mobile || "N/A",
        email: response.email || "N/A",
        height: formattedHeight,
        weight: response.weight || "N/A",
        maritalStatus: response.maritalStatus || "N/A",
        address:
          `${response.address?.city || ""}, ${response.address?.state || ""}, ${
            response.address?.country || ""
          }`.trim() || "N/A",
        profileFor: response.profilefor || "N/A",
      });

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const keyNameMapping = {
    grandFatherName: "Grandfather Name",
    grandFathersonOf: "Son of",
    grandFatheroccupation: "Occupation",
    grandFatherthikana: "Address",
    grandMotherName: "GrandMother Name",
    grandMotherdaughterOf: "Daughter of",
    grandmotherthikana: "Address",
    maternalGrandFatherName: "Maternal Grandfather",
    maternalGrandFathersonOf: "Son of",
    maternalGrandFatheroccupation: "Occupation",
    maternalGrandFatherthikana: "Address",
    maternalGrandMotherName: "Maternal Grandmother",
    maternalGrandMotherdaughterOf: "Daughter of",
    maternalGrandMotherthikana: "Address",
  };

  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const route = `Approve-member`;
      console.log("member", profileId);
      const result = await updateData(route, profileId);
      console.log("approve member with ID:", result);
      handleView();
    } catch (error) {
      console.error("Error approving member:", error);
    } finally {
      setLoading(false);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDetails = (type, data) => {
    setDetails(data || {});
    setActivedetails(type);
  };

  useEffect(() => {
    if (profileId) {
      handleView();
    }
  }, [profileId]);
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="text-right">
                  <div className="d-flex align-items-center">
                    <button
                      className={`col-md-2 m-2 p-1 btn ${
                        isApproved ? "btn-danger" : "btn-success"
                      }`}
                      onClick={handleApprove}
                      disabled={loading}
                    >
                      {loading
                        ? "Processing..."
                        : isApproved
                        ? "Disapprove"
                        : "Approve"}
                    </button>

                    {isApproved && <span className="text-success ms-2">✔</span>}

                    {/* Cross Icon to navigate back to Free Members */}
                    <div className="text-right">
                      <Link to="Members/Free-Members" className="ms-3">
                        <FaTimes size={26} color="black" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-md-4">
                    <div
                      id="imageCarousel"
                      className="carousel slide mx-auto w-100 shadow-lg rounded"
                      style={{ maxWidth: "600px" }}
                    >
                      <div className="carousel-inner">
                        {images.length > 0 ? (
                          images.map((image, index) => (
                            <div
                              key={index}
                              className={`carousel-item rounded shadow-sm bg-dark ${
                                index === currentIndex ? "active" : ""
                              }`}
                            >
                              <img
                                src={image.url}
                                alt="Profile Pic"
                                className="d-block w-100"
                                style={{
                                  objectFit: "contain",
                                  height: "350px",
                                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="carousel-item active rounded shadow-sm bg-dark">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/005/544/708/non_2x/profile-icon-design-free-vector.jpg"
                              alt="Blurred Placeholder"
                              className="d-block w-100"
                              style={{
                                objectFit: "contain",
                                height: "350px",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Previous Button */}
                      <button
                        onClick={prevSlide}
                        className="carousel-control-prev"
                        type="button"
                        style={{
                          color: "black",
                          filter: "invert(100%)",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <AiOutlineLeft size={40} />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="carousel-control-next"
                        type="button"
                        style={{
                          color: "black",
                          filter: "invert(100%)",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <AiOutlineRight size={40} />
                      </button>
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-3">
                      {images?.length > 0 &&
                        images?.map((image, index) => {
                          return (
                            <div key={index} className="m-2 rounded">
                              <img
                                src={image.url}
                                alt="Family Pic"
                                className="rounded-circle"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  cursor: "pointer",
                                  objectFit: "cover",
                                }}
                                onClick={() => setCurrentIndex(index)}
                              />
                            </div>
                          );
                        })}
                    </div>

                    {documents.length != 0 && (
                      <>
                        <div
                          id="carouselExampleIndicators"
                          className="carousel slide"
                          data-ride="carousel"
                        >
                          {/* <ol className="carousel-indicators">
                {documents?.map((document, index) => (
                  <li
                    key={index}
                    data-target="#carouselExampleIndicators"
                    data-slide-to={index}
                    className={index === 0 ? "active" : ""}
                  ></li>
                ))}
              </ol> */}
                          <h4 className="text-center m-1 text-dark">
                            Decuments
                          </h4>
                          <div className="carousel-inner">
                            {documents?.map((document, index) => (
                              <div
                                key={index}
                                className={`carousel-item bg-dark ${
                                  index === 0 ? "active" : ""
                                }`}
                              >
                                <img
                                  className="d-block w-100"
                                  src={document.url}
                                  alt={`Slide ${index + 1}`}
                                  style={{
                                    height: "350px",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Previous Button */}
                          <a
                            className="carousel-control-prev"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="prev"
                            style={{ filter: "invert(100%)" }} // Makes icon black
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Previous</span>
                          </a>

                          <a
                            className="carousel-control-next"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="next"
                            style={{ filter: "invert(100%)" }}
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Next</span>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-md-8 mt-2">
                    <div class="border-1" id="accordionExample">
                      <div class="d-flex shadow-md p-2 mb-2 bg-light justify-content-between align-items-center">
                        <label className="m-0">About</label>
                        <i
                          class="fas fa-chevron-down"
                          onClick={() => {
                            handleDetails("Basic", formData);
                          }}
                        ></i>
                      </div>
                      {activedetails === "Basic" && (
                        <div className="container mt-3">
                          {Object.entries(details).length > 0 ? (
                            <div className="row">
                              {Object.keys(details).map((key) => {
                                let displayValue = details[key] || "N/A";

                                return (
                                  <div className="col-6 mb-1" key={key}>
                                    <div>
                                      <h6
                                        className="mb-1"
                                        style={{
                                          fontFamily: "Lustria, serif",
                                          color: "#000",
                                        }}
                                      >
                                        {key
                                          .replace(/([A-Z])/g, " $1")
                                          .replace(/^./, (str) =>
                                            str.toUpperCase()
                                          )}
                                        {key.toLowerCase() === "weight"
                                          ? " (kg)"
                                          : ""}
                                      </h6>
                                      <p
                                        className="mb-0 fw-bold text-dark"
                                        style={{
                                          wordWrap: "break-word",
                                          overflowWrap: "break-word",
                                          whiteSpace: "normal",
                                          overflow: "hidden",
                                          fontFamily: "Open Sans, sans-serif",
                                        }}
                                      >
                                        {displayValue}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-center text-muted">Loading...</p>
                          )}
                        </div>
                      )}
                      <div className="d-flex shadow-md p-2 bg-light mb-2 justify-content-between align-items-center">
                        <label className="m-0">Horoscopic details</label>
                        <i
                          className="fas fa-chevron-down"
                          onClick={() => {
                            handleDetails("Horoscopic", Data.HoroscopicId);
                          }}
                        ></i>
                      </div>
                      {activedetails === "Horoscopic" && Data.HoroscopicId && (
                        <div className="container mt-3">
                          {Object.keys(Data.HoroscopicId).length > 0 ? (
                            <div className="row">
                              {Object.entries(Data.HoroscopicId)
                                .filter(
                                  ([key]) =>
                                    !["_id", "__v", "userId"].includes(key)
                                ) // Exclude unnecessary keys
                                .map(([key, value]) => (
                                  <div className="col-6 mb-1" key={key}>
                                    <div>
                                      <h6
                                        className="mb-1"
                                        style={{
                                          fontFamily: "Lustria, serif",
                                          color: "#000",
                                        }}
                                      >
                                        {key
                                          .replace(/([A-Z])/g, " $1")
                                          .replace(/^./, (str) =>
                                            str.toUpperCase()
                                          )}
                                      </h6>
                                      <p
                                        className="mb-0 fw-bold text-dark"
                                        style={{
                                          wordWrap: "break-word",
                                          overflowWrap: "break-word",
                                          whiteSpace: "normal",
                                          overflow: "hidden",
                                          fontFamily: "Open Sans, sans-serif",
                                        }}
                                      >
                                        {value ? value : "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted">
                              No details available
                            </p>
                          )}
                        </div>
                      )}
                      <div className="d-flex shadow-md p-2 bg-light mb-2 justify-content-between align-items-center">
                        <label className="m-0">Education & Career</label>
                        <i
                          className="fas fa-chevron-down"
                          onClick={() => {
                            handleDetails("Education", Data.profdetailsId);
                          }}
                        ></i>
                      </div>
                      {activedetails === "Education" && Data.profdetailsId && (
                        <div className="container mt-3">
                          {Object.keys(Data.profdetailsId).length > 0 ? (
                            <div className="row">
                              {Object.entries(Data.profdetailsId)
                                .filter(
                                  ([key]) =>
                                    !["_id", "__v", "userId"].includes(key)
                                ) // Exclude unnecessary keys
                                .map(([key, value]) => (
                                  <div className="col-6 mb-1" key={key}>
                                    <div>
                                      <h6
                                        className="mb-1"
                                        style={{
                                          fontFamily: "Lustria, serif",
                                          color: "#000",
                                        }}
                                      >
                                        {key
                                          .replace(/([A-Z])/g, " $1")
                                          .replace(/^./, (str) =>
                                            str.toUpperCase()
                                          )}
                                      </h6>
                                      <p
                                        className="mb-0 fw-bold text-dark"
                                        style={{
                                          wordWrap: "break-word",
                                          overflowWrap: "break-word",
                                          whiteSpace: "normal",
                                          overflow: "hidden",
                                          fontFamily: "Open Sans, sans-serif",
                                        }}
                                      >
                                        {Array.isArray(value)
                                          ? value?.length > 0
                                            ? value?.join(", ")
                                            : "N/A"
                                          : value?.trim()
                                          ? value
                                          : "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted">
                              No details available
                            </p>
                          )}
                        </div>
                      )}
                      <div className="d-flex shadow-md p-2 bg-light mb-2 justify-content-between align-items-center">
                        <label className="m-0">Family Details</label>
                        <i
                          className="fas fa-chevron-down"
                          onClick={() => {
                            handleDetails("family", Data.familyDetails);
                          }}
                        ></i>
                      </div>
                      {activedetails === "family" && Data.familyDetails && (
                        <div className="container mt-3">
                          {Object.keys(Data.familyDetails).length > 0 ? (
                            <div className="row">
                              {Object.entries(Data.familyDetails)
                                .filter(
                                  ([key]) =>
                                    !["_id", "__v", "userId"].includes(key)
                                )
                                .map(([key, value]) => (
                                  <div className="col-6 mb-1" key={key}>
                                    <div>
                                      <h6
                                        className="mb-1"
                                        style={{
                                          fontFamily: "Lustria, serif",
                                          color: "#000",
                                        }}
                                      >
                                        {key
                                          .replace(/([A-Z])/g, " $1")
                                          .replace(/^./, (str) =>
                                            str.toUpperCase()
                                          )}
                                      </h6>
                                      <p
                                        className="mb-0 fw-bold text-dark"
                                        style={{
                                          wordWrap: "break-word",
                                          overflowWrap: "break-word",
                                          whiteSpace: "normal",
                                          overflow: "hidden",
                                          fontFamily: "Open Sans, sans-serif",
                                        }}
                                      >
                                        {value ? value : "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted">
                              No details available
                            </p>
                          )}
                        </div>
                      )}
                      <div className="d-flex shadow-md p-2 bg-light mb-2 justify-content-between align-items-center">
                        <label className="m-0">Paternal Details</label>
                        <i
                          className="fas fa-chevron-down"
                          onClick={() => {
                            handleDetails("paternal", Data.paternaldetails);
                          }}
                        ></i>
                      </div>
                      {activedetails === "paternal" && (
                        <div className="container mt-3">
                          {Object.keys(details).length > 0 ? (
                            <>
                              <div className="row">
                                {Object.entries(details)
                                  .filter(
                                    ([key, value]) =>
                                      !Array.isArray(value) &&
                                      ![
                                        "_id",
                                        "__v",
                                        "userId",
                                        "updatedAt",
                                        "createdAt",
                                      ].includes(key)
                                  )
                                  .map(([key, value]) => (
                                    <div className="col-6 mb-1" key={key}>
                                      <div>
                                        <h6
                                          className="mb-1"
                                          style={{
                                            fontFamily: "Lustria, serif",
                                            color: "#000",
                                          }}
                                        >
                                          {keyNameMapping[key] ||
                                            key
                                              .replace(/([A-Z])/g, " $1")
                                              .replace(/^./, (str) =>
                                                str.toUpperCase()
                                              )}
                                        </h6>
                                        <p
                                          className="mb-0 fw-bold text-dark"
                                          style={{
                                            wordWrap: "break-word",
                                            overflowWrap: "break-word",
                                            whiteSpace: "normal",
                                            overflow: "hidden",
                                            fontFamily: "Open Sans, sans-serif",
                                          }}
                                        >
                                          {value ? value : "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                              </div>

                              {[
                                "badePapa",
                                "bhuasa",
                                "kakosa",
                                "mamosa",
                                "masisa",
                              ].some(
                                (key) =>
                                  Array.isArray(details[key]) &&
                                  details[key].length > 0
                              ) && (
                                <div className="mt-4">
                                  <h6
                                    className=" mb-2"
                                    style={{ fontFamily: "Lustria, serif" }}
                                  >
                                    Relatives Information
                                  </h6>
                                  <div style={{ overflowX: "auto" }}>
                                    <div className="table-responsive">
                                      <table
                                        className="table table-bordered d-none d-lg-table"
                                        style={{
                                          maxWidth: "100%",
                                          tableLayout: "fixed",
                                          fontSize: "clamp(8px,11px,13px)",
                                        }}
                                      >
                                        <thead className="thead-dark">
                                          <tr>
                                            {[
                                              "Relation",
                                              "Name",
                                              "Married to",
                                              "SonOf/DaughterOf",
                                              "Thikana",
                                            ].map((header) => (
                                              <th
                                                key={header}
                                                className="text-break"
                                              >
                                                {header}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {[
                                            "badePapa",
                                            "bhuasa",
                                            "kakosa",
                                            "mamosa",
                                            "masisa",
                                          ].map((relationKey) =>
                                            details[relationKey]?.length > 0
                                              ? details[relationKey].map(
                                                  (person, index) => (
                                                    <tr
                                                      key={`${relationKey}-${index}`}
                                                    >
                                                      <td className="text-break">
                                                        {relationKey
                                                          .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                          )
                                                          .replace(
                                                            /^./,
                                                            (str) =>
                                                              str.toUpperCase()
                                                          )}
                                                      </td>
                                                      <td className="text-break">
                                                        {person.name || "N/A"}
                                                      </td>
                                                      <td className="text-break">
                                                        {person.marriedto ||
                                                          "N/A"}
                                                      </td>
                                                      <td className="text-break">
                                                        {person.sonof ||
                                                          person.daughterof ||
                                                          "N/A"}
                                                      </td>
                                                      <td className="text-break">
                                                        {person.thikana ||
                                                          "N/A"}
                                                      </td>
                                                    </tr>
                                                  )
                                                )
                                              : null
                                          )}
                                        </tbody>
                                      </table>

                                      {/* Mobile view */}
                                      <div className="d-lg-none">
                                        {[
                                          "badePapa",
                                          "bhuasa",
                                          "kakosa",
                                          "mamosa",
                                          "masisa",
                                        ].map((relationKey) =>
                                          details[relationKey]?.length > 0
                                            ? details[relationKey].map(
                                                (person, index) => (
                                                  <div
                                                    key={`${relationKey}-${index}`}
                                                    className="card mb-2 border-secondary"
                                                    style={{
                                                      borderRadius: "0px",
                                                    }}
                                                  >
                                                    <div className="card-body p-2">
                                                      <p className="mb-1">
                                                        <strong>
                                                          Relation:
                                                        </strong>{" "}
                                                        {relationKey
                                                          .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                          )
                                                          .replace(
                                                            /^./,
                                                            (str) =>
                                                              str.toUpperCase()
                                                          )}
                                                      </p>
                                                      <p className="mb-1">
                                                        <strong>Name:</strong>{" "}
                                                        {person.name || "N/A"}
                                                      </p>
                                                      <p className="mb-1">
                                                        <strong>
                                                          Married to:
                                                        </strong>{" "}
                                                        {person.marriedto ||
                                                          "N/A"}
                                                      </p>
                                                      <p className="mb-1">
                                                        <strong>
                                                          SonOf/DaughterOf:
                                                        </strong>{" "}
                                                        {person.sonof ||
                                                          person.daughterof ||
                                                          "N/A"}
                                                      </p>
                                                      <p className="mb-1">
                                                        <strong>
                                                          Thikana:
                                                        </strong>{" "}
                                                        {person.thikana ||
                                                          "N/A"}
                                                      </p>
                                                    </div>
                                                  </div>
                                                )
                                              )
                                            : null
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-center text-muted">
                              No details available
                            </p>
                          )}
                        </div>
                      )}
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
}

export default ViewMember;
