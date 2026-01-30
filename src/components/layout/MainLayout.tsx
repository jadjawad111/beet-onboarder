import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
