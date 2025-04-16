import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import Textbox from "./Textbox";
import Loading from "./Loader";
import { Dialog } from "@headlessui/react";
import Button from "../ui/Button"; 
import ModelWrapper from "../components/ModalWrapper";

const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Passwords don't match");
            return;
        }
        try {
            const res = await changeUserPassword(data).unwrap();
            toast.success("Password changed successfully");

            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (err) {
            console.error(err);
            toast.error(err?.message || err.error);
        }
    };

    return (
        <ModelWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)} className="p-4">
                <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                    Change Password
                </Dialog.Title>
                <div className="mt-2 flex flex-col gap-6">
                    <Textbox
                        placeholder="New Password"
                        type="password"
                        name="password"
                        label="New Password"
                        className="w-full rounded"
                        register={register("password", {
                            required: "New Password is required",
                        })}
                        error={errors.password ? errors.password.message : ""}
                    />

                    <Textbox
                        placeholder="Confirm New Password"
                        type="password"
                        name="cpass"
                        label="Confirm New Password"
                        className="w-full rounded"
                        register={register("cpass", {
                            required: "Confirm New Password is required",
                        })}
                        error={errors.cpass ? errors.cpass.message : ""}
                    />
                </div>

                {isLoading ? (
                    <div className="py-5 flex justify-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="py-3 mt-4 flex justify-end gap-3">
                        <Button
                            type="submit"
                            className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Save
                        </Button>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-400 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>
        </ModelWrapper>
    );
};

export default ChangePassword;
