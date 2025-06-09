import SideTopBarComponent from "./sidebar/side.topbar.component";
import SideBarComponent from "./sidebar/sidebar.component";
import MainTopBarComponent from "./topbar/main.topbar.component";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed w-64 bg-primary-800 h-screen shadow z-10 p-4">
        <SideTopBarComponent />
        <SideBarComponent />
      </div>

      <div className="ml-64 flex-1 flex flex-col min-h-0 bg-background-light">
        <MainTopBarComponent />
        <main className="mx-8 my-4 flex-1 flex flex-col min-h-0">
          <div className="flex flex-col flex-1 overflow-hidden rounded-md bg-white min-h-0">
            <div className="flex-1 overflow-auto min-h-0">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
