/** @format */

import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import BarChart from "./BarChart";

function Analyst() {
  return (
    <div className="flex gap-6 !my-6">
      <AdminSidebar></AdminSidebar>
      <BarChart></BarChart>
    </div>
  );
}

export default Analyst;
