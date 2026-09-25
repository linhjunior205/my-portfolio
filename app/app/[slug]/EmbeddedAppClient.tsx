"use client";

import { useEffect, useRef } from "react";

interface EmbeddedAppClientProps {
  readonly initialUrl: string;
  readonly title: string;
}

export function EmbeddedAppClient({ initialUrl, title }: EmbeddedAppClientProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 1. Initial sync: forward parent URL search params to iframe if any exist
    if (iframeRef.current && window.location.search) {
      try {
        const u = new URL(initialUrl, window.location.href);
        const parentParams = new URLSearchParams(window.location.search);
        parentParams.forEach((val, key) => {
          u.searchParams.set(key, val);
        });
        iframeRef.current.src = u.toString();
      } catch {
        // fallback to initialUrl
      }
    }

    // 2. Bi-directional sync via postMessage
    const handleMessage = (event: MessageEvent) => {
      // Check if message is from embedded app to sync query params
      if (event.data && typeof event.data === "object" && event.data.type === "SYNC_QUERY_PARAMS") {
        const { params } = event.data;
        if (typeof params === "string") {
          const newUrl = params
            ? `${window.location.pathname}?${params}`
            : window.location.pathname;
          window.history.replaceState(null, "", newUrl);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [initialUrl]);

  return (
    <iframe
      ref={iframeRef}
      src={initialUrl}
      title={title}
      className="block h-full w-full border-0"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="clipboard-read; clipboard-write; fullscreen"
    />
  );
}
