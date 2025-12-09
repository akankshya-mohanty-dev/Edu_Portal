import React from "react";

const TopClients = () => {
  const clients = [
    {
      id: 1,
      name: "Jaydon Rhiel",
      number: "+91 8594581267",
      property: "3bhk Flat",
      location: "Kalinga Nagar/751025",
      status: "Active",
      image:
        "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid",
    },
    {
      id: 2,
      name: "Abram Lubin",
      number: "+91 8594581267",
      property: "3bhk Flat",
      location: "Kalinga Nagar/751025",
      status: "Active",
      image:
        "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid",
    },
    {
      id: 3,
      name: "Tiana Levin",
      number: "+91 8594581267",
      property: "3bhk Flat",
      location: "Kalinga Nagar/751025",
      status: "Active",
      image:
        "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid",
    },
    {
      id: 4,
      name: "Jesna Kevin",
      number: "+91 8594581267",
      property: "3bhk Flat",
      location: "Kalinga Nagar/751025",
      status: "Active",
      image:
        "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Top Clients</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-left">
              <th className="pb-3 font-normal">Client Name</th>
              <th className="pb-3 font-normal">Number</th>
              <th className="pb-3 font-normal">Property</th>
              <th className="pb-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t border-gray-200">
                <td className="py-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 mr-3">
                      <div className="w-full h-full bg-gray-300">
                        <img src={client.image} alt="" />
                      </div>
                    </div>
                    <span>{client.name}</span>
                  </div>
                </td>
                <td className="py-2 text-sm">{client.number}</td>
                <td className="py-2">
                  <div>
                    <div className="text-sm">{client.property}</div>
                    <div className="text-sm text-gray-500">
                      {client.location}
                    </div>
                  </div>
                </td>
                <td className="py-2 text-md">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      client.status === "Active"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopClients;
