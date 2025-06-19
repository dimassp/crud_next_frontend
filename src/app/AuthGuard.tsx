'use client';

import React, { useLayoutEffect } from "react";
import { isAuthenticated } from "@/utils/Auth";
import { redirect } from "next/navigation";

export default function checkAuthenticated({ children }: { children: React.ReactNode }) {
    useLayoutEffect(() => {
        if (!isAuthenticated) {
            redirect("/login");
        }
    }, []);

    return (
        <>
            {children}
        </>
    )
}