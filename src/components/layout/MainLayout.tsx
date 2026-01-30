import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
