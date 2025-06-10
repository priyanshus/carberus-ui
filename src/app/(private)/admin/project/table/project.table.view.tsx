"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Project } from "../service/project";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { ProjectActionsPopover } from "../project.actions.popover";
import StatusBadge from "@/app/resusable/status.badge.component";

type Props = {
  data: Project[];
  columns: ColumnDef<Project>[];
  onActionSelect: (action: string, project: Project) => void;
};

export function ProjectsTable({ data, columns, onActionSelect }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div>
      <table className="w-full text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="border-b border-border-highlighter bg-background-higlighter font-bold text-sm text-gray-500"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer p-2 "
                >
                  <div className="flex flex-row">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <div className="flex flex-col ml-1 leading-none gap-0 p-0 m-0 justify-center">
                      {header.column.id !== "ACTIONS" && (
                        <div>
                          <TriangleUpIcon className="!block !leading-none !h-3 !w-3" />
                          <TriangleDownIcon className="!block !leading-none !h-3 !w-3" />
                        </div>
                      )}
                    </div>

                    {header.column.getIsSorted() === "asc"}
                    {header.column.getIsSorted() === "desc"}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border border-gray-100" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  title={String(cell.getValue())}
                  className={clsx(
                    "max-w-[160px] p-2 text-sm text-primary-500 truncate whitespace-nowrap overflow-hidden text-ellipsis",
                    cell.column.id === "title" && "text-primary-800 font-bold"
                  )}
                >
                  
                  {cell.column.id === "ACTIONS" && (
                    <ProjectActionsPopover
                      project={cell.row.original}
                      onSelect={(action) => {
                        onActionSelect(action, cell.row.original);
                      }}
                    />
                  )}

                  {cell.column.id === "status" ? (
                    <StatusBadge
                      label={cell.getValue() as string}
                      status={cell.getValue() as string}
                    />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
