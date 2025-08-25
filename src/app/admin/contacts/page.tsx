'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar';
import { useSession } from 'next-auth/react';
import {
  Mail,
  Phone,
  Calendar,
  Eye,
  Trash2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export default function ContactsPage() {
  const { data: session } = useSession();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className='min-h-screen bg-gray-50'>
      <DashboardSidebar />

      <div className='lg:pl-64'>
        <header className='bg-white shadow'>
          <div className='flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Contact Messages</h1>
              <p className='text-sm text-gray-600'>View messages from the contact form</p>
            </div>
            <div className='flex items-center space-x-2'>
              <Badge variant='outline'>{contacts.length} messages</Badge>
            </div>
          </div>
        </header>

        <main className='px-4 py-8 sm:px-6 lg:px-8'>
          {loading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
              <p className='mt-2 text-gray-600'>Loading messages...</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {contacts.map((contact) => (
                <Card key={contact._id} className='hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <CardTitle className='text-lg'>{contact.name}</CardTitle>
                        <CardDescription className='mt-2'>
                          <div className='flex items-center space-x-2 text-sm'>
                            <Mail className='h-4 w-4' />
                            <span>{contact.email}</span>
                          </div>
                          {contact.phone && (
                            <div className='flex items-center space-x-2 text-sm mt-1'>
                              <Phone className='h-4 w-4' />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                          <div className='flex items-center space-x-2 text-sm mt-1'>
                            <Calendar className='h-4 w-4' />
                            <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='mb-4'>
                      <p className='text-sm text-gray-600 line-clamp-3'>
                        {contact.message}
                      </p>
                    </div>

                    <div className='flex items-center justify-end space-x-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => {
                          setSelectedContact(contact);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleDelete(contact._id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className='space-y-4'>
              <div>
                <h3 className='font-semibold text-lg'>{selectedContact.name}</h3>
                <p className='text-sm text-gray-600 mt-1'>{selectedContact.email}</p>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='font-medium'>Email:</span>
                  <p>{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <span className='font-medium'>Phone:</span>
                    <p>{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <span className='font-medium'>Date:</span>
                  <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <span className='font-medium'>Message:</span>
                <p className='text-sm text-gray-600 mt-1 whitespace-pre-wrap'>
                  {selectedContact.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
