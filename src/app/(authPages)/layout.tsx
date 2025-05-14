export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="h-screen flex items-center justify-center">
            <body>
                {children}
            </body>
        </html>
    );
}

// layout for login and signup pages without navbars
