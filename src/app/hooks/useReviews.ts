import { useState, useCallback } from 'react';
import { Employee } from '../Types/types';

export const useReviews = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleRequest = async (url: string, options?: RequestInit) => {
        try {
            setLoading(true);
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Failed to ${options?.method || 'fetch'} review`);
            }

            if (!options || options.method === 'GET') {
                setEmployees(data);
                return data;
            }

            if (options.method !== 'DELETE') {
                return data;
            }

            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Operation failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = useCallback(() => handleRequest('/api/reviews'), []);

    const addReview = useCallback(async (reviewData: Omit<Employee, 'id'>) => {
        const newReview = await handleRequest('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        setEmployees((prev) => [...prev, newReview]);
        return newReview;
    }, []);

    const updateReview = useCallback(async (id: number, reviewData: Partial<Employee>) => {
        const updatedReview = await handleRequest(`/api/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        setEmployees((prev) => prev.map((review) => (review.id === id ? updatedReview : review)));
        return updatedReview;
    }, []);

    const deleteReview = useCallback(async (id: number) => {
        await handleRequest(`/api/reviews/${id}`, { method: 'DELETE' });

        setEmployees((prev) => prev.filter((review) => review.id !== id));
    }, []);

    return {
        employees,
        loading,
        error,
        fetchReviews,
        addReview,
        updateReview,
        deleteReview,
    };
};
