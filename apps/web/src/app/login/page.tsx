import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 p-8 border border-border rounded-xl bg-card shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center mb-4">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Sign in to NST-Cloud</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Use your college GitHub account to continue.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Button className="w-full flex items-center gap-3" size="lg">
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to the internal platform usage policies.
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}
