import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Home page renders its own full layout
  if (isHomePage) {
    return <Outlet />;
  }

  // Other pages get a simple centered layout
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
