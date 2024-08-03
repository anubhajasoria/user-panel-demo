import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUsers, setList } from "../../store/contentSlice";
import { RiDeleteBinLine, RiEdit2Fill } from "react-icons/ri";
import { Pagination, Portal, Button } from "../../components";
import DeletePortal from "./DelelePortal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface UserItem {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
}

interface AppState {
  content: {
    userList: UserItem[];
    menuIndex: number;
  };
}

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

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [item, setItem] = useState<UserItem | undefined>(undefined);
  const [id, setId] = useState<string>("");
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const userList = useSelector((state: AppState) => state.content.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("src/data/UserData.json")
      .then((response) => response.json())
      .then((data) => dispatch(setList(data)));
  }, [dispatch]);

  const onClose = () => {
    setIsOpen(false);
    setItem(undefined);
  };

  return (
    <div className="p-4 w-full flex flex-col justify-center">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-indigo-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.slice(startIndex, endIndex).map((e) => (
              <tr
                className="bg-white border-b hover:bg-indigo-100 cursor-pointer"
                key={e.id}
                onClick={() => {
                  setIsOpen(true);
                  setItem(e);
                  setId(e.id);
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {e.username}
                </th>
                <td className="px-6 py-4">{e.name}</td>
                <td className="px-6 py-4">{e.email}</td>
                <td className="px-6 py-4">{e.role}</td>
                <td className="flex px-6 py-4 gap-4">
                  <span
                    className="p-2 border rounded"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsDeleted(true);
                      setId(e.id);
                    }}
                  >
                    <RiDeleteBinLine />
                  </span>
                  <span className="p-2 border rounded">
                    <RiEdit2Fill />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Pagination
          currentPage={page}
          setPage={setPage}
          numberOfPages={Math.ceil(userList.length / itemsPerPage)}
        />
      </div>

      <Portal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            username: item?.username || "",
            name: item?.name || "",
            email: item?.email || "",
            phone: item?.phone || "",
            city: item?.city || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (item) {
              dispatch(editUsers({ id: item.id, updatedValues: values }));
            }
            onClose();
          }}
        >
          {({ handleSubmit }) => (
            <Form className="rounded-xl bg-white shadow p-12 gap-y-8 flex flex-col max-h-[70vh] w-[70vw] overflow-y-scroll">
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
                  className="p-2 rounded border border-slate-300 checked:bg-indigo-600"
                  name="role"
                  type="checkbox"
                  checked={item?.role === "admin"}
                  disabled
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

      <DeletePortal
        isOpen={isDeleted}
        onClose={() => setIsDeleted(false)}
        id={id}
      />
    </div>
  );
};

export default Home;
