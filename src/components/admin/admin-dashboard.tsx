"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  LogOut,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  FolderGit2,
  Layers,
  ArrowUpRight,
  Loader2,
  RefreshCw,
} from "lucide-react";
import type { ApiProject } from "@/types/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectDialog from "./project-dialog";

interface AdminDashboardProps {
  user: { id: string; email?: string };
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ApiProject | null>(null);

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ApiProject | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toggle publish loading per project
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function fetchAllProjects() {
    try {
      setError(null);
      const res = await fetch("/api/v1/projects?all=true");
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load projects");
      }

      setProjects(Array.isArray(data.data) ? data.data : []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error fetching projects");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchAllProjects();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await fetchAllProjects();
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      onLogout();
    }
  }

  // Handle project created/edited from ProjectDialog
  function handleProjectSuccess(savedProject: ApiProject, isEdit: boolean) {
    if (isEdit) {
      setProjects((prev) =>
        prev.map((p) => (p.id === savedProject.id ? savedProject : p))
      );
    } else {
      setProjects((prev) => [savedProject, ...prev]);
    }
  }

  // Quick toggle isPublished
  async function handleTogglePublish(project: ApiProject) {
    setTogglingId(project.id);
    const newStatus = !project.isPublished;

    try {
      const res = await fetch(`/api/v1/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newStatus }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update project status");
      }

      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, isPublished: newStatus } : p
        )
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to toggle status");
    } finally {
      setTogglingId(null);
    }
  }

  // Execute deletion
  async function confirmDelete() {
    if (!projectToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/v1/projects/${projectToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete project");
      }

      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  // Filtered and searched projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Status filter
      if (statusFilter === "published" && !p.isPublished) return false;
      if (statusFilter === "draft" && p.isPublished) return false;

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchShort = p.shortDescription?.toLowerCase().includes(q);
      const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
      const matchTech = p.techStack?.some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchShort || matchTag || matchTech;
    });
  }, [projects, statusFilter, searchQuery]);

  // Statistics
  const totalCount = projects.length;
  const publishedCount = projects.filter((p) => p.isPublished).length;
  const draftCount = projects.filter((p) => !p.isPublished).length;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 font-bold">
              <FolderGit2 size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white">Portfolio Admin</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-semibold">
                  Live
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Signed in as <span className="text-zinc-300 font-medium">{user.email || user.id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <span>View Site</span>
              <ArrowUpRight size={14} />
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-zinc-800 text-zinc-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors"
            >
              <LogOut size={14} className="mr-1.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header & Summary Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Project Management</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage, publish, update, and organize all projects shown on your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              <RefreshCw size={14} className={`mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button
              onClick={() => {
                setEditingProject(null);
                setDialogOpen(true);
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-medium shadow-lg shadow-red-600/20"
            >
              <Plus size={16} className="mr-1.5" />
              Add Project
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-zinc-950 border-zinc-800/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase font-mono text-zinc-400 font-semibold tracking-wider">Total Projects</p>
                <p className="text-3xl font-bold text-white mt-1">{totalCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Layers size={20} />
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase font-mono text-emerald-400 font-semibold tracking-wider">Published</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">{publishedCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Eye size={20} />
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase font-mono text-amber-400 font-semibold tracking-wider">Drafts</p>
                <p className="text-3xl font-bold text-amber-400 mt-1">{draftCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <EyeOff size={20} />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === "published"
                  ? "bg-zinc-800 text-emerald-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === "draft"
                  ? "bg-zinc-800 text-amber-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
            <Input
              type="text"
              placeholder="Search by title, tech, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:border-red-500 text-xs"
            />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Error Loading Projects</p>
              <p className="text-xs text-red-300/80">{error}</p>
            </div>
            <Button size="sm" variant="outline" onClick={handleRefresh} className="border-red-500/30 text-red-400 hover:bg-red-500/20">
              Try Again
            </Button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-zinc-500">
            <Loader2 size={32} className="animate-spin text-red-500" />
            <p className="text-sm">Loading projects from database...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 mb-3">
              <Layers size={22} />
            </div>
            <h3 className="text-base font-semibold text-white">No projects found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mt-1">
              {searchQuery
                ? `No projects matched "${searchQuery}". Try clearing search or filter.`
                : "No projects exist in this category yet. Click 'Add Project' to create one."}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="mt-4 border-zinc-800 text-zinc-300"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          /* Projects List */
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project) => {
              const isPublished = Boolean(project.isPublished);
              const isToggling = togglingId === project.id;
              const hasExternalImage = Boolean(
                project.thumbnailUrl &&
                  (project.thumbnailUrl.startsWith("http://") ||
                    project.thumbnailUrl.startsWith("https://"))
              );

              return (
                <Card
                  key={project.id}
                  className="bg-zinc-950 border-zinc-800/80 hover:border-zinc-700/80 transition-all overflow-hidden"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        {/* Thumbnail preview */}
                        <div className="relative w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                          {project.thumbnailUrl ? (
                            <Image
                              src={project.thumbnailUrl}
                              alt={project.title}
                              fill
                              unoptimized={hasExternalImage}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* Title, Badges, Desc */}
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-white truncate">
                              {project.title}
                            </h3>

                            {/* Status Badge */}
                            {isPublished ? (
                              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] uppercase font-mono">
                                Live
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px] uppercase font-mono">
                                Draft
                              </Badge>
                            )}

                            {/* Category Tag */}
                            {project.tags?.[0] && (
                              <Badge variant="outline" className="text-zinc-400 border-zinc-800 text-[10px]">
                                {project.tags[0]}
                              </Badge>
                            )}
                          </div>

                          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                            {project.shortDescription}
                          </p>

                          {/* Tech stack pill row */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {project.techStack?.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                              >
                                {tech}
                              </span>
                            ))}
                            {(project.techStack?.length || 0) > 4 && (
                              <span className="text-[10px] font-mono text-zinc-500">
                                +{(project.techStack?.length || 0) - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions and Live Links */}
                      <div className="flex flex-wrap items-center justify-between lg:justify-end w-full lg:w-auto gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-800/80">
                        {/* Publish Quick-Toggle */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                          <span className="text-xs text-zinc-400">
                            {isToggling ? "Updating..." : isPublished ? "Published" : "Draft"}
                          </span>
                          <Switch
                            checked={isPublished}
                            disabled={isToggling}
                            onCheckedChange={() => handleTogglePublish(project)}
                            className="data-checked:bg-emerald-500"
                          />
                        </div>

                        {/* External Links */}
                        <div className="flex items-center gap-1">
                          {project.liveProjectUrl && (
                            <a
                              href={project.liveProjectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                              title="Visit Live Site"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                              title="View GitHub Repository"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                        </div>

                        {/* Edit & Delete Buttons */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingProject(project);
                              setDialogOpen(true);
                            }}
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                          >
                            <Pencil size={14} className="mr-1.5" />
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setProjectToDelete(project);
                              setDeleteDialogOpen(true);
                            }}
                            className="border-zinc-800 text-red-400 hover:bg-red-500/10 hover:border-red-500/30"
                          >
                            <Trash2 size={14} className="mr-1.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      {/* Project Add/Edit Dialog */}
      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editingProject}
        onSuccess={handleProjectSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-950 border border-zinc-800 text-white p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2 text-red-500">
              <AlertCircle size={22} />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-zinc-400 pt-2">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-white">&quot;{projectToDelete?.title}&quot;</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-1.5" />
                  Deleting...
                </>
              ) : (
                "Delete Project"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
