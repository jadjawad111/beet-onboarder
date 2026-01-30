import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import HelpPanel from "@/components/HelpPanel";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-1 flex-col min-h-screen overflow-hidden text-primary-foreground bg-primary-foreground">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto relative">
          <div className="container max-w-4xl py-8 px-4 lg:px-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      <HelpPanel />
    </div>
  );
};

export default MainLayout;