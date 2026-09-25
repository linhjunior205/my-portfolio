import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from 'fuse.js';
import { BlogPost } from "@/types";

interface UseSearchOptions {
    maxResults?: number;
    threshold?: number;
}

export function useSearch(options: UseSearchOptions = {}) {
    const { maxResults = 10, threshold = 0.5 } = options;

    const [searchData, setSearchData] = useState<BlogPost[]>([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fusejsOptions = useMemo(() => ({
        keys: [
            { name: 'title', weight: 0.4 },
            { name: 'summary', weight: 0.3 },
            { name: 'content', weight: 0.2 },
            { name: 'tags', weight: 0.1 }
        ],
        threshold,
        includeScore: true,
        minMatchCharLength: 2,
        shouldSort: true,
    }), [threshold]);

    //load search data
    useEffect(() => {
        const loadSearchData = async () => {
            try {
                setError(null);
                const response = await fetch('/blog-search-index.json');
                if (!response.ok) {
                    throw new Error('Failed to load search data');
                }
                const data: BlogPost[] = await response.json();
                setSearchData(data);
                setResults(data.slice(0, maxResults));
                setDataLoaded(true);
            } catch (error) {
                console.error('Error loading search data:', error);
                setError(error instanceof Error ? error.message : 'Failed to load search data');
                setResults([]);
                setDataLoaded(true);
            }
        };

        loadSearchData();
    }, [])

    const fuse = useMemo(() => {
        if (searchData.length === 0) return null;
        return new Fuse(searchData, fusejsOptions);
    }, [searchData, fusejsOptions]);

    const performSearch = useCallback((searchQuery: string) => {
        if (!fuse || searchQuery.length < 2) {
            setResults(searchData.slice(0, maxResults));
            return;
        }

        setLoading(true);
        try {
            const fuseResults = fuse.search(searchQuery, { limit: maxResults });
            const items = fuseResults.map(result => result.item);
            setResults(items);
        } catch (error) {
            console.error('Error performing search:', error);
            setError(error instanceof Error ? error.message : 'Search failed');
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [fuse, maxResults]);

    const handleSearchChange = useCallback((newQuery: string) => {
        setQuery(newQuery);
        setError(null);
        performSearch(newQuery);
    }, [performSearch]);

    const clearSearch = useCallback(() => {
        setQuery("");
        setResults([]);
        setError(null);
    }, []);

    return {
        query,
        results,
        loading,
        error,
        dataLoaded,
        handleSearchChange,
        clearSearch,
    };
}