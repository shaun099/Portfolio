"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, AlertCircle, Image as ImageIcon } from "lucide-react";
import type { ApiProject } from "@/types/projects";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: ApiProject | null; // If provided, edit mode; otherwise, create mode
  onSuccess: (project: ApiProject, isEdit: boolean) => void;
}

export default function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ProjectDialogProps) {
  const isEdit = Boolean(project);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [liveProjectUrl, setLiveProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // When project prop changes or modal opens, populate form
  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setShortDescription(project.shortDescription || "");
      setLongDescription(project.longDescription || "");
      setThumbnailUrl(project.thumbnailUrl || "");
      setTagsInput(Array.isArray(project.tags) ? project.tags.join(", ") : "");
      setTechStackInput(Array.isArray(project.techStack) ? project.techStack.join(", ") : "");
      setLiveProjectUrl(project.liveProjectUrl || "");
      setGithubUrl(project.githubUrl || "");
      setIsPublished(Boolean(project.isPublished));
    } else {
      setTitle("");
      setShortDescription("");
      setLongDescription("");
      setThumbnailUrl("");
      setTagsInput("");
      setTechStackInput("");
      setLiveProjectUrl("");
      setGithubUrl("");
      setIsPublished(true); // Default new projects to published
    }
    setError(null);
  }, [project, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const parsedTags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const parsedTech = techStackInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const trimmedLiveUrl = liveProjectUrl.trim();
      const trimmedGithubUrl = githubUrl.trim();

      const payload = {
        title: title.trim(),
        shortDescription: shortDescription.trim(),
        longDescription: longDescription.trim() || shortDescription.trim(),
        thumbnailUrl: thumbnailUrl.trim(),
        tags: parsedTags,
        techStack: parsedTech,
        liveProjectUrl: trimmedLiveUrl ? trimmedLiveUrl : null,
        githubUrl: trimmedGithubUrl ? trimmedGithubUrl : null,
        isPublished,
      };

      const url = isEdit && project
        ? `/api/v1/projects/${project.id}`
        : "/api/v1/projects";

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || (data.errors ? JSON.stringify(data.errors) : "Operation failed"));
      }

      onSuccess(data.data, isEdit);
      onOpenChange(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save project. Please check fields.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 text-white p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? "Modify project details below and save your changes."
              : "Fill out the project details to add it to your portfolio database."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm my-2">
            <AlertCircle size={18} className="shrink-0" />
            <span className="break-all">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NextGen Autonomous Rover"
              required
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDescription" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
              Short Description (Card Summary) <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="A brief overview shown on the card (1-3 sentences)..."
              required
              rows={2}
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
            />
          </div>

          {/* Long Description */}
          <div className="space-y-2">
            <Label htmlFor="longDescription" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
              Detailed Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="longDescription"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Full comprehensive breakdown of architecture, achievements and features..."
              required
              rows={4}
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
            />
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
              Thumbnail URL or Path <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <Input
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="/projects/exam_seating.png or https://example.com/image.png"
                required
                className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
              />
            </div>
            <p className="text-xs text-zinc-500">
              Can be a local path in `/public` or any remote HTTPS image URL.
            </p>
          </div>

          {/* Tags & Tech Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                Category Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Full Stack Application, IoT, AI"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
              />
              <p className="text-xs text-zinc-500">The first tag is highlighted as the card category badge.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                Tech Stack (comma-separated)
              </Label>
              <Input
                id="techStack"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="React, Next.js, Supabase, TypeScript"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
              />
              <p className="text-xs text-zinc-500">The first two technologies will be badged on the card.</p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveProjectUrl" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                Live Project URL (optional)
              </Label>
              <Input
                id="liveProjectUrl"
                type="url"
                value={liveProjectUrl}
                onChange={(e) => setLiveProjectUrl(e.target.value)}
                placeholder="https://myproject.vercel.app"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                GitHub Repository URL (optional)
              </Label>
              <Input
                id="githubUrl"
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-red-500/20"
              />
            </div>
          </div>

          {/* Publish Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/60">
            <div className="space-y-0.5">
              <Label htmlFor="isPublished" className="text-sm font-medium text-white cursor-pointer">
                Publish Project
              </Label>
              <p className="text-xs text-zinc-400">
                Published projects appear live on the portfolio website.
              </p>
            </div>
            <Switch
              id="isPublished"
              checked={isPublished}
              onCheckedChange={setIsPublished}
              className="data-checked:bg-red-500"
            />
          </div>

          <DialogFooter className="pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-500 text-white font-medium shadow-md shadow-red-600/20"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Project"
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
