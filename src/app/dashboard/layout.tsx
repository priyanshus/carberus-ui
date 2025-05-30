import SideBarComponent from "./sidebar/sidebar.component";
import SideTopBarComponent from "./topbar/side.topbar.component";
import MainTopBarComponent from "./topbar/main.topbar.component";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-col w-1/7 bg-white">
        <SideTopBarComponent />
        <SideBarComponent />
      </div>
      <div className="flex-col w-full">
        <MainTopBarComponent />
        <main className="m-4">{children}</main>
      </div>
    </div>
  );
}