import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Github } from "@/components/icons";

const MOCK_PROJECTS = [
  {
    id: "1",
    name: "hackathon-api",
    repo: "nst-student/hackathon-api",
    status: "running",
    url: "hackathon-api.apps.nstcloud.local",
    runtime: "Node.js",
    updatedAt: "2h ago"
  },
  {
    id: "2",
    name: "portfolio-site",
    repo: "nst-student/portfolio",
    status: "failed",
    url: "portfolio-site.apps.nstcloud.local",
    runtime: "Next.js",
    updatedAt: "1d ago"
  },
  {
    id: "3",
    name: "data-scraper",
    repo: "nst-student/python-scraper",
    status: "stopped",
    url: "-",
    runtime: "Python",
    updatedAt: "3d ago"
  }
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and deploy your applications.</p>
        </div>
        <Link href="/projects/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="flex items-center px-3 py-2 border border-border rounded-md bg-card/50 focus-within:ring-1 focus-within:ring-primary max-w-md transition-shadow">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Search projects..."
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-foreground"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_PROJECTS.map((project) => (
          <Link href={`/projects/${project.name}`} key={project.id} className="block group">
            <div className="border border-border rounded-lg p-5 bg-card hover:border-primary/50 transition-colors h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg truncate pr-2">{project.name}</h3>
                <Badge variant={
                  project.status === 'running' ? 'success' :
                    project.status === 'failed' ? 'destructive' : 'secondary'
                }>
                  {project.status}
                </Badge>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Github className="w-4 h-4" />
                  <span className="truncate">{project.repo}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="truncate">{project.runtime}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
                <span className="truncate max-w-[150px]">{project.url}</span>
                <span>{project.updatedAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
