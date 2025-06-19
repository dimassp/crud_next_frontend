"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { format } from "date-fns";
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { apiPost, fetchData } from "@/utils/axiosInstance";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    name: z.string({
        required_error: "Enter your full name",
    }),
    birth_place: z.string({
        required_error: "Enter your birth place",
    }),
    role_id: z.number({
        required_error: "Select a role",
    }),
    dob: z.date({
        required_error: "Pick you date of birth",
    }),
})

export function FormAddUser() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [roles2, setRoles2] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const result = fetchData({ apiUrl: "http://localhost:8000/api/role" });
        result.then(response => {
            if (response) {
                setIsDisabled(false);
                setRoles2(response.data);
            }
        });
    }, [])

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const date = format(data.dob, 'yyyy-MM-dd');
        data.dob = date;
        const result = apiPost({ apiUrl: "http://localhost:8000/api/user", data: data });
        result.then((response) => {
            redirect("/user");
        })

        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your fullname" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birth_place"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birth Place</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your birth place" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Role</FormLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            disabled={isDisabled}
                                            onClick={() => !isDisabled && setOpen(!open)}
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? roles2.find((role) => role.id === field.value)?.name
                                                : "Select Role"}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                {!isDisabled && (
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search role..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>Role not found.</CommandEmpty>
                                                <CommandGroup>
                                                    {roles2.map((role) => (
                                                        <CommandItem
                                                            value={role.name}
                                                            key={role.id}
                                                            onSelect={() => {
                                                                form.setValue("role_id", role.id);
                                                                setOpen(false); // close on item click
                                                            }}
                                                        >
                                                            {role.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    role.id === field.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                )}
                            </Popover>
                            <FormDescription>
                                This will affect which menus you can access
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        // captionLayout="dropdown"
                                        // fromYear={1900}
                                        // toYear={new Date().getFullYear()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isDisabled} style={{ float: "right" }}>Save</Button>
            </form>
        </Form>
    )

}