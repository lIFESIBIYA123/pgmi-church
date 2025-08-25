'use client'

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar';
import { useSession } from 'next-auth/react';
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Calendar,
  ExternalLink,
  Lock,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// Types
interface Page {
  _id: string;
  slug: string;
  title: string;
  content: string;
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  isMainAdmin?: boolean;
}

interface PageFormData {
  slug: string;
  title: string;
  content: string;
}

// Constants
const INITIAL_FORM_DATA: PageFormData = {
  slug: '',
  title: '',
  content: ''
};

// Utility functions
const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Custom hooks
const usePageManagement = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/pages');

      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }

      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPage = useCallback(async (pageData: PageFormData) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create page');
      }

      await fetchPages();
      toast.success('Page created successfully');
      return true;
    } catch (error) {
      console.error('Error creating page:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create page');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [fetchPages]);

  const updatePage = useCallback(async (pageId: string, pageData: PageFormData) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pageData, _id: pageId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update page');
      }

      await fetchPages();
      toast.success('Page updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update page');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [fetchPages]);

  const deletePage = useCallback(async (pageId: string) => {
    try {
      const response = await fetch(`/api/pages?id=${pageId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete page');
      }

      await fetchPages();
      toast.success('Page deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete page');
      return false;
    }
  }, [fetchPages]);

  return {
    pages,
    loading,
    submitting,
    fetchPages,
    createPage,
    updatePage,
    deletePage
  };
};

// Components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      <p className="mt-2 text-gray-600">Loading pages...</p>
    </div>
  </div>
);

const PageFormDialog = ({
  isOpen,
  onClose,
  editingPage,
  onSubmit,
  submitting
}: {
  isOpen: boolean;
  onClose: () => void;
  editingPage: Page | null;
  onSubmit: (data: PageFormData) => Promise<boolean>;
  submitting: boolean;
}) => {
  const [formData, setFormData] = useState<PageFormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    if (editingPage) {
      setFormData({
        slug: editingPage.slug,
        title: editingPage.title,
        content: editingPage.content
      });
    } else {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [editingPage, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      onClose();
    }
  };

  const updateFormData = (field: keyof PageFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPage ? 'Edit Page' : 'Create New Page'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium">
                URL Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                placeholder="e.g., about-us"
                value={formData.slug}
                onChange={(e) => updateFormData('slug', e.target.value)}
                required
                disabled={submitting}
              />
              <p className="text-xs text-gray-500">
                Will be available at /p/{formData.slug || 'your-slug'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Page Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter page title"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              rows={15}
              placeholder="Enter page content (HTML supported)"
              value={formData.content}
              onChange={(e) => updateFormData('content', e.target.value)}
              required
              disabled={submitting}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              HTML tags are supported. Content length: {formData.content.length} characters
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingPage ? 'Update Page' : 'Create Page'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PageCard = ({
  page,
  onEdit,
  onDelete,
  canDelete
}: {
  page: Page;
  onEdit: (page: Page) => void;
  onDelete: (pageId: string) => void;
  canDelete: boolean;
}) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${page.title}"?`)) {
      onDelete(page._id);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {page.title}
            </CardTitle>
            <CardDescription className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 flex-shrink-0" />
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  /p/{page.slug}
                </code>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>Updated {formatDate(page.updatedAt)}</span>
              </div>
            </CardDescription>
          </div>
          {page.isSystem && (
            <Badge variant="secondary" className="flex-shrink-0">
              System
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {stripHtml(page.content).substring(0, 150)}
            {stripHtml(page.content).length > 150 && '...'}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Button size="sm" variant="outline" asChild>
            <a
              href={`/p/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View
            </a>
          </Button>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(page)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            {canDelete && !page.isSystem && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleDelete}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = () => (
  <div className="text-center py-12">
    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
    <p className="text-gray-600 mb-6">Get started by creating your first page.</p>
  </div>
);

// Main component
export default function PagesPage() {
  const { data: session } = useSession();
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    pages,
    loading,
    submitting,
    fetchPages,
    createPage,
    updatePage,
    deletePage
  } = usePageManagement();

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleSubmit = async (formData: PageFormData): Promise<boolean> => {
    if (editingPage) {
      return await updatePage(editingPage._id, formData);
    } else {
      return await createPage(formData);
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setIsDialogOpen(true);
  };

  const handleNewPage = () => {
    setEditingPage(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPage(null);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const user = session.user as User;
  const isMainAdmin = user?.isMainAdmin;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage website pages and content ({pages.length} page{pages.length !== 1 ? 's' : ''})
              </p>
            </div>

            {isMainAdmin ? (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleNewPage} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Page
                  </Button>
                </DialogTrigger>
              </Dialog>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
                <Lock className="h-4 w-4" />
                <span>Only main admin can add/delete pages</span>
              </div>
            )}
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : pages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <PageCard
                  key={page._id}
                  page={page}
                  onEdit={handleEdit}
                  onDelete={deletePage}
                  canDelete={isMainAdmin || false}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <PageFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingPage={editingPage}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}
