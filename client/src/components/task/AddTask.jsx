// import React, { useState } from "react";
// import ModalWrapper from "../ModalWrapper";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import { useForm } from "react-hook-form";
// import UserList from "./UserList";
// import SelectList from "../SelectList";
// import { BiImages } from "react-icons/bi";
// import Button from "../Button";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { app } from "../../utils/firebase";
// import { toast } from "sonner";
// import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";

// const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
// const PRIORITIES = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// const AddTask = ({ open, setOpen, task }) => {
//   // Ensure task is an object
//   const defaultValues = {
//     title: task?.title || "",
//     date: task?.date || new Date().toISOString().split("T")[0], // Ensure date is formatted correctly
//     team: task?.team || [],
//     stage: task?.stage?.toUpperCase() || LISTS[0],
//     priority: task?.priority?.toUpperCase() || PRIORITIES[2],
//     assets: task?.assets || [],
//   };

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const [team, setTeam] = useState(defaultValues.team);
//   const [stage, setStage] = useState(defaultValues.stage);
//   const [priority, setPriority] = useState(defaultValues.priority);
//   const [assets, setAssets] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const [createTask, { isLoading }] = useCreateTaskMutation();
//   const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

//   const handleSelect = (e) => {
//     setAssets([...e.target.files]); // Convert FileList to an array
//   };

//   const uploadFile = async (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + "_" + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     return new Promise((resolve, reject) => {
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Uploading... ${progress}%`);
//         },
//         (error) => {
//           console.error("Upload failed:", error);
//           reject(error);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           } catch (error) {
//             reject(error);
//           }
//         }
//       );
//     });
//   };

//   const submitHandler = async (data) => {
//     setUploading(true);
//     try {
//       const uploadedFileURLs = await Promise.all(assets.map((file) => uploadFile(file)));

//       const newData = {
//         ...data,
//         assets: [...defaultValues.assets, ...uploadedFileURLs],
//         team,
//         stage,
//         priority,
//       };

//       const response = task?._id
//         ? await updateTask({ ...newData, _id: task._id }).unwrap()
//         : await createTask(newData).unwrap();

//       toast.success(response.message);

//       setTimeout(() => {
//         setOpen(false);
//         window.location.reload();

//       }, 500);
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.data?.message || "Something went wrong");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <ModalWrapper open={open} setOpen={setOpen}>
//       <form onSubmit={handleSubmit(submitHandler)}>
//         <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
//           {task ? "UPDATE TASK" : "ADD TASK"}
//         </Dialog.Title>

//         <div className="mt-2 flex flex-col gap-6">
//           <Textbox
//             placeholder="Task Title"
//             type="text"
//             name="title"
//             label="Task Title"
//             className="w-full rounded"
//             register={register("title", { required: "Title is required" })}
//             error={errors.title?.message}
//           />

//           <UserList setTeam={setTeam} team={team} />

//           <div className="flex gap-4">
//             <SelectList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />

//             <div className="w-full">
//               <Textbox
//                 placeholder="Date"
//                 type="date"
//                 name="date"
//                 label="Task Date"
//                 className="w-full rounded"
//                 register={register("date", { required: "Date is required!" })}
//                 error={errors.date?.message}
//               />
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <SelectList label="Priority Level" lists={PRIORITIES} selected={priority} setSelected={setPriority} />

//             <div className="w-full flex items-center justify-center mt-4">
//               <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4" htmlFor="imgUpload">
//                 <input type="file" className="hidden" id="imgUpload" onChange={handleSelect} accept=".jpg, .png, .jpeg" multiple />
//                 <BiImages />
//                 <span>Add Assets</span>
//               </label>
//             </div>
//           </div>

//           <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//             {uploading ? (
//               <span className="text-sm py-2 text-red-500">Uploading assets...</span>
//             ) : (
//               <Button type="submit" className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto" label="Submit" />
//             )}

//             <Button type="button" className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto" onClick={() => setOpen(false)} label="Cancel" />
//           </div>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default AddTask;

import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { app } from "../../utils/firebase";
import { toast } from "sonner";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITIES = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task, refetch }) => {
  const defaultValues = {
    title: task?.title || "",
    date: task?.date || new Date().toISOString().split("T")[0],
    team: task?.team || [],
    stage: task?.stage?.toUpperCase() || LISTS[0],
    priority: task?.priority?.toUpperCase() || PRIORITIES[2],
    assets: task?.assets || [],
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  const [team, setTeam] = useState(defaultValues.team);
  const [stage, setStage] = useState(defaultValues.stage);
  const [priority, setPriority] = useState(defaultValues.priority);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const handleSelect = (e) => {
    setAssets([...e.target.files]);
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploading... ${progress}%`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const submitHandler = async (data) => {
    setUploading(true);
    try {
      const uploadedFileURLs = await Promise.all(assets.map((file) => uploadFile(file)));

      const newData = {
        ...data,
        assets: [...defaultValues.assets, ...uploadedFileURLs],
        team,
        stage,
        priority,
      };

      const response = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(response.message);

      setTimeout(() => {
        setOpen(false);
        refetch(); // Trigger the refetch after task is created or updated
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <UserList setTeam={setTeam} team={team} />

          <div className="flex gap-4">
            <SelectList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />

            <div className="w-full">
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", { required: "Date is required!" })}
                error={errors.date?.message}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <SelectList label="Priority Level" lists={PRIORITIES} selected={priority} setSelected={setPriority} />

            <div className="w-full flex items-center justify-center mt-4">
              <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4" htmlFor="imgUpload">
                <input type="file" className="hidden" id="imgUpload" onChange={handleSelect} accept=".jpg, .png, .jpeg" multiple />
                <BiImages />
                <span>Add Assets</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            {uploading ? (
              <span className="text-sm py-2 text-red-500">Uploading assets...</span>
            ) : (
              <Button type="submit" className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto" label="Submit" />
            )}

            <Button type="button" className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto" onClick={() => setOpen(false)} label="Cancel" />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
