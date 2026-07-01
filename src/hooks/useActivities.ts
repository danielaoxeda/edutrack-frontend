import { useState, useEffect, useCallback } from 'react';
import { activityService } from '../services/activityService';
import type { Activity, ActivityFilters } from '../types/activity';

export const useActivities = (filters?: ActivityFilters) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchActivities = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await activityService.getActivities(filters);
            setActivities(data);
        } catch (err) {
            setError('Error al cargar las actividades. Intenta de nuevo.');
            console.error('Error fetching activities:', err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    return { activities, loading, error, refetch: fetchActivities };
};