import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Server, Zap, Shield, GitBranch } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-14 h-20 flex items-center justify-between border-b border-border">
        <Link className="flex items-center justify-center gap-2" href="#">
          <Server className="h-6 w-6 text-foreground" />
          <span className="font-bold text-xl tracking-tight">NST-Cloud</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#">
            Documentation
          </Link>
          <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#">
            Support
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="sm">Sign In</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6 py-24 lg:py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-border/20 via-background to-background">
        <div className="max-w-[800px] space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter sm:text-5xl">
            Internal Platform as a Service for <span className="text-neutral-400">NST</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
            Deploy your college projects instantly. Connect your GitHub repository, configure your runtime, and let NST-Cloud handle the ports, proxies, and uptime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto font-semibold">Start Deploying</Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">Read the Docs</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] w-full mt-32 text-left">
          <div className="flex flex-col gap-2 p-6 border border-border rounded-lg bg-card">
            <GitBranch className="h-6 w-6 text-foreground mb-2" />
            <h3 className="text-lg font-bold">GitHub Integrated</h3>
            <p className="text-sm text-muted-foreground">Automatic deployments from your branches. No SSH required.</p>
          </div>
          <div className="flex flex-col gap-2 p-6 border border-border rounded-lg bg-card">
            <Zap className="h-6 w-6 text-foreground mb-2" />
            <h3 className="text-lg font-bold">Instant Runtimes</h3>
            <p className="text-sm text-muted-foreground">Presets for Node, Python, Next.js, and static sites out of the box.</p>
          </div>
          <div className="flex flex-col gap-2 p-6 border border-border rounded-lg bg-card">
            <Shield className="h-6 w-6 text-foreground mb-2" />
            <h3 className="text-lg font-bold">Isolated & Secure</h3>
            <p className="text-sm text-muted-foreground">Projects run in strict Docker containers with limits and routing.</p>
          </div>
        </div>
      </main>
      <footer className="py-6 w-full border-t border-border flex flex-col sm:flex-row justify-center items-center px-4 md:px-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Newton School of Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}
