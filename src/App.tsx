import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { BrandingProvider } from "@/contexts/BrandingContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SEOHead } from "@/components/SEOHead";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import GamesPage from "./pages/GamesPage";
import TeamPage from "./pages/TeamPage";
import GalleryPage from "./pages/GalleryPage";
import ArticlesPage from "./pages/ArticlesPage";
import ContactsPage from "./pages/ContactsPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArticlesList from "./pages/admin/ArticlesList";
import ArticleEditor from "./pages/admin/ArticleEditor";
import RoleManager from "./pages/admin/RoleManager";
import BrandingManager from "./pages/admin/BrandingManager";
import TranslationsManager from "./pages/admin/TranslationsManager";
import AuthPage from "./pages/AuthPage";
import DebugAuthPage from "./pages/DebugAuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandingProvider>
        <AuthProvider>
          <I18nProvider>
            <LanguageProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <SEOHead />
                <Routes>
                  <Route
                    path="/*"
                    element={
                      <Layout>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/games" element={<GamesPage />} />
                          <Route path="/team" element={<TeamPage />} />
                          <Route path="/gallery" element={<GalleryPage />} />
                          <Route path="/articles" element={<ArticlesPage />} />
                          <Route path="/contacts" element={<ContactsPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route 
                            path="/profile" 
                            element={
                              <ProtectedRoute>
                                <ProfilePage />
                              </ProtectedRoute>
                            } 
                          />
                          <Route path="/login" element={<AuthPage />} />
                          <Route path="/auth" element={<AuthPage />} />
                          <Route path="/debug/auth" element={<DebugAuthPage />} />
                          
                          {/* Admin Routes */}
                          <Route 
                            path="/admin" 
                            element={
                              <ProtectedRoute allowedRoles={['admin', 'editor']}>
                                <AdminLayout />
                              </ProtectedRoute>
                            }
                          >
                            <Route index element={<AdminDashboard />} />
                            <Route path="articles" element={<ArticlesList />} />
                            <Route path="articles/new" element={<ArticleEditor />} />
                            <Route path="articles/edit/:id" element={<ArticleEditor />} />
                            <Route path="roles" element={<RoleManager />} />
                            <Route path="branding" element={<BrandingManager />} />
                            <Route path="translations" element={<TranslationsManager />} />
                          </Route>
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Layout>
                    }
                  />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
            </LanguageProvider>
        </I18nProvider>
      </AuthProvider>
    </BrandingProvider>
  </QueryClientProvider>
);

export default App;
