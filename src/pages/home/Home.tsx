import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserName, setList } from "../../store/contentSlice";
import { RiDeleteBinLine, RiEdit2Fill } from "react-icons/ri";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Pagination, Portal, Button } from "../../components";
import DeletePortal from "./DelelePortal";

// Define the types for the user item
interface UserItem {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
}

// Define the types for the state
interface AppState {
  content: {
    userList: UserItem[];
    menuIndex: number;
  };
}

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [item, setItem] = useState<UserItem | undefined>(undefined);
  const [userName, setUserName] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
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
    setUserName("");
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Stop the event from propagating to the parent div
    e.stopPropagation();
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
            {userList.slice(startIndex, endIndex).map((e, i: number) => (
              <tr
                className="bg-white border-b hover:bg-indigo-100 cursor-pointer"
                key={e.id}
                onClick={() => {
                  setIsOpen(true);
                  setUserName(e.username);
                  setItem(e);
                  setIndex(i);
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
                    onClick={(e) => {
                      handleContentClick(e);
                      setIsDeleted(true);
                      setIndex(i);
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
        <div className="rounded-xl bg-white shadow p-12 gap-y-8 flex flex-col max-h-[70vh] overflow-y-scroll">
          <div className="flex flex-col md:flex-row justify-between gap-x-12 gap-y-8 md:gap-y-0">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Username</label>
              <input
                className="p-2 rounded border border-slate-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                name="username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Name</label>
              <input
                className="p-2 rounded border border-slate-300 text-gray-700"
                name="name"
                type="text"
                value={item?.name}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-x-12 gap-y-8 md:gap-y-0">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Email</label>
              <input
                className="p-2 rounded border border-slate-300 text-gray-700"
                name="email"
                type="email"
                disabled
                value={item?.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Phone</label>
              <input
                className="p-2 rounded border border-slate-300 text-gray-700"
                name="phone"
                type="tel"
                value={item?.phone}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-x-12 gap-y-8 md:gap-y-0">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500" htmlFor="city">
                City
              </label>
              <input
                className="p-2 rounded border border-slate-300 text-gray-700"
                name="city"
                type="text"
                value={item?.city}
                disabled
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-500" htmlFor="role">
                Admin
              </label>
              <input
                className="p-2 rounded border border-slate-300 checked:bg-indigo-600"
                name="role"
                type="checkbox"
                checked={item?.role === "admin"}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-8">
            <Button title="Cancel" primaryType={false} onClick={onClose} />
            <Button
              title="Save"
              primaryType
              onClick={() => {
                dispatch(editUserName({ username: userName, index }));
                onClose();
              }}
            />
          </div>
        </div>
      </Portal>

      <DeletePortal
        isOpen={isDeleted}
        onClose={() => setIsDeleted(false)}
        index={index}
      />
    </div>
  );
};

export default Home;
