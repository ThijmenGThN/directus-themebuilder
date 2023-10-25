import Sidebar from "./Sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full bg-gray-50">
            <Sidebar>
                {children}
            </Sidebar>
        </div>
    )
}
