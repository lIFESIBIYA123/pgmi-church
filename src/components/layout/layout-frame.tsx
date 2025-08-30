"use client"

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useEffect, useState } from "react";

interface LiveState {
    isLive: boolean;
    url?: string;
    title?: string;
}

export function LayoutFrame({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const [live, setLive] = useState<LiveState>({ isLive: false });

    useEffect(() => {
        // Fetch live status from API (based on latest live sermon or live settings)
        fetch("/api/sermons/latest?latest=single")
            .then((r) => r.json())
            .then((s) => {
                if (s?.isLive && (s?.liveStreamUrl || s?.videoUrl)) {
                    setLive({ isLive: true, url: s.liveStreamUrl ?? s.videoUrl, title: s.title });
                } else {
                    setLive({ isLive: false });
                }
            })
            .catch(() => setLive({ isLive: false }));
    }, [pathname]);

    return (
        <>
            {!isAdmin && <Navbar live={live} />}
            <main className="flex-1">{children}</main>
            {!isAdmin && <Footer />}
        </>
    );
}
