import { CardItem } from "@/lib/interfaces";
import React from "react";


const CardDashboard = ({count, name, icon:Icon}:CardItem) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
       <Icon />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
         {name}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {count}
        </p>
      </div>
    </div>
  );
};

export default CardDashboard;
