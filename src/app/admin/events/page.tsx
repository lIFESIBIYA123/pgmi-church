'use client'

import { useState, useEffect } from 'react';
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
  Calendar,
  Clock,
  MapPin,
  Users} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Event {
  _id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  category?: string;
  attendees?: number;
  maxAttendees?: number;
  featured?: boolean;
  isActive?: boolean;
}

export default function EventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    maxAttendees: '',
    featured: false,
    isActive: true
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEvent ? `/api/events` : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';
      const body = editingEvent ? {
        ...formData,
        _id: editingEvent._id,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined
      } : {
        ...formData,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setEditingEvent(null);
        resetForm();
        fetchEvents();
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date.split('T')[0],
      time: event.time || '',
      location: event.location || '',
      description: event.description || '',
      category: event.category || '',
      maxAttendees: event.maxAttendees?.toString() || '',
      featured: event.featured || false,
      isActive: event.isActive !== false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      category: '',
      maxAttendees: '',
      featured: false,
      isActive: true
    });
  };

  const handleNewEvent = () => {
    setEditingEvent(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className='min-h-screen bg-gray-50'>
      <DashboardSidebar />

      <div className='lg:pl-64'>
        <header className='bg-white shadow'>
          <div className='flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Events</h1>
              <p className='text-sm text-gray-600'>Manage church events and activities</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleNewEvent}>
                  <Plus className='h-4 w-4 mr-2' />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl'>
                <DialogHeader>
                  <DialogTitle>
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='title'>Title *</Label>
                      <Input
                        id='title'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor='category'>Category</Label>
                      <Input
                        id='category'
                        placeholder='e.g., Worship, Bible Study'
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='date'>Date *</Label>
                      <Input
                        id='date'
                        type='date'
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor='time'>Time</Label>
                      <Input
                        id='time'
                        type='time'
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='location'>Location</Label>
                    <Input
                      id='location'
                      placeholder='e.g., Main Sanctuary'
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor='maxAttendees'>Max Attendees</Label>
                    <Input
                      id='maxAttendees'
                      type='number'
                      placeholder='Leave empty for unlimited'
                      value={formData.maxAttendees}
                      onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                      id='description'
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='featured'
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      <Label htmlFor='featured'>Featured Event</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='isActive'
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <Label htmlFor='isActive'>Active</Label>
                    </div>
                  </div>

                  <div className='flex justify-end space-x-2'>
                    <Button type='button' variant='outline' onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type='submit'>
                      {editingEvent ? 'Update' : 'Create'} Event
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className='px-4 py-8 sm:px-6 lg:px-8'>
          {loading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
              <p className='mt-2 text-gray-600'>Loading events...</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {events.map((event) => (
                <Card key={event._id} className='hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <CardTitle className='text-lg line-clamp-2'>{event.title}</CardTitle>
                        <CardDescription className='mt-2'>
                          <div className='flex items-center space-x-2 text-sm'>
                            <Calendar className='h-4 w-4' />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          {event.time && (
                            <div className='flex items-center space-x-2 text-sm mt-1'>
                              <Clock className='h-4 w-4' />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className='flex items-center space-x-2 text-sm mt-1'>
                              <MapPin className='h-4 w-4' />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.category && (
                            <div className='flex items-center space-x-2 text-sm mt-1'>
                              <span className='text-xs bg-gray-100 px-2 py-1 rounded'>
                                {event.category}
                              </span>
                            </div>
                          )}
                        </CardDescription>
                      </div>
                      <div className='flex flex-col space-y-1'>
                        {event.featured && <Badge variant='default'>Featured</Badge>}
                        {!event.isActive && <Badge variant='secondary'>Inactive</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {event.description && (
                      <p className='text-sm text-gray-600 mb-4 line-clamp-2'>
                        {event.description}
                      </p>
                    )}

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2 text-sm text-gray-500'>
                        {event.attendees && (
                          <div className='flex items-center space-x-1'>
                            <Users className='h-4 w-4' />
                            <span>{event.attendees}</span>
                            {event.maxAttendees && (
                              <span>/ {event.maxAttendees}</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className='flex space-x-2'>
                        <Button size='sm' variant='outline' onClick={() => handleEdit(event)}>
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button size='sm' variant='outline' onClick={() => handleDelete(event._id)}>
                          <Trash2 className='h-4 w-4' />
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
