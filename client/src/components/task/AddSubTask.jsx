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
      const res = await addSubTask({ data, id }).unwrap();
      toast.success(res.message || "Sub-task added successfully!");
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <Dialog.Title
          as="h2"
          className="text-lg font-bold leading-6 text-white mb-6"
        >
          ADD SUB-TASK
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Sub-Task title"
            type="text"
            label="Title"
            register={{
              ...register("title", { required: "Title is required!" }),
            }}
            error={errors.title?.message}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Textbox
              placeholder="dd-mm-yyyy"
              type="date"
              label="Task Date"
              register={{
                ...register("date", { required: "Date is required!" }),
              }}
              error={errors.date?.message}
            />
            <Textbox
              placeholder="Tag"
              type="text"
              label="Tag"
              register={{
                ...register("tag", { required: "Tag is required!" }),
              }}
              error={errors.tag?.message}
            />
          </div>
        </div>

        <div className="pt-5 mt-4 flex sm:flex-row-reverse gap-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded shadow-lg shadow-blue-500/30 transition"
            label="Add Task"
          />

          <Button
            type="button"
            className="border border-gray-500 bg-[#0F172A] text-gray-300 font-semibold text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
