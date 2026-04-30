import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Activity, Clock, Github, Settings, Terminal, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">

          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                  hackathon-api
                  <Badge variant="success">running</Badge>
                </h1>
                <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
                  <Github className="w-4 h-4" /> nst-student/hackathon-api
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Square className="w-4 h-4" /> Stop
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <Play className="w-4 h-4" /> Redeploy
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">

                {/* Runtime Logs Viewer */}
                <div className="border border-border rounded-lg bg-card overflow-hidden flex flex-col h-[400px]">
                  <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-muted/20">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <Terminal className="w-4 h-4" /> Runtime Logs
                    </div>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <div className="p-4 font-mono text-xs text-muted-foreground overflow-y-auto flex-1 bg-black leading-relaxed">
                    <div className="text-blue-400">[info] Starting service hackathon-api...</div>
                    <div className="text-green-400">[success] Database connected.</div>
                    <div className="text-foreground">[info] Express server listening on port 4000</div>
                    <div className="text-foreground">[info] GET /health 200 OK - 2ms</div>
                    <div className="text-foreground">[info] GET /api/v1/teams 200 OK - 15ms</div>
                    <div className="animate-pulse mt-2 block w-2 h-4 bg-primary/50"></div>
                  </div>
                </div>

                {/* Deployment Timeline */}
                <div className="border border-border rounded-lg bg-card p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Deployment History
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 items-start pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <div className="mt-1">
                          <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-green-500' : 'bg-green-500/50'}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Deployed commit 3f8a92b</p>
                          <p className="text-xs text-muted-foreground mt-1">Triggered by git push • {i * 2} hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="border border-border rounded-lg bg-card p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Configuration
                  </h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">URL</dt>
                      <dd className="font-medium mt-1 text-primary"><a href="#">hackathon-api.apps.nstcloud.local</a></dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Runtime Preset</dt>
                      <dd className="font-medium mt-1">Node.js</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Start Command</dt>
                      <dd className="font-mono bg-muted px-2 py-1 rounded text-xs mt-1 w-fit">npm start</dd>
                    </div>
                  </dl>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button variant="outline" className="w-full">Edit Configuration</Button>
                  </div>
                </div>

                <div className="border border-border rounded-lg bg-card p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Current Usage
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Memory</span>
                        <span className="font-medium">120 MB / 512 MB</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">CPU</span>
                        <span className="font-medium">0.05 / 0.5 Cores</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
