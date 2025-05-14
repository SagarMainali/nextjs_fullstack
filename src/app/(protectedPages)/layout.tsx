import Link from "next/link";
import { ModalProvider } from "@/context/modalContext";

export default function ProtectedPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            <div className="h-screen flex flex-col p-4">
                <div className="flex gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/posts">Posts</Link>
                </div>
                <div className="flex-1 py-6 relative">
                    {children}
                </div>
            </div>
        </ModalProvider>
    );
}

// layout for protected pages that contains navbars
