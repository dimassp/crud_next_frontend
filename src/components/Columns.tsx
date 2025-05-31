import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

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
        header: "Full name",
        cell: ({ row }) => {
            return row.original.name
        }
    },
    {
        accessorKey: "birth_place",
        header: "Birth Place",
        cell: ({ row }) => {
            return row.original.birth_place
        }
    },
    {
        accessorKey: "role.name",
        header: "Role",
        cell: ({row}) => {
            return row.original.role?.name
        }
    },
];