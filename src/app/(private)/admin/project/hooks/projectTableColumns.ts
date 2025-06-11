// components/projects.table.columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Project } from "../model/project";


export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },
  {
    accessorKey: "prefix",
    header: "PREFIX",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    header: "ACTIONS",
    enableSorting: false,
  },
];
