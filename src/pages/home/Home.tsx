/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../../store/contentSlice";
import { RiDeleteBinLine, RiEdit2Fill } from "react-icons/ri";
//@ts-ignore
import { Pagination, Button } from "../../components";
//@ts-ignore
import DeletePortal from "./DeletePortal";
import EditAddPortal from "./EditAddPortal";

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

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [item, setItem] = useState<UserItem | null>(null);
  const [action, setAction] = useState<"edit" | "add">("add");
  const [id, setId] = useState<string>("");
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const userList = useSelector((state: AppState) => state.content.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/src/data/UserData.json")
      .then((response) => response.json())
      .then((data) => dispatch(setList(data)));
  }, [dispatch]);

  const onClose = () => {
    setIsOpen(false);
    setItem(null);
    setAction("add");
  };

  return (
    <div className="px-4 pb-4 w-full md:w-[85vw] h-[90vh] flex flex-col justify-center">
      <div className="my-4 flex justify-end">
        <Button
          title="Add New User"
          onClick={() => {
            setIsOpen(true);
            setAction("add");
          }}
        />
      </div>
      <div className="relative overflow-x-scroll">
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
                  setAction("edit");
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
                  <span
                    className="p-2 border rounded"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsOpen(true);
                      setAction("edit");
                      setItem(e);
                      setId(e.id);
                    }}
                  >
                    <RiEdit2Fill />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-4">
        <Pagination
          currentPage={page}
          setPage={setPage}
          numberOfPages={Math.ceil(userList.length / itemsPerPage)}
        />
      </div>

      <EditAddPortal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
        action={action}
        setPage={setPage}
      />

      <DeletePortal
        isOpen={isDeleted}
        onClose={() => setIsDeleted(false)}
        id={id}
      />
    </div>
  );
};

export default Home;
