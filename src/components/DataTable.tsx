"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../utils/axiosInstance";
import { DataTable as DefaultDataTable } from "./data-table";
import { userColumns } from "@/components/Columns";

export default function DataTable({
    apiURL,
}: {
    apiURL: string,
}) {
    const [apiData, setData] = useState();

    useEffect(() => {
        const result = fetchData({apiUrl: apiURL});
        console.log("Check re-render fetch from API: ", result);
        result.then(response => {
            setData(response.data);
        });
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
            <DefaultDataTable data={apiData} customColumns={userColumns} />
        </>
    )
}
