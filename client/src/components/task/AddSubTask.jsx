import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { toast } from "sonner";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addSubTask] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    try {
      console.log("Submitting data:", data); // ✅ Debugging: Check the submitted data

      const res = await addSubTask({ data, id }).unwrap();
      toast.success(res.message || "Sub-task added successfully!");

      setTimeout(() => {
        setOpen(false);
        window.location.reload();

      }, 500);
    } catch (err) {
      console.error("Error adding sub-task:", err);
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          ADD SUB-TASK
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Sub-Task title"
            type="text"
            label="Title"
            register={{ ...register("title", { required: "Title is required!" }) }} // ✅ Fixed register passing
            error={errors.title?.message}
          />

          <div className="flex items-center gap-4">
            <Textbox
              placeholder="Date"
              type="date"
              label="Task Date"
              register={{ ...register("date", { required: "Date is required!" }) }} // ✅ Fixed register passing
              error={errors.date?.message}
            />
            <Textbox
              placeholder="Tag"
              type="text"
              label="Tag"
              register={{ ...register("tag", { required: "Tag is required!" }) }} // ✅ Fixed register passing
              error={errors.tag?.message}
            />
          </div>
        </div>
        <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
          <Button
            type="submit"
            className="bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto"
            label="Add Task"
          />

          <Button
            type="button"
            className="bg-white border text-sm font-semibold text-gray-900 sm:w-auto"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
