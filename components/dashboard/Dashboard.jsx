import { useState, useEffect } from "react";

import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineGroup } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/users`)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = { ...prev, users: json })));
    fetch(`http://localhost:4000/groups`)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = { ...prev, groups: json })));
    fetch(`http://localhost:4000/products`)
      .then((res) => res.json())
      .then((json) => setData((prev) => (prev = { ...prev, products: json })));
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
            <Link to="/auth/group">
              <MdProductionQuantityLimits className="text-9xl text-amber-900 aspect" />
            </Link>
          </div>
          <div>
            <p className="p-3 text-xl font-extrabold">
              Total : {data.products && data.products.length}
            </p>
            <div className="p-3 text-xl font-extrabold">
              Productlist Top3 :{" "}
              <ul className="px-5">
                {data.products &&
                  data.products
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 2)
                    .map((el, i) => (
                      <li>
                        {i + 1}: {el.name} {" : "} {el.price}€
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="table"></div>
      </div>
    </div>
  );
}
