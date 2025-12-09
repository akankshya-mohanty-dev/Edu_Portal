import React from "react";

const UpcomingFollowUps = () => {
  const followUps = [
    { name: "Aspen Siphron", time: "10:10 AM", date: "22/11/2024" },
    { name: "Charlie Ekstrom", time: "10:10 AM", date: "22/11/2024" },
    { name: "Anika Bator", time: "10:10 AM", date: "22/11/2024" },
    { name: "Ruben Vetrovs", time: "10:10 AM", date: "22/11/2024" },
    { name: "Livia Lubin", time: "10:10 AM", date: "22/11/2024" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-xl text-gray-800 mb-4 font-bold">
        Upcoming Follow Up
      </h2>
      <div className="space-y-3">
        {followUps.map((followUp, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 rounded-md bg-blue-50"
          >
            <div className="text-blue-800 font-medium">{followUp.name}</div>
            <div className="text-right">
              <div className="text-gray-700 font-medium">{followUp.time}</div>
              <div className="text-gray-500 text-sm">{followUp.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingFollowUps;
