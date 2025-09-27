import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/contexts/I18nContext';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, formatPlayerLimits, formatDateTime } from '@/lib/formatters';

const DataSources = () => {
  const { t, language } = useI18n();
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchDebugData();
  }, []);

  const fetchDebugData = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .gte('start_datetime', new Date().toISOString())
        .order('start_datetime', { ascending: true })
        .limit(3);

      if (!error) {
        setUpcomingGames(data || []);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Debug fetch error:', error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Debug: Data Sources</h1>
        <p className="text-muted-foreground">Current data sources and cache status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Games Query</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Query:</strong>
              <code className="block bg-muted p-2 rounded mt-2">
                SELECT * FROM events WHERE status = 'upcoming' AND start_datetime &gt;= NOW() ORDER BY start_datetime ASC LIMIT 3
              </code>
            </div>
            <div>
              <strong>Last Update:</strong> {lastUpdate.toLocaleString()}
            </div>
            <div>
              <strong>Results Count:</strong> {upcomingGames.length}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingGames.map((event: any) => (
              <div key={event.id} className="border rounded p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>ID:</strong> {event.id}</div>
                  <div><strong>Status:</strong> <Badge>{event.status}</Badge></div>
                  <div><strong>Registration:</strong> <Badge>{event.status_registration}</Badge></div>
                  <div><strong>Limit Mode:</strong> {event.limit_mode}</div>
                  <div><strong>Price:</strong> {formatCurrency(event.price_amount, event.price_currency, language)}</div>
                  <div><strong>Start:</strong> {event.start_datetime ? formatDateTime(event.start_datetime, language) : 'Not set'}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSources;