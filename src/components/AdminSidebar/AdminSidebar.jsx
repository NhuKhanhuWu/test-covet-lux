/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Analyst",
    icon: <span className="material-symbols-outlined">monitoring</span>,
    path: "/test-covet-lux/admin/analyst",
  },
  {
    name: "Product",
    icon: <span className="material-symbols-outlined">inventory_2</span>,
    path: "/test-covet-lux/admin/products",
  },
  {
    name: "Orders",
    icon: <span className="material-symbols-outlined">sell</span>,
    path: "/test-covet-lux/admin/orders",
  },
  {
    name: "Customer",
    icon: <span className="material-symbols-outlined">account_circle</span>,
    path: "/test-covet-lux/admin/customers",
  },
  {
    name: "Notification",
    icon: <span className="material-symbols-outlined">notifications</span>,
    path: "/test-covet-lux/admin/notifications",
  },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="!ml-[2.5rem] my-5 pb-5 transition-all duration-300 border-r border-black">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" text-2xl focus:outline-none hover:text-[rgb(252,108,34)] transition-all">
        <span className="material-symbols-outlined">dock_to_left</span>
      </button>

      {/* Menu Items */}
      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 border-b border-black cursor-pointer transition-all 
                 hover:border-[rgb(252,108,34)] hover:bg-[rgb(252,108,34)] hover:text-white">
            {/* icon */}
            {item.icon}

            {/* txt */}
            <Link
              to={item.path}
              className={`block w-full text-black hover:text-white transition-all ${
                isOpen ? "" : "hidden"
              }`}>
              {item.name}
            </Link>
            {/* </span> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
