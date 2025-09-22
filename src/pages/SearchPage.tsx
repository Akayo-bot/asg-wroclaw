import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useTranslation } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const t = useTranslation();
  const [query, setQuery] = useState('');

  return (
    <Layout showBreadcrumbs>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-rajdhani text-4xl md:text-5xl font-bold mb-4">
              {t.pages.search.title}
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                placeholder={t.pages.search.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="cursor-tactical"
              />
              <Button className="cursor-tactical">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {query && (
            <div className="text-center text-muted-foreground">
              {t.pages.search.noResults}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;