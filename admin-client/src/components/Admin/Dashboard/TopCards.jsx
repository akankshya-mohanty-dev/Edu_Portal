import React, { useEffect, useState } from "react";
// import { FaUsers, FaDollarSign } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { PiToolboxBold } from "react-icons/pi";
import axios from "axios";
import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaUserAlt,
  FaUserShield,
  FaUserFriends,
  FaUserCog,
  FaUserNurse,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
  FaHome,
} from "react-icons/fa";

const TopCards = () => {
  const navigate = useNavigate();
  // const [jobOpening, setJobOpening] = useState(0);
  const [position, setPosition] = useState(0);
  const [applicants, setApplicants] = useState(0);
  const [candidate, setCandidate] = useState(0);
  const [skeletonBody, setSkeletonBody] = useState(false);
  const [allEmployees, setAllEmployees] = useState(0);
  const [allManager, setAllManager] = useState([]);
  const [consumerDetails,setConsumerDetails]=useState(0)
  // const getAllJobOpening = () => {
  //   setSkeletonBody(true);
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `${process.env.REACT_APP_API_URL}/job/jobOpening`,
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setJobOpening(response.data.length);
  //       setSkeletonBody(false);
  //     })
  //     .catch((error) => {
  //       setSkeletonBody(false);
  //     });
  // };

  const getAllPosition = () => {
    setSkeletonBody(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/interview/allInterviews`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setPosition(response.data.length);
        setSkeletonBody(false);
      })
      .catch((error) => {
        setSkeletonBody(false);
        console.log(error);
      });
  };
  const getAllApplicants = () => {
    setSkeletonBody(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/userData/getAllData`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setApplicants(response.data.length);
        setSkeletonBody(false);
      })
      .catch((error) => {
        console.log(error);
        setSkeletonBody(false);
      });
  };
  const getAllSelectedCandidate = () => {
    setSkeletonBody(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/userData/selectedCandidate`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setCandidate(response.data.length);
        setSkeletonBody(false);
      })
      .catch((error) => {
        console.log(error);
        setSkeletonBody(false);
      });
  };
  useEffect(() => {
    // getAllJobOpening();
    getAllPosition();
    getAllApplicants();
    getAllSelectedCandidate();
    getAllEmployees();

    getAllManager();
    getAllConsumerDetails();
  }, []);
  const getAllConsumerDetails = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/stats/get-all-consumer-stats`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("response gdata",response.data.data);
        setConsumerDetails(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllManager = () => {
    console.log("enter")
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/stats/get-all-employee`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("response.data fm", response.data.data);
        const groupedData = {};
        response.data.data.forEach((item) => {
          groupedData[item._id] = item.count;
        });
        setAllManager(groupedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllEmployees = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/joiningForm/getAll-joining-form`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log("response data",response.data.length);
        setAllEmployees(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {skeletonBody ? (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow animate-pulse"
            >
              <div className="flex justify-between">
                <div>
                  <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="bg-gray-200 rounded-full h-12 w-12"></div>
              </div>
            </div>
          ))}
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-10">
          {[1, 2, 3, 4,5,6,7,8,9,10].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow animate-pulse"
            >
              <div className="flex justify-between">
                <div>
                  <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="bg-gray-200 rounded-full h-12 w-12"></div>
              </div>
            </div>
          ))}
        </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {/* <div
            className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-blue-200 cursor-pointer"
            onClick={() => navigate("/job-opening")}
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold">{jobOpening}</h2>
                <p className="text-gray-600">Job Opening</p>
              </div>
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center">
                <GrUserManager className="text-blue-600" size={20} />
              </div>
            </div>
          </div> */}

            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-yellow-200 cursor-pointer"
              onClick={() => navigate("/applicant")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{applicants}</h2>
                  <p className="text-gray-600">Total Applicant</p>
                </div>
                <div className="bg-yellow-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaRegUser className="text-yellow-600" size={20} />
                </div>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-purple-200 cursor-pointer"
              onClick={() => navigate("/interview-list")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{position}</h2>
                  <p className="text-gray-600">Interview List</p>
                </div>
                <div className="bg-purple-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <PiToolboxBold className="text-purple-600" size={20} />
                </div>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-pink-200 cursor-pointer"
              onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{candidate}</h2>
                  <p className="text-gray-600">Selected Candidate</p>
                </div>
                <div className="bg-pink-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUsers className="text-pink-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-blue-200 cursor-pointer">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allEmployees}</h2>
                  <p className="text-gray-600">Total Employee</p>
                </div>
                <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <MdPeopleAlt className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-10">
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-blue-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.RM || 0}</h2>
                  <p className="text-gray-600">Regional Manager</p>
                </div>
                <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserTie className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-green-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.ZM || 0}</h2>
                  <p className="text-gray-600">Zonal Manager</p>
                </div>
                <div className="	bg-green-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserAlt className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-yellow-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.DM || 0}</h2>
                  <p className="text-gray-600">Dist. Manager</p>
                </div>
                <div className="bg-yellow-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserShield className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-purple-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.AM || 0}</h2>
                  <p className="text-gray-600">Asst. Manager</p>
                </div>
                <div className="bg-purple-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserFriends className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-teal-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.JM || 0}</h2>
                  <p className="text-gray-600">Junior Manager</p>
                </div>
                <div className="bg-teal-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserCog className="text-teal-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-orange-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.FO || 0}</h2>
                  <p className="text-gray-600">Field Officer</p>
                </div>
                <div className="bg-orange-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserNurse className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-cyan-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.SU || 0}</h2>
                  <p className="text-gray-600">Supervisor</p>
                </div>
                <div className="bg-cyan-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserCheck className="text-cyan-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-indigo-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{allManager.SE || 0}</h2>
                  <p className="text-gray-600">Sales Executive</p>
                </div>
                <div className="bg-indigo-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUserPlus className="text-indigo-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-pink-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{consumerDetails.consumerCount}</h2>
                  <p className="text-gray-600">Total Consumer's</p>
                </div>
                <div className="bg-pink-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaUsers className="text-pink-600" size={24} />
                </div>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-all duration-700 hover:bg-red-200 cursor-pointer"
              // onClick={() => navigate("/selected-candidate")}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{consumerDetails.familyCount}</h2>
                  <p className="text-gray-600">Consumer Family</p>
                </div>
                <div className="bg-red-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <FaHome className="text-red-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopCards;
