'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar';
import { useSession } from 'next-auth/react';
import {
  Save,
  FileImage,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';

interface FooterData {
  churchName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  quickLinks: {
    label: string;
    href: string;
  }[];
  copyright: string;
}

export default function FooterPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [footerData, setFooterData] = useState<FooterData>({
    churchName: 'PGMI Church',
    tagline: 'Perfecting Grace Ministries International',
    description: 'A place where faith comes alive, community thrives, and God\'s love transforms lives.',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    contact: {
      phone: '',
      email: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      youtube: '',
      twitter: ''
    },
    quickLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Ministries', href: '/ministries' },
      { label: 'Sermons', href: '/sermons' },
      { label: 'Events', href: '/events' },
      { label: 'Contact', href: '/contact' },
      { label: 'Prayer Requests', href: '/prayer' }
    ],
    copyright: '© 2024 PGMI Church. All rights reserved.'
  });

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const response = await fetch('/api/footer');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFooterData({
            churchName: data.churchName || 'PGMI Church',
            tagline: data.tagline || 'Perfecting Grace Ministries International',
            description: data.description || 'A place where faith comes alive, community thrives, and God\'s love transforms lives.',
            address: {
              street: data.address?.street || '',
              city: data.address?.city || '',
              state: data.address?.state || '',
              zipCode: data.address?.zipCode || '',
              country: data.address?.country || ''
            },
            contact: {
              phone: data.contact?.phone || '',
              email: data.contact?.email || ''
            },
            socialMedia: {
              facebook: data.socialMedia?.facebook || '',
              instagram: data.socialMedia?.instagram || '',
              youtube: data.socialMedia?.youtube || '',
              twitter: data.socialMedia?.twitter || ''
            },
            quickLinks: data.quickLinks || [
              { label: 'About Us', href: '/about' },
              { label: 'Ministries', href: '/ministries' },
              { label: 'Sermons', href: '/sermons' },
              { label: 'Events', href: '/events' },
              { label: 'Contact', href: '/contact' },
              { label: 'Prayer Requests', href: '/prayer' }
            ],
            copyright: data.copyright || '© 2024 PGMI Church. All rights reserved.'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching footer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footerData)
      });

      if (response.ok) {
        alert('Footer updated successfully!');
      } else {
        alert('Error updating footer');
      }
    } catch (error) {
      console.error('Error saving footer:', error);
      alert('Error saving footer');
    } finally {
      setSaving(false);
    }
  };

  const updateQuickLink = (index: number, field: 'label' | 'href', value: string) => {
    const newQuickLinks = [...footerData.quickLinks];
    newQuickLinks[index] = { ...newQuickLinks[index], [field]: value };
    setFooterData({ ...footerData, quickLinks: newQuickLinks });
  };

  const addQuickLink = () => {
    setFooterData({
      ...footerData,
      quickLinks: [...footerData.quickLinks, { label: '', href: '' }]
    });
  };

  const removeQuickLink = (index: number) => {
    const newQuickLinks = footerData.quickLinks.filter((_, i) => i !== index);
    setFooterData({ ...footerData, quickLinks: newQuickLinks });
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className='min-h-screen bg-gray-50'>
      <DashboardSidebar />

      <div className='lg:pl-64'>
        <header className='bg-white shadow'>
          <div className='flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Footer Management</h1>
              <p className='text-sm text-gray-600'>Manage website footer content and links</p>
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
              <p className='mt-2 text-gray-600'>Loading footer...</p>
            </div>
          ) : (
            <div className='space-y-6'>
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <FileImage className='h-5 w-5' />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <Label htmlFor='churchName'>Church Name</Label>
                    <Input
                      id='churchName'
                      value={footerData.churchName}
                      onChange={(e) => setFooterData({ ...footerData, churchName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor='tagline'>Tagline</Label>
                    <Input
                      id='tagline'
                      value={footerData.tagline}
                      onChange={(e) => setFooterData({ ...footerData, tagline: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                      id='description'
                      rows={3}
                      value={footerData.description}
                      onChange={(e) => setFooterData({ ...footerData, description: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <MapPin className='h-5 w-5' />
                    <span>Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <Label htmlFor='street'>Street Address</Label>
                    <Input
                      id='street'
                      value={footerData.address.street}
                      onChange={(e) => setFooterData({
                        ...footerData,
                        address: { ...footerData.address, street: e.target.value }
                      })}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='city'>City</Label>
                      <Input
                        id='city'
                        value={footerData.address.city}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          address: { ...footerData.address, city: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor='state'>State</Label>
                      <Input
                        id='state'
                        value={footerData.address.state}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          address: { ...footerData.address, state: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='zipCode'>ZIP Code</Label>
                      <Input
                        id='zipCode'
                        value={footerData.address.zipCode}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          address: { ...footerData.address, zipCode: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor='country'>Country</Label>
                      <Input
                        id='country'
                        value={footerData.address.country}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          address: { ...footerData.address, country: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Phone className='h-5 w-5' />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='phone'>Phone</Label>
                      <Input
                        id='phone'
                        value={footerData.contact.phone}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          contact: { ...footerData.contact, phone: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={footerData.contact.email}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          contact: { ...footerData.contact, email: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Globe className='h-5 w-5' />
                    <span>Social Media</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='facebook'>Facebook</Label>
                      <Input
                        id='facebook'
                        placeholder='https://facebook.com/...'
                        value={footerData.socialMedia.facebook}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          socialMedia: { ...footerData.socialMedia, facebook: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor='instagram'>Instagram</Label>
                      <Input
                        id='instagram'
                        placeholder='https://instagram.com/...'
                        value={footerData.socialMedia.instagram}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          socialMedia: { ...footerData.socialMedia, instagram: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='youtube'>YouTube</Label>
                      <Input
                        id='youtube'
                        placeholder='https://youtube.com/...'
                        value={footerData.socialMedia.youtube}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          socialMedia: { ...footerData.socialMedia, youtube: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor='twitter'>Twitter</Label>
                      <Input
                        id='twitter'
                        placeholder='https://twitter.com/...'
                        value={footerData.socialMedia.twitter}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          socialMedia: { ...footerData.socialMedia, twitter: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                  <CardDescription>Manage footer navigation links</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {footerData.quickLinks.map((link, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <div className='flex-1 grid grid-cols-2 gap-2'>
                        <Input
                          placeholder='Link Label'
                          value={link.label}
                          onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                        />
                        <Input
                          placeholder='URL (e.g., /about)'
                          value={link.href}
                          onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                        />
                      </div>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => removeQuickLink(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addQuickLink} variant='outline'>
                    Add Quick Link
                  </Button>
                </CardContent>
              </Card>

              {/* Copyright */}
              <Card>
                <CardHeader>
                  <CardTitle>Copyright</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={footerData.copyright}
                    onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
