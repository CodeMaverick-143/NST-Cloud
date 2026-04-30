import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";

export default function NewProject() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Create a New Project</h1>
              <p className="text-muted-foreground text-sm mt-1">Deploy your repository to NST-Cloud.</p>
            </div>

            <form className="space-y-8">
              {/* Repository Source */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b border-border pb-2">1. Connect Repository</h3>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">GitHub Repository</label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option>Select a repository...</option>
                    <option>nst-student/hackathon-api</option>
                    <option>nst-student/portfolio</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Branch</label>
                  <input type="text" defaultValue="main" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b border-border pb-2">2. Configure Build</h3>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Runtime Preset</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Node.js', 'Python', 'Next.js', 'Static'].map(preset => (
                      <div key={preset} className="border border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary/50 transition-colors bg-card">
                        <span className="text-sm font-medium">{preset}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Build Command (Optional)</label>
                    <input type="text" placeholder="e.g. npm run build" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Start Command (Optional)</label>
                    <input type="text" placeholder="e.g. npm start" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                </div>
              </div>

              {/* Environment Variables */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b border-border pb-2">3. Environment Variables</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="KEY" className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono placeholder:font-sans focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
                  <input type="text" placeholder="VALUE" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono placeholder:font-sans focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
                </div>
                <Button variant="secondary" size="sm" type="button" className="mt-2">Add Variable</Button>
              </div>

              <div className="pt-6 border-t border-border flex justify-end gap-4">
                <Button variant="ghost" type="button">Cancel</Button>
                <Button type="button" size="lg">Deploy Project</Button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
