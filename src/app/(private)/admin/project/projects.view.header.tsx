'use client';
interface ProjectsViewHeaderProps {
  
}

export default function ProjectsViewHeader() {
  return (
    <div className="flex flex-row items-center overflow-auto w-full">
      <div className="flex gap-2 h-fit items-center">
        <h1 className="text-xl font-semibold text-primary-800">
          Project Management
        </h1>
      </div>
    </div>
  );
}
