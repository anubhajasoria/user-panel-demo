import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editUsers } from "../../store/contentSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Portal, Button } from "../../components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username cannot contain spaces or special characters"
    )
    .required("Username is required"),
  name: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Name cannot contain numbers or special characters"
    )
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  city: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "City cannot contain numbers or special characters"
    )
    .required("City is required"),
});

interface UserItem {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
}

interface EditAddPortalProps {
  isOpen: boolean;
  onClose: () => void;
  item: UserItem | null;
  action: "edit" | "add";
  setPage: (n: number) => void;
}

interface AppState {
  content: {
    userList: UserItem[];
  };
}

const EditAddPortal: React.FC<EditAddPortalProps> = ({
  isOpen,
  onClose,
  item,
  setPage,
  action,
}) => {
  const dispatch = useDispatch();
  const userList = useSelector((state: AppState) => state.content.userList);

  return (
    <Portal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{
          username: item?.username || "",
          name: item?.name || "",
          email: item?.email || "",
          phone: item?.phone || "",
          city: item?.city || "",
          role: item?.role || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (action === "edit" && item) {
            dispatch(editUsers({ id: item.id, updatedValues: values }));
          } else if (action === "add") {
            console.log("adding");
            dispatch(
              addItem({
                ...values,
                id: userList.length.toString(),
                role: values.role ? values.role : "user",
              })
            );
            setPage(1);
          }

          onClose();
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form className="rounded-xl bg-white shadow p-12 gap-y-8 flex flex-col max-h-[70vh] w-[70vw] overflow-y-scroll">
            <span className="text-gray-600 text-xl font-bold">
              {action === "edit" ? "Edit User" : "Add New User"}
            </span>
            <div className="flex flex-col md:flex-row justify-between gap-x-12 gap-y-8 md:gap-y-0">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500" htmlFor="username">
                  Username
                </label>
                <Field
                  className="p-2 rounded border border-slate-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  name="username"
                  type="text"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-[0.7rem] max-w-[80%] break-words"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500" htmlFor="name">
                  Name
                </label>
                <Field
                  className="p-2 rounded border border-slate-300 text-gray-700"
                  name="name"
                  type="text"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-[0.7rem] max-w-full break-words"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-x-12 gap-y-8 md:gap-y-0">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500" htmlFor="email">
                  Email
                </label>
                <Field
                  className="p-2 rounded border border-slate-300 text-gray-700"
                  name="email"
                  type="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-[0.7rem] max-w-full break-words"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-x-12 gap-y-8 md:gap-y-0">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500" htmlFor="phone">
                  Phone
                </label>
                <Field
                  className="p-2 rounded border border-slate-300 text-gray-700"
                  name="phone"
                  type="tel"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-600 text-[0.7rem] max-w-full break-words"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-500" htmlFor="city">
                  City
                </label>
                <Field
                  className="p-2 rounded border border-slate-300 text-gray-700"
                  name="city"
                  type="text"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-600 text-[0.7rem] max-w-full break-words"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-500" htmlFor="role">
                Admin
              </label>
              <Field
                className="p-2 rounded border border-slate-300 checked:bg-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                name="role"
                type="checkbox"
                id="role"
                checked={values.role === "admin"}
                disabled={action === "edit"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const checked = e.target.checked;
                  setFieldValue("role", checked ? "admin" : "user");
                }}
              />
            </div>
            <div className="flex items-center justify-end mt-8 gap-x-4">
              <Button title="Cancel" primaryType={false} onClick={onClose} />
              <Button
                type="submit"
                title="Save"
                primaryType
                onClick={handleSubmit}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Portal>
  );
};

export default EditAddPortal;
