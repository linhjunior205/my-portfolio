"use client"

import { useEffect, useState } from "react";
import { CursorEffectResult, trailingCursor } from "cursor-effects";

export default function TrailingCursor() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkIsDesktop = () => {
            // More reliable desktop detection
            const hasHover = window.matchMedia('(hover: hover)').matches;
            const hasPointer = window.matchMedia('(pointer: fine)').matches;
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            setIsDesktop(hasHover && hasPointer && !isTouchDevice);
        };

        checkIsDesktop();
        window.addEventListener('resize', checkIsDesktop);

        return () => {
            window.removeEventListener('resize', checkIsDesktop);
        };
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const effect: CursorEffectResult = new (trailingCursor as any)({
            particles: 20,
            rate: 0.5
        });

        return () => {
            const canvas = document.querySelector("canvas.cursor-effects") as HTMLCanvasElement;
            if (canvas) {
                canvas.remove();
            }
            effect.destroy();
        };
    }, [isDesktop]);

    return null;
}