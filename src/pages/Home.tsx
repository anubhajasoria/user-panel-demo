import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserName, setList } from "../store/contentSlice";
import { Pagination, Portal } from "../components";
import Button from "../components/Button";

const Home = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState();
  const [userName, setUserName] = useState("");
  const [index, setIndex] = useState(0);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const userList = useSelector((state) => state.content.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("src/data/UserData.json")
      .then((response) => response.json())
      .then((data) => dispatch(setList(data)));
  }, []);

  const onClose = () => {
    setIsOpen(false);
    setItem({});
    setUserName("");
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
            </tr>
          </thead>
          <tbody>
            {userList.slice(startIndex, endIndex).map((e, i: number) => {
              return (
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Pagination
          currentPage={page}
          setPage={setPage}
          numberOfPages={
            userList.length % 10 === 0
              ? userList.length / 10
              : userList.length / 10 + 1
          }
        />
      </div>

      <Portal isOpen={isOpen} onClose={onClose}>
        <div className="rounded-xl bg-white shadow p-12  gap-y-8 flex flex-col max-h-[70vh] overflow-y-scroll">
          <div className="flex flex-col md:flex-row justify-between gap-x-12  gap-y-8 md:gap-y-0">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Username</label>

              <input
                className="p-2 rounded border border-slate-300  text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                name="username"
                type="text"
                //   defaultValue={item.userName}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Name</label>
              <input
                className="p-2 rounded border border-slate-300  text-gray-700"
                name="name"
                type="text"
                value={item?.name}
                disabled={true}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-x-12 gap-y-8 md:gap-y-0">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Email</label>

              <input
                className="p-2 rounded border border-slate-300  text-gray-700 "
                name="email"
                type="email"
                disabled={true}
                value={item?.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">Phone</label>
              <input
                className="p-2 rounded border border-slate-300  text-gray-700 "
                name="phone"
                type="tel"
                value={item?.phone}
                disabled={true}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-x-12 gap-y-8 md:gap-y-0">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500" for="city">
                City
              </label>

              <input
                className="p-2 rounded border border-slate-300 text-gray-700"
                name="city"
                type="text"
                value={item?.city}
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-500" for="role">
                Admin
              </label>
              <input
                className="p-2 rounded border border-slate-300 checked:bg-indigo-600"
                name="role"
                type="checkbox"
                // style={{ accentColor: "#5541d7" }}
                checked={item?.role === "admin" ? true : false}
                value={item?.role}
                disabled={true}
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-8">
            <Button title="Cancel" primaryType={false} onClick={onClose} />
            <Button
              title="Save"
              primaryType={true}
              onClick={() => {
                dispatch(editUserName({ username: userName, index: index }));
                onClose();
              }}
            />
          </div>
        </div>
      </Portal>
    </div>
  );
};

export default Home;
