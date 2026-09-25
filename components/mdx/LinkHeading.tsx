"use client"

import { slugify } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "sonner"

interface LinkHeadingProps {
    children: React.ReactNode
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function LinkHeading({ children, as }: LinkHeadingProps) {
    const Component = as || 'h2';
    const classMap = {
        h1: 'text-3xl font-bold my-6',
        h2: 'text-2xl font-bold my-4',
        h3: 'text-xl font-semibold mt-6 mb-3',
        h4: 'text-lg font-semibold mt-5 mb-2',
        h5: 'text-base font-semibold mt-4 mb-2',
        h6: 'text-sm font-semibold mt-3 mb-1',
    }

    const buttonSizeMap = {
        h1: 'h-8 w-8',
        h2: 'h-7 w-7',
        h3: 'h-6 w-6',
        h4: 'h-5 w-5',
        h5: 'h-4 w-4',
        h6: 'h-4 w-4',
    }

    const iconSizeMap = {
        h1: '18',
        h2: '16',
        h3: '14',
        h4: '12',
        h5: '10',
        h6: '10',
    }

    const id = slugify(children as string);

    const copyURL = (): void => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url).then(
            () => {
                toast.success("Link copied to clipboard!");
            },
            () => {
                toast.error("Failed to copy link.");
            }
        );
    };

    return (
        <div className={`flex items-center group ${classMap[Component]}`}>
            <Component id={id}>
                {children}
            </Component>
            <Button
                variant="ghost"
                size="icon"
                onClick={copyURL}
                className={`inline-flex ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${buttonSizeMap[Component]} text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 align-text-top`}
                aria-label="Copy link to heading"
            >
                <svg
                    width={iconSizeMap[Component]}
                    height={iconSizeMap[Component]}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            </Button>
        </div>
    );
}