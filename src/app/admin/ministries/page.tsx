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
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Ministry {
  _id: string;
  name: string;
  description?: string;
  longDescription?: string;
  meetingTime?: string;
  location?: string;
  leader?: string;
  contact?: string;
  activities?: string[];
  image?: string;
  isActive?: boolean;
}

export default function MinistriesPage() {
  const { data: session } = useSession();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    meetingTime: '',
    location: '',
    leader: '',
    contact: '',
    activities: '',
    image: '',
    isActive: true
  });

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      const response = await fetch('/api/ministries');
      const data = await response.json();
      setMinistries(data);
    } catch (error) {
      console.error('Error fetching ministries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingMinistry ? `/api/ministries` : '/api/ministries';
      const method = editingMinistry ? 'PUT' : 'POST';
      const body = editingMinistry ? {
        ...formData,
        _id: editingMinistry._id,
        activities: formData.activities ? formData.activities.split(',').map(a => a.trim()) : []
      } : {
        ...formData,
        activities: formData.activities ? formData.activities.split(',').map(a => a.trim()) : []
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setEditingMinistry(null);
        resetForm();
        fetchMinistries();
      }
    } catch (error) {
      console.error('Error saving ministry:', error);
    }
  };

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      name: ministry.name,
      description: ministry.description || '',
      longDescription: ministry.longDescription || '',
      meetingTime: ministry.meetingTime || '',
      location: ministry.location || '',
      leader: ministry.leader || '',
      contact: ministry.contact || '',
      activities: ministry.activities?.join(', ') || '',
      image: ministry.image || '',
      isActive: ministry.isActive !== false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ministry?')) return;

    try {
      const response = await fetch(`/api/ministries?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchMinistries();
      }
    } catch (error) {
      console.error('Error deleting ministry:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      longDescription: '',
      meetingTime: '',
      location: '',
      leader: '',
      contact: '',
      activities: '',
      image: '',
      isActive: true
    });
  };

  const handleNewMinistry = () => {
    setEditingMinistry(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Ministries</h1>
              <p className="text-sm text-gray-600">Manage church ministries and programs</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleNewMinistry}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ministry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingMinistry ? 'Edit Ministry' : 'Add New Ministry'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Ministry Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Short Description</Label>
                    <Input
                      id="description"
                      placeholder="Brief description for display"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="longDescription">Detailed Description</Label>
                    <Textarea
                      id="longDescription"
                      rows={3}
                      placeholder="Full description of the ministry"
                      value={formData.longDescription}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="leader">Leader</Label>
                      <Input
                        id="leader"
                        placeholder="Ministry leader name"
                        value={formData.leader}
                        onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact</Label>
                      <Input
                        id="contact"
                        placeholder="Contact information"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="meetingTime">Meeting Time</Label>
                      <Input
                        id="meetingTime"
                        placeholder="e.g., Sundays 9:00 AM"
                        value={formData.meetingTime}
                        onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Main Hall"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="activities">Activities</Label>
                    <Input
                      id="activities"
                      placeholder="Bible study, Prayer, Fellowship (comma separated)"
                      value={formData.activities}
                      onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <Label htmlFor="isActive">Active Ministry</Label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingMinistry ? 'Update' : 'Create'} Ministry
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
              <p className="mt-2 text-gray-600">Loading ministries...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministries.map((ministry) => (
                <Card key={ministry._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{ministry.name}</CardTitle>
                        <CardDescription className="mt-2">
                          {ministry.leader && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Users className="h-4 w-4" />
                              <span>{ministry.leader}</span>
                            </div>
                          )}
                          {ministry.meetingTime && (
                            <div className="flex items-center space-x-2 text-sm mt-1">
                              <Clock className="h-4 w-4" />
                              <span>{ministry.meetingTime}</span>
                            </div>
                          )}
                          {ministry.location && (
                            <div className="flex items-center space-x-2 text-sm mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{ministry.location}</span>
                            </div>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {!ministry.isActive && <Badge variant="secondary">Inactive</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {ministry.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {ministry.description}
                      </p>
                    )}

                    {ministry.activities && ministry.activities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 mb-1">Activities:</p>
                        <div className="flex flex-wrap gap-1">
                          {ministry.activities.map((activity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {ministry.contact && (
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{ministry.contact}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(ministry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(ministry._id)}>
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
