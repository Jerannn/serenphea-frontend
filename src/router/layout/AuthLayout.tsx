import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-5">
      <Outlet />
    </div>
  );
}
