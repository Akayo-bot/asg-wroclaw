import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, FileCheck, ArrowLeft } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Article = Tables<'articles'>;

interface ArticleForm {
  title_uk: string;
  title_ru: string;
  title_pl: string;
  preview_uk: string;
  preview_ru: string;
  preview_pl: string;
  content_uk: string;
  content_ru: string;
  content_pl: string;
  category: string;
  main_image_url: string;
}

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [article, setArticle] = useState<ArticleForm>({
    title_uk: '',
    title_ru: '',
    title_pl: '',
    preview_uk: '',
    preview_ru: '',
    preview_pl: '',
    content_uk: '',
    content_ru: '',
    content_pl: '',
    category: 'news',
    main_image_url: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(!!id);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setArticle({
          title_uk: data.title_uk,
          title_ru: data.title_ru,
          title_pl: data.title_pl,
          preview_uk: data.preview_uk,
          preview_ru: data.preview_ru,
          preview_pl: data.preview_pl,
          content_uk: data.content_uk,
          content_ru: data.content_ru,
          content_pl: data.content_pl,
          category: data.category,
          main_image_url: data.main_image_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      toast({
        title: t.common.error,
        description: t.admin.errorFetchingArticle,
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!user) return;

    setLoading(true);
    try {
      const articleData = {
        ...article,
        status,
        author_id: user.id,
        category: article.category as 'tactics' | 'equipment' | 'news' | 'game_reports' | 'rules',
      };

      if (isEdit) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert(articleData);

        if (error) throw error;
      }

      toast({
        title: t.common.success,
        description: isEdit ? t.admin.articleUpdated : t.admin.articleCreated,
      });

      navigate('/admin/articles');
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: t.common.error,
        description: t.admin.errorSavingArticle,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'tactics', label: t.categories.tactics },
    { value: 'equipment', label: t.categories.equipment },
    { value: 'news', label: t.categories.news },
    { value: 'game_reports', label: t.categories.gameReports },
    { value: 'rules', label: t.categories.rules },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/articles')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.admin.backToArticles}
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEdit ? t.admin.editArticle : t.admin.createArticle}
            </h1>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit('draft')}
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            {t.admin.saveDraft}
          </Button>
          <Button
            onClick={() => handleSubmit('published')}
            disabled={loading}
          >
            <FileCheck className="h-4 w-4 mr-2" />
            {t.admin.publish}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.admin.articleSettings}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">{t.admin.category}</Label>
              <Select value={article.category} onValueChange={(value) => setArticle({ ...article, category: value })}>
                <SelectTrigger>
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

            <div>
              <Label htmlFor="main_image_url">{t.admin.mainImageUrl}</Label>
              <Input
                id="main_image_url"
                value={article.main_image_url}
                onChange={(e) => setArticle({ ...article, main_image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="uk" className="space-y-4">
        <TabsList>
          <TabsTrigger value="uk">🇺🇦 Українська</TabsTrigger>
          <TabsTrigger value="ru">🇷🇺 Русский</TabsTrigger>
          <TabsTrigger value="pl">🇵🇱 Polski</TabsTrigger>
        </TabsList>

        {['uk', 'ru', 'pl'].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label htmlFor={`title_${lang}`}>{t.admin.articleTitle}</Label>
                  <Input
                    id={`title_${lang}`}
                    value={article[`title_${lang}` as keyof ArticleForm]}
                    onChange={(e) => setArticle({ 
                      ...article, 
                      [`title_${lang}`]: e.target.value 
                    })}
                    placeholder={t.admin.articleTitlePlaceholder}
                  />
                </div>

                <div>
                  <Label htmlFor={`preview_${lang}`}>{t.admin.preview}</Label>
                  <Textarea
                    id={`preview_${lang}`}
                    value={article[`preview_${lang}` as keyof ArticleForm]}
                    onChange={(e) => setArticle({ 
                      ...article, 
                      [`preview_${lang}`]: e.target.value 
                    })}
                    placeholder={t.admin.articlePreviewPlaceholder}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor={`content_${lang}`}>{t.admin.content}</Label>
                  <RichTextEditor
                    content={article[`content_${lang}` as keyof ArticleForm]}
                    onChange={(content) => setArticle({ 
                      ...article, 
                      [`content_${lang}`]: content 
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ArticleEditor;