import React from "react";
import moment from "moment";
import { TASKTYPEICON } from "../constants/constants"; // Adjust path as needed

const ActivityCard = ({ item, isConnected }) => {
  return (
    <div className="flex space-x-4 relative pb-6">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          {TASKTYPEICON[item?.type] || "📝"}
        </div>
        {isConnected && <div className="h-full w-px bg-gray-300 mt-1"></div>}
      </div>

      <div className="flex flex-col gap-y-1">
        <p className="font-semibold">{item?.by?.name}</p>
        <span className="text-sm text-gray-500">{moment(item?.date).fromNow()}</span>
        <div className="text-gray-700">{item?.activity}</div>
      </div>
    </div>
  );
};

export default ActivityCard;
