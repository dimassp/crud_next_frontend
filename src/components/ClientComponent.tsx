"use client";

import { useEffect, useState } from "react";
import AxiosInstance from "../utils/axiosInstance";
import data from "@/app/user/data.json";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

const roleSchema = z.object({
    name: z.string()
});

const schema = z.object({
    id: z.number(),
    name: z.string(),
    birth_place: z.string(),
    dob: z.string(),
    role: roleSchema.nullable()
})

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        accessorKey: "name",
        header: "Full name",
        cell: ({row}) => {
            return row.original.name
        }
    },
    {
        accessorKey: "birth_place",
        header: "Birth Place",
        cell: ({row}) => {
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

export default function Component() {
    console.log(data);
    const [apiData, setData] = useState();

    useEffect(() => {
        AxiosInstance.get("http://localhost:8000/api/user").then(response => {
            console.log("Check response: \n")
            console.log(response.data)
            setData(response.data);
            console.log("Check response.request.responseURL: ", response.request.responseURL);
        })
    }, [])

    if (apiData === undefined) {
        return (
            <>
                Loading Data
            </>
        )
    }

    return (
        <>
            <DataTable data={apiData} schema={schema} customColumns={columns}/>
        </>
    )

}
