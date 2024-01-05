"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

import { Item } from "./item";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">; // 是否是根目录
    level?: number; // 层级
    data?: Doc<"documents">[]; // 数据
}

export const DocumentList = ({
    parentDocumentId,
    level = 0
}: DocumentListProps) => {
    // 获取当前路由参数
    const params = useParams();
    // 获取路由
    const router = useRouter();
    // 是否展开 https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    const [expanded, setExpanded] = useState<Record<string, boolean>>({}); // Record<string, boolean> 代表一个对象，key 是 string，value 是 boolean，和字典一样

    // 展开 参数是 documentId
    const onExpand = (documentId: string) => {
        // setCount(count => count + 1);
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };

    // 获取数据
    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId
    });

    // 跳转到指定页面
    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    // 如果documents没有数据，就显示骨架屏
    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${(level * 12) + 25}px` : undefined
                }}
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
            >
                No pages inside
            </p>
            {documents.map((document) => (
                <div key={document._id}>
                    <Item
                        id={document._id}
                        onClick={() => onRedirect(document._id)}
                        label={document.title}
                        icon={FileIcon}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={() => onExpand(document._id)}
                        expanded={expanded[document._id]}
                    />
                    {/* 如果展开，则嵌套显示DocList */}
                    {expanded[document._id] && (
                        <DocumentList
                            parentDocumentId={document._id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </>
    );
};
