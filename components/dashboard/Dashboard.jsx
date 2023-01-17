import { useState, useEffect } from "react";

import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineGroup } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { SiAirtable } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`/users`)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = { ...prev, users: json })));
    fetch(`/groups`)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = { ...prev, groups: json })));
    fetch(`/products`)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = { ...prev, products: json })));
    fetch(`/tables`)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = { ...prev, tables: json })));
  }, []);
  return (
    <div className="flex flex-col w-full">
      <div className="p-5 text-center text-3xl shadow">DASHBOARD</div>
      <div className="list grid sm:grid-cols-2 p-5 gap-3">
        <div className="user w-full flex shadow-2xl px-5">
          <div>
            <p className="p-3 text-xl font-extrabold">Userinfo</p>
            <Link to="/auth/user">
              <HiOutlineUsers className="text-9xl text-green-900 aspect" />
            </Link>
          </div>
          <div>
            <p className="p-3 text-xl font-extrabold">
              Total : {data.users && data.users.length}
            </p>
            <div className="p-3 text-xl font-extrabold">
              Admin :{" "}
              {data.users && data.users.filter((el) => el.isAdmin).length}
              <ul className="px-5">
                {data.users &&
                  data.users
                    .filter((el) => el.isAdmin)
                    .map((el, i) => (
                      <li>
                        Admin {i + 1}: {el.username}
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="group w-full flex shadow-2xl px-5">
          <div>
            <p className="p-3 text-xl font-extrabold">Groupinfo</p>
            <Link to="/auth/group">
              <AiOutlineGroup className="text-9xl text-blue-900 aspect" />
            </Link>
          </div>
          <div>
            <p className="p-3 text-xl font-extrabold">
              Total : {data.groups && data.groups.length}
            </p>
            <div className="p-3 text-xl font-extrabold">
              Grouplist :{" "}
              <ul className="px-5">
                {data.groups &&
                  data.groups.map((el, i) => (
                    <li>
                      {i + 1}: {el.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="product w-full flex shadow-2xl px-5">
          <div>
            <p className="p-3 text-xl font-extrabold">Productinfo</p>
            <Link to="/auth/product">
              <MdProductionQuantityLimits className="text-9xl text-amber-900 aspect" />
            </Link>
          </div>
          <div>
            <p className="p-3 text-xl font-extrabold">
              Total : {data.products && data.products.length}
            </p>
            <p className="px-3 text-xl font-extrabold">
              Total available:{" "}
              {data.products &&
                data.products.filter((el) => el.available).length}
            </p>
            <div className="p-3 text-xl font-extrabold">
              Productlist Top3 :{" "}
              <ul className="px-5">
                {data.products &&
                  data.products
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 3)
                    .map((el, i) => (
                      <li>
                        {i + 1}: {el.name} {" : "} {el.price}€
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
        <div className=" w-full flex shadow-2xl px-5">
          <div>
            <p className="p-3 text-xl font-extrabold">Tableinfo</p>
            <Link to="/auth/table">
              <SiAirtable className="text-9xl text-orange-400 aspect" />
            </Link>
          </div>
          <div>
            <p className="p-3 text-xl font-extrabold">
              Total : {data.tables && data.tables.length}
            </p>
            <div className="p-3 text-xl font-extrabold">
              <div>
                Available Tables :{" "}
                {data.tables
                  ? data.tables.filter((el) => el.available).length
                  : 0}
              </div>
              <div>
                Reserved Tables :{" "}
                {data.tables
                  ? data.tables.filter((el) => !el.available).length
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
