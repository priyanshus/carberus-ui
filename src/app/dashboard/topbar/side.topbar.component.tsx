import { BsBackpack2Fill } from "react-icons/bs";

export default function SideTopBarComponent() {
  return (
    <div className="flex flex-auto h-1/15 bg-white overflow-auto border-b border-r border-gray-200">
      <div className="flex w-full justify-center self-center">
        <div className="flex flex-row">
          <BsBackpack2Fill className="h-6 w-6 m-1 text-blue-500"/>
          <p className="text-2xl font-bold">Carberus</p>
        </div>
      </div>
    </div>
  );
}