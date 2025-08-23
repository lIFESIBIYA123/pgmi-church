 'use client '

import { useState, useEffect } from  'react ';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  @/components/ui/card ;
import { Button } from  @/components/ui/button ;
import { Input } from  @/components/ui/input ;
import { Label } from  @/components/ui/label ;
import { Textarea } from  @/components/ui/textarea ;
import { Badge } from  @/components/ui/badge ;
import { DashboardSidebar } from  '@/components/admin/dashboard-sidebar ';
import { useSession } from  'next-auth/react ';
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Calendar,
  ExternalLink,
  Lock
} from  lucide-react ;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from  @/components/ui/dialog ;

interface Page {
  _id: string;
  slug: string;
  title: string;
  content: string;
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PagesPage() {
  const { data: session } = useSession();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    slug:  ' ',
    title:  ' ',
    content:  ' '
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch( '/api/pages ');
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error( 'Error fetching pages: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPage ? `/api/pages` :  '/api/pages ';
      const method = editingPage ?  'PUT ' :  'POST ';
      const body = editingPage ? { ...formData, _id: editingPage._id } : formData;

      const response = await fetch(url, {
        method,
        headers: {  'Content-Type ':  'application/json ' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setEditingPage(null);
        resetForm();
        fetchPages();
      } else {
        const error = await response.json();
        alert(error.error ||  'Error saving page ');
      }
    } catch (error) {
      console.error( 'Error saving page: ', error);
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      slug: page.slug,
      title: page.title,
      content: page.content
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm( 'Are you sure you want to delete this page? ')) return;

    try {
      const response = await fetch(`/api/pages?id=${id}`, { method:  'DELETE ' });
      if (response.ok) {
        fetchPages();
      } else {
        const error = await response.json();
        alert(error.error ||  'Error deleting page ');
      }
    } catch (error) {
      console.error( 'Error deleting page: ', error);
    }
  };

  const resetForm = () => {
    setFormData({
      slug:  ' ',
      title:  ' ',
      content:  ' '
    });
  };

  const handleNewPage = () => {
    setEditingPage(null);
    resetForm();
    setIsDialogOpen(true);
  };

  if (!session) return <div>Loading...</div>;

  const isMainAdmin = (session.user as any)?.isMainAdmin;

  return (
    <div className= min-h-screen bg-gray-50 >
      <DashboardSidebar />

      <div className= lg:pl-64 >
        <header className= bg-white shadow >
          <div className= flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8 >
            <div>
              <h1 className= text-2xl font-bold text-gray-900 >Pages</h1>
              <p className= text-sm text-gray-600 >Manage website pages and content</p>
            </div>
            {isMainAdmin ? (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleNewPage}>
                    <Plus className= h-4 w-4 mr-2  />
                    Add Page
                  </Button>
                </DialogTrigger>
                <DialogContent className= max-w-4xl >
                  <DialogHeader>
                    <DialogTitle>
                      {editingPage ?  'Edit Page ' :  'Add New Page '}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className= space-y-4 >
                    <div className= grid grid-cols-2 gap-4 >
                      <div>
                        <Label htmlFor= slug >URL Slug *</Label>
                        <Input
                          id= slug
                          placeholder= e.g., about-us
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor= title >Page Title *</Label>
                        <Input
                          id= title
                          placeholder= Page title
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor= content >Content *</Label>
                      <Textarea
                        id= content
                        rows={15}
                        placeholder= Enter page content (HTML supported)
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                      />
                    </div>

                    <div className= flex justify-end space-x-2 >
                      <Button type= button  variant= outline  onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type= submit >
                        {editingPage ?  'Update ' :  'Create '} Page
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <div className= flex items-center space-x-2 text-sm text-gray-500 >
                <Lock className= h-4 w-4  />
                <span>Only main admin can add/delete pages</span>
              </div>
            )}
          </div>
        </header>

        <main className= px-4 py-8 sm:px-6 lg:px-8 >
          {loading ? (
            <div className= text-center py-12 >
              <div className= animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto ></div>
              <p className= mt-2 text-gray-600 >Loading pages...</p>
            </div>
          ) : (
            <div className= grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 >
              {pages.map((page) => (
                <Card key={page._id} className= hover:shadow-lg transition-shadow >
                  <CardHeader>
                    <div className= flex items-start justify-between >
                      <div className= flex-1 >
                        <CardTitle className= text-lg line-clamp-2 >{page.title}</CardTitle>
                        <CardDescription className= mt-2 >
                          <div className= flex items-center space-x-2 text-sm >
                            <FileText className= h-4 w-4  />
                            <span>/p/{page.slug}</span>
                          </div>
                          <div className= flex items-center space-x-2 text-sm mt-1 >
                            <Calendar className= h-4 w-4  />
                            <span>Updated {new Date(page.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className= flex flex-col space-y-1 >
                        {page.isSystem && <Badge variant= secondary >System</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className= mb-4 >
                      <p className= text-sm text-gray-600 line-clamp-3 >
                        {page.content.replace(/<[^>]*>/g,  ' ').substring(0, 150)}...
                      </p>
                    </div>

                    <div className= flex items-center justify-between >
                      <div className= flex items-center space-x-2 >
                        <Button size= sm  variant= outline  asChild>
                          <a href={`/p/${page.slug}`} target= _blank  rel= noopener noreferrer >
                            <ExternalLink className= h-4 w-4  />
                          </a>
                        </Button>
                      </div>

                      <div className= flex space-x-2 >
                        <Button size= sm  variant= outline  onClick={() => handleEdit(page)}>
                          <Edit className= h-4 w-4  />
                        </Button>
                        {isMainAdmin && !page.isSystem && (
                          <Button size= sm  variant= outline  onClick={() => handleDelete(page._id)}>
                            <Trash2 className= h-4 w-4  />
                          </Button>
                        )}
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
