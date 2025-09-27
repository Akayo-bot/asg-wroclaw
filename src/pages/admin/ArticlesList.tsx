import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Article = Tables<'articles'>;

const ArticlesList = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchArticles();
  }, [statusFilter, categoryFilter]);

  const fetchArticles = async () => {
    try {
      let query = supabase.from('articles').select('*');

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter as 'tactics' | 'equipment' | 'news' | 'game_reports' | 'rules');
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: t('common.error', 'Error'),
        description: t('admin.errorFetchingArticles', 'Failed to fetch articles'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm(t('admin.confirmDeleteArticle', 'Are you sure you want to delete this article?'))) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setArticles(articles.filter(article => article.id !== id));
      toast({
        title: t('common.success', 'Success'),
        description: t('admin.articleDeleted', 'Article deleted successfully'),
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: t('common.error', 'Error'),
        description: t('admin.errorDeletingArticle', 'Failed to delete article'),
        variant: 'destructive',
      });
    }
  };

  const getTitle = (article: Article) => {
    return language === 'uk' ? article.title_uk :
           language === 'ru' ? article.title_ru : 
           article.title_pl;
  };

  const getPreview = (article: Article) => {
    return language === 'uk' ? article.preview_uk :
           language === 'ru' ? article.preview_ru : 
           article.preview_pl;
  };

  const categories = [
    { value: 'all', label: t('admin.allCategories', 'All Categories') },
    { value: 'tactics', label: t('categories.tactics', 'Tactics') },
    { value: 'equipment', label: t('categories.equipment', 'Equipment') },
    { value: 'news', label: t('categories.news', 'News') },
    { value: 'game_reports', label: t('categories.gameReports', 'Game Reports') },
    { value: 'rules', label: t('categories.rules', 'Rules') },
  ];

  if (loading) {
    return <div className="text-center py-8">{t('common.loading', 'Loading...')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t('admin.articles', 'Articles')}</h1>
          <p className="text-muted-foreground">{t('admin.manageArticles', 'Manage your articles')}</p>
        </div>
        <Link to="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('admin.createArticle', 'Create Article')}
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('admin.allStatuses', 'All Statuses')}</SelectItem>
            <SelectItem value="published">{t('admin.published', 'Published')}</SelectItem>
            <SelectItem value="draft">{t('admin.drafts', 'Drafts')}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{getTitle(article)}</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {getPreview(article)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status === 'published' ? t('admin.published', 'Published') : t('admin.drafts', 'Drafts')}
                    </Badge>
                    <Badge variant="outline">
                      {t(`categories.${article.category}`, article.category)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      <Eye className="h-3 w-3 inline mr-1" />
                      {article.views_count}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/admin/articles/edit/${article.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteArticle(article.id)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {articles.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">{t('admin.noArticlesFound', 'No articles found')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;