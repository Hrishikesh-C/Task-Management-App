import React, { useState } from 'react';
import { usePostTaskActivityMutation } from '../redux/slices/api/taskApiSlice';
import { toast } from "sonner";
import Button from '../components/Button';
import Loading from '../components/Loader';
import moment from 'moment';
import { TASKTYPEICON, act_types } from '../constants/constants';
import ActivityCard from '../components/ActivityCard';

const Activities = ({ activity, id, refetch }) => {
  const [selected, setSelected] = useState(act_types[0].toLowerCase());
  const [text, setText] = useState("");
  const [postActivity, { isLoading }] = usePostTaskActivityMutation();

  const handleSubmit = async () => {
    try {
      const activityData = {
        type: selected.toLowerCase(), // Ensure type is in lowercase
        activity: text,
      };

      const result = await postActivity({ data: activityData, id }).unwrap();

      setText("");
      toast.success(result?.message);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="w-full flex gap-10 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <div className="w-full md:w-1/2">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">Activities</h4>
        <div className="w-full">
          {activity?.map((el, index) => (
            <ActivityCard key={index} item={el} isConnected={index < activity.length - 1} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">Add Activity</h4>
        <div className="w-full flex flex-wrap gap-5">
          {act_types.map((item) => (
            <div key={item} className="flex gap-2 items-center">
              <input
                type="radio"
                className="w-4 h-4"
                checked={selected === item.toLowerCase()}
                onChange={() => setSelected(item.toLowerCase())} // Use lowercase value for selection
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your activity..."
            className="bg-white w-full mt-5 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
          />
          {isLoading ? (
            <Loading />
          ) : (
            <Button type="button" label="Submit" onClick={handleSubmit} className="bg-blue-600 text-white rounded" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;

