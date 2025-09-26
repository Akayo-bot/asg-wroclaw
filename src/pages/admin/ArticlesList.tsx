import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
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
  const t = useTranslation();
  const { currentLanguage } = useLanguage();
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
        title: t.common.error,
        description: t.admin.errorFetchingArticles,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm(t.admin.confirmDeleteArticle)) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setArticles(articles.filter(article => article.id !== id));
      toast({
        title: t.common.success,
        description: t.admin.articleDeleted,
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: t.common.error,
        description: t.admin.errorDeletingArticle,
        variant: 'destructive',
      });
    }
  };

  const getTitle = (article: Article) => {
    return currentLanguage === 'uk' ? article.title_uk :
           currentLanguage === 'ru' ? article.title_ru : 
           article.title_pl;
  };

  const getPreview = (article: Article) => {
    return currentLanguage === 'uk' ? article.preview_uk :
           currentLanguage === 'ru' ? article.preview_ru : 
           article.preview_pl;
  };

  const categories = [
    { value: 'all', label: t.admin.allCategories },
    { value: 'tactics', label: t.categories.tactics },
    { value: 'equipment', label: t.categories.equipment },
    { value: 'news', label: t.categories.news },
    { value: 'game_reports', label: t.categories.gameReports },
    { value: 'rules', label: t.categories.rules },
  ];

  if (loading) {
    return <div className="text-center py-8">{t.common.loading}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t.admin.articles}</h1>
          <p className="text-muted-foreground">{t.admin.manageArticles}</p>
        </div>
        <Link to="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t.admin.createArticle}
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.admin.allStatuses}</SelectItem>
            <SelectItem value="published">{t.admin.published}</SelectItem>
            <SelectItem value="draft">{t.admin.drafts}</SelectItem>
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
                      {article.status === 'published' ? t.admin.published : t.admin.drafts}
                    </Badge>
                    <Badge variant="outline">
                      {t.categories[article.category as keyof typeof t.categories]}
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
              <p className="text-muted-foreground">{t.admin.noArticlesFound}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;