// components/projects.table.columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Project } from "../service/project";
import StatusBadge from '@/app/resusable/status.badge.component';
import { stat } from "fs";


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
