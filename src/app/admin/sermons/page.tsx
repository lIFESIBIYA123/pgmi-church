'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar';
import { useSession } from 'next-auth/react';
import {
  Plus,
  Edit,
  Trash2,
  Play,
  Calendar,
  User,
  Clock
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  duration?: string;
  description?: string;
  videoUrl?: string;
  thumbnail?: string;
  isLive?: boolean;
  isLatest?: boolean;
  views?: number;
  downloads?: number;
}

export default function SermonsPage() {
  const { data: session } = useSession();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    preacher: '',
    date: '',
    duration: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    isLive: false,
    isLatest: false
  });

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await fetch('/api/sermons');
      const data = await response.json();
      setSermons(data);
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSermon ? `/api/sermons` : '/api/sermons';
      const method = editingSermon ? 'PUT' : 'POST';
      const body = editingSermon ? { ...formData, _id: editingSermon._id } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setEditingSermon(null);
        resetForm();
        fetchSermons();
      }
    } catch (error) {
      console.error('Error saving sermon:', error);
    }
  };

  const handleEdit = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setFormData({
      title: sermon.title,
      preacher: sermon.preacher,
      date: sermon.date.split('T')[0],
      duration: sermon.duration || '',
      description: sermon.description || '',
      videoUrl: sermon.videoUrl || '',
      thumbnail: sermon.thumbnail || '',
      isLive: sermon.isLive || false,
      isLatest: sermon.isLatest || false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;

    try {
      const response = await fetch(`/api/sermons?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchSermons();
      }
    } catch (error) {
      console.error('Error deleting sermon:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      preacher: '',
      date: '',
      duration: '',
      description: '',
      videoUrl: '',
      thumbnail: '',
      isLive: false,
      isLatest: false
    });
  };

  const handleNewSermon = () => {
    setEditingSermon(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sermons</h1>
              <p className="text-sm text-gray-600">Manage church sermons and recordings</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleNewSermon}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sermon
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="preacher">Preacher *</Label>
                      <Input
                        id="preacher"
                        value={formData.preacher}
                        onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 45 min"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="videoUrl">YouTube URL</Label>
                    <Input
                      id="videoUrl"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isLive"
                        checked={formData.isLive}
                        onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
                      />
                      <Label htmlFor="isLive">Live Stream</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isLatest"
                        checked={formData.isLatest}
                        onChange={(e) => setFormData({ ...formData, isLatest: e.target.checked })}
                      />
                      <Label htmlFor="isLatest">Latest Sermon</Label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSermon ? 'Update' : 'Create'} Sermon
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading sermons...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon) => (
                <Card key={sermon._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{sermon.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="h-4 w-4" />
                            <span>{sermon.preacher}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(sermon.date).toLocaleDateString()}</span>
                          </div>
                          {sermon.duration && (
                            <div className="flex items-center space-x-2 text-sm mt-1">
                              <Clock className="h-4 w-4" />
                              <span>{sermon.duration}</span>
                            </div>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {sermon.isLive && <Badge variant="destructive">Live</Badge>}
                        {sermon.isLatest && <Badge variant="default">Latest</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {sermon.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {sermon.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {sermon.views && (
                          <span>{sermon.views} views</span>
                        )}
                        {sermon.downloads && (
                          <span>{sermon.downloads} downloads</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        {sermon.videoUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer">
                              <Play className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleEdit(sermon)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(sermon._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
