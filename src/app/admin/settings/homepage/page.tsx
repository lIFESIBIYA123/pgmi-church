'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar';
import { useSession } from 'next-auth/react';
import { Save, Layout, HandHelping, AlertCircle, CheckCircle } from "lucide-react";

interface HomepageSettings {
  welcome: {
    title: string;
    content: string;
  };
  callToAction: {
    title: string;
    content: string;
    button1: { text: string; link: string; };
    button2: { text: string; link: string; };
  };
}

export default function HomepageSettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState<HomepageSettings>({
    welcome: { title: '', content: '' },
    callToAction: {
      title: '',
      content: '',
      button1: { text: '', link: '' },
      button2: { text: '', link: '' },
    },
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, 5000);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/homepage');
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        showNotification('error', 'Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/settings/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save settings');
      showNotification('success', 'Homepage settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('error', 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section: 'welcome' | 'callToAction', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleButtonChange = (button: 'button1' | 'button2', field: 'text' | 'link', value: string) => {
    setFormData(prev => ({
      ...prev,
      callToAction: {
        ...prev.callToAction,
        [button]: {
          ...prev.callToAction[button],
          [field]: value,
        },
      },
    }));
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Homepage Settings</h1>
              <p className="text-sm text-gray-600">Manage the content of the homepage sections</p>
            </div>
          </div>
        </header>

        {notification.type && (
          <div className={`mx-4 mt-4 p-4 rounded-lg flex items-center space-x-2 ${
            notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span>{notification.message}</span>
          </div>
        )}

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <p>Loading settings...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layout className="h-5 w-5" />
                    <span>Welcome Section</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="welcomeTitle">Title</Label>
                    <Input id="welcomeTitle" value={formData.welcome.title} onChange={(e) => handleInputChange('welcome', 'title', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="welcomeContent">Content</Label>
                    <Textarea id="welcomeContent" value={formData.welcome.content} onChange={(e) => handleInputChange('welcome', 'content', e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HandHelping className="h-5 w-5" />
                    <span>Call to Action Section</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ctaTitle">Title</Label>
                    <Input id="ctaTitle" value={formData.callToAction.title} onChange={(e) => handleInputChange('callToAction', 'title', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="ctaContent">Content</Label>
                    <Textarea id="ctaContent" value={formData.callToAction.content} onChange={(e) => handleInputChange('callToAction', 'content', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ctaButton1Text">Button 1 Text</Label>
                      <Input id="ctaButton1Text" value={formData.callToAction.button1.text} onChange={(e) => handleButtonChange('button1', 'text', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="ctaButton1Link">Button 1 Link</Label>
                      <Input id="ctaButton1Link" value={formData.callToAction.button1.link} onChange={(e) => handleButtonChange('button1', 'link', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ctaButton2Text">Button 2 Text</Label>
                      <Input id="ctaButton2Text" value={formData.callToAction.button2.text} onChange={(e) => handleButtonChange('button2', 'text', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="ctaButton2Link">Button 2 Link</Label>
                      <Input id="ctaButton2Link" value={formData.callToAction.button2.link} onChange={(e) => handleButtonChange('button2', 'link', e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
