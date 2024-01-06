"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
// 导入zustand的useSearch
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    // 用来判断是否挂载
    const [isMounted, setIsMounted] = useState(false);

    // 从useSearch中获取toggle、isOpen和onClose
    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    //在组件挂载时，设置isMounted为true，也就是达到了只有在useEffect挂载时才会执行的效果
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 监听键盘事件，当按下ctrl+k时，调用toggle函数
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                // 在这里调用toggle函数，如果原先是打开的，则关闭；如果原先是关闭的，则打开。
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        // 在组件卸载时（或者依赖项 [toggle] 发生变化时），通过返回的清理函数解除对键盘按下事件的监听，
        // 以避免内存泄漏或其他不必要的副作用。
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    };

    // 如果组件没有挂载，返回null
    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search ${user?.fullName}'s Notion...`}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((document) => (
                        <CommandItem
                            key={document._id}
                            value={`${document._id}-${document.title}`}
                            title={document.title}
                            onSelect={() => onSelect(document._id)}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>
                                {document.title}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}