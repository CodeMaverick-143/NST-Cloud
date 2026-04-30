import Link from "next/link";
import { LayoutDashboard, FolderKanban, ShieldCheck, Settings, Server } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Server className="w-5 h-5 text-primary" />
          <span>NST-Cloud</span>
        </Link>
      </div>
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="grid gap-1 px-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
            <FolderKanban className="w-4 h-4" />
            Projects
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
            <ShieldCheck className="w-4 h-4" />
            Admin
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-border">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
