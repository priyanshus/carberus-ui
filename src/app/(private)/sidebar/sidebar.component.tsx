import Link from "next/link";
import { sidebarMenuItems } from "./model/sidebar-menu-items";

export default async function SideBarComponent() {
  return (
    <div className="flex flex-col w-full ml-2 mt-10">
    {sidebarMenuItems.map((item, index) => (
      <div key={index} className="flex flex-col">
        {/* Header */}
        <div className="labelText text-background-light">
          <Link
        
            key={index}
            className="ml-2 cursor-pointer labelText text-white"
            href={item.href}
          >
            {item.displayText}
          </Link>
        </div>

        {/* List under the header */}
        {item.subMenu && item.subMenu.map((subItem, subIndex) => (
          <Link
        
            key={subIndex}
            className="ml-2 cursor-pointer labelText text-white"
            href={subItem.href}
          >
            {subItem.displayText}
          </Link>
        ))}
      </div>
    ))}
  </div>
  );
}
