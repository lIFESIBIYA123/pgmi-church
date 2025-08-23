'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar';
import { useSession } from 'next-auth/react';
import {
  Save,
  Plus,
  Trash2,
  Navigation
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export default function NavbarPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [newItem, setNewItem] = useState({ label: '', href: '' });

  useEffect(() => {
    fetchNavbar();
  }, []);

  const fetchNavbar = async () => {
    try {
      const response = await fetch('/api/navbar');
      if (response.ok) {
        const data = await response.json();
        setNavItems(data.items || []);
      } else {
        // Set default navbar items if none exist
        setNavItems([
          { id: '1', label: 'Home', href: '/', order: 1 },
          { id: '2', label: 'About', href: '/about', order: 2 },
          { id: '3', label: 'Ministries', href: '/ministries', order: 3 },
          { id: '4', label: 'Sermons', href: '/sermons', order: 4 },
          { id: '5', label: 'Events', href: '/events', order: 5 },
          { id: '6', label: 'Contact', href: '/contact', order: 6 },
        ]);
      }
    } catch (error) {
      console.error('Error fetching navbar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/navbar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: navItems })
      });

      if (response.ok) {
        alert('Navbar updated successfully!');
      } else {
        alert('Error updating navbar');
      }
    } catch (error) {
      console.error('Error saving navbar:', error);
      alert('Error saving navbar');
    } finally {
      setSaving(false);
    }
  };

  const addItem = () => {
    if (!newItem.label || !newItem.href) return;

    const newNavItem: NavItem = {
      id: Date.now().toString(),
      label: newItem.label,
      href: newItem.href,
      order: navItems.length + 1
    };

    setNavItems([...navItems, newNavItem]);
    setNewItem({ label: '', href: '' });
  };

  const removeItem = (id: string) => {
    setNavItems(navItems.filter(item => item.id !== id));
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const index = navItems.findIndex(item => item.id === id);
    if (index === -1) return;

    const newItems = [...navItems];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }

    // Update order numbers
    newItems.forEach((item, idx) => {
      item.order = idx + 1;
    });

    setNavItems(newItems);
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className='min-h-screen bg-gray-50'>
      <DashboardSidebar />

      <div className='lg:pl-64'>
        <header className='bg-white shadow'>
          <div className='flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Navigation Management</h1>
              <p className='text-sm text-gray-600'>Manage website navigation menu items</p>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className='h-4 w-4 mr-2' />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </header>

        <main className='px-4 py-8 sm:px-6 lg:px-8'>
          {loading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
              <p className='mt-2 text-gray-600'>Loading navigation...</p>
            </div>
          ) : (
            <div className='space-y-6'>
              {/* Add New Item */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Plus className='h-5 w-5' />
                    <span>Add Navigation Item</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='label'>Label</Label>
                      <Input
                        id='label'
                        placeholder='e.g., About Us'
                        value={newItem.label}
                        onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor='href'>URL</Label>
                      <Input
                        id='href'
                        placeholder='e.g., /about'
                        value={newItem.href}
                        onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={addItem} className='mt-4' disabled={!newItem.label || !newItem.href}>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Navigation Items */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Navigation className='h-5 w-5' />
                    <span>Navigation Items</span>
                  </CardTitle>
                  <CardDescription>Drag and drop or use buttons to reorder items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {navItems.map((item, index) => (
                      <div key={item.id} className='flex items-center space-x-2 p-3 border rounded-lg'>
                        <div className='flex-1'>
                          <div className='font-medium'>{item.label}</div>
                          <div className='text-sm text-gray-500'>{item.href}</div>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => moveItem(item.id, 'up')}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => moveItem(item.id, 'down')}
                            disabled={index === navItems.length - 1}
                          >
                            ↓
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {navItems.length === 0 && (
                    <p className='text-center text-gray-500 py-8'>No navigation items yet. Add some above!</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
