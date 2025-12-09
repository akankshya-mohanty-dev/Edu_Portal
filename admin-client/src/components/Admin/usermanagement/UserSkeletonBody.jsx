// File: PermissionSkeletonBody.jsx
import React from "react";

const UserSkeletonBody = () => {
  // Let's show 10 skeleton rows
  const skeletonRows = Array.from({ length: 10 });

  return (
    <tbody>
      {skeletonRows.map((_, index) => (
        <tr key={index} className="animate-pulse bg-white border-t">
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-4/5 mx-auto"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-4/5 mx-auto"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserSkeletonBody;
