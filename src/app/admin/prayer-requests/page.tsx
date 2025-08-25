'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar';
import { useSession } from 'next-auth/react';
import {
  Heart,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      // Add other custom properties
    } & DefaultSession["user"]
  }
}
interface PrayerRequest {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  title: string;
  description: string;
  urgency: 'low' | 'normal' | 'high' | 'critical';
  isAnonymous: boolean;
  allowSharing: boolean;
  status: 'pending' | 'praying' | 'answered' | 'closed';
  createdAt: string;
}

export default function PrayerRequestsPage() {
  const { data: session } = useSession();
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  const fetchPrayerRequests = async () => {
    try {
      const response = await fetch('/api/prayer-requests');
      if (response.ok) {
        const data = await response.json();
        setPrayerRequests(data);
      } else {
        console.error('Access denied to prayer requests');
      }
    } catch (error) {
      console.error('Error fetching prayer requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/prayer-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchPrayerRequests();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'normal': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'default';
      case 'praying': return 'secondary';
      case 'closed': return 'outline';
      case 'pending': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered': return <CheckCircle className="h-4 w-4" />;
      case 'praying': return <Heart className="h-4 w-4" />;
      case 'closed': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!session) return <div>Loading...</div>;

  // Check if user has pastor role
  const userRole = session.user?.role;
  if (userRole !== 'pastor') {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600">Only pastors can view prayer requests.</p>
            </div>
          </div>
        </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Prayer Requests</h1>
              <p className="text-sm text-gray-600">View and manage prayer requests from congregation</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{prayerRequests.length} requests</Badge>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading prayer requests...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prayerRequests.map((request) => (
                <Card key={request._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {request.isAnonymous ? 'Anonymous Request' : request.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                          {!request.isAnonymous && (
                            <div className="flex items-center space-x-2 text-sm mt-1">
                              <Mail className="h-4 w-4" />
                              <span>{request.email}</span>
                            </div>
                          )}
                          {request.phone && (
                            <div className="flex items-center space-x-2 text-sm mt-1">
                              <Phone className="h-4 w-4" />
                              <span>{request.phone}</span>
                            </div>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Badge variant={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                        <Badge variant={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">{request.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {request.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {request.allowSharing && (
                          <Badge variant="outline" className="text-xs">Shareable</Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest(request);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <select
                          className="text-xs border rounded px-2 py-1"
                          value={request.status}
                          onChange={(e) => handleStatusUpdate(request._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="praying">Praying</option>
                          <option value="answered">Answered</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prayer Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedRequest.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedRequest.isAnonymous ? 'Anonymous Request' : `by ${selectedRequest.name}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Email:</span>
                  <p>{selectedRequest.email}</p>
                </div>
                {selectedRequest.phone && (
                  <div>
                    <span className="font-medium">Phone:</span>
                    <p>{selectedRequest.phone}</p>
                  </div>
                )}
                <div>
                  <span className="font-medium">Urgency:</span>
                  <Badge variant={getUrgencyColor(selectedRequest.urgency)} className="ml-2">
                    {selectedRequest.urgency}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge variant={getStatusColor(selectedRequest.status)} className="ml-2">
                    {selectedRequest.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p>{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium">Options:</span>
                  <div className="mt-1">
                    {selectedRequest.isAnonymous && <Badge variant="outline" className="mr-1">Anonymous</Badge>}
                    {selectedRequest.allowSharing && <Badge variant="outline">Shareable</Badge>}
                  </div>
                </div>
              </div>

              <div>
                <span className="font-medium">Description:</span>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                  {selectedRequest.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
