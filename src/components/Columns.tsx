import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

const roleSchema = z.object({
    name: z.string()
});

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    birth_place: z.string(),
    dob: z.string(),
    role: roleSchema.nullable()
})

export const userColumns: ColumnDef<z.infer<typeof userSchema>>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.original.name
        },
        enableSorting: true
    },
    {
        accessorKey: "birth_place",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Birth place
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.original.birth_place
        }
    },
    {
        accessorKey: "role.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.original.role?.name
        }
    },
];