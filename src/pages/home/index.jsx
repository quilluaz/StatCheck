import { ProSidebarProvider } from "react-pro-sidebar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <ProSidebarProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <main style={{ padding: "20px", flexGrow: 1 }}>
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </ProSidebarProvider>
  );
}

export default Home;
