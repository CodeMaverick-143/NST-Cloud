import { Bell, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0">
      <div className="text-sm font-medium text-muted-foreground">
        Workspace / Default
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground border border-border">
          <UserCircle className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
