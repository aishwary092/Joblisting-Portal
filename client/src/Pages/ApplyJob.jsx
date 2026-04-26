import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Loading from "../Component/Loading";
import Navbar from "../Component/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../Component/JobCard"
import Footer from "../Component/Footer"

const ApplyJob = () => {
  const { id } = useParams();

  const [JobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-6 sm:py-10 container mx-auto px-4 sm:px-6 lg:px-10 2xl:px-20">
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 px-6 sm:px-10 lg:px-14 py-10 lg:py-16 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            {/* Left Section */}
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
              <img
                className="h-20 sm:h-24 bg-white rounded-lg p-3 sm:p-4 sm:mr-4 mb-4 sm:mb-0 border"
                src={JobData.companyId.image}
                alt=""
              />

              <div className="text-neutral-700">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold">
                  {JobData.title}
                </h1>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-gray-600">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center lg:items-end text-sm text-center lg:text-right">
              <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-2.5 text-white rounded-md">
                Apply Now
              </button>

              <p className="mt-2 text-gray-600">
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>
              <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-2.5 text-white rounded-md mt-10">
                Apply Now
              </button>
            </div>
              {/* Right Section more jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2>More jobs from {JobData.companyId.name}</h2>
              {jobs
                .filter(
                  job =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id
                )
                .filter( job => true)
                .slice(0, 4)
                .map((job, index) => 
                  <JobCard key={index} job={job} />
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
