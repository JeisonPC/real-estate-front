import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useGetProperties } from './useGetProperties';
import { PropertyFilters } from '../domain/entities/propertyFilters';
import { PropertyResponse } from '../domain/entities/propertyResponse';

const mockGetProperties = jest.fn();
jest.mock('../usecases/getProperties.usecase', () => ({
  getProperties: (...args: unknown[]) => mockGetProperties(...args)
}));

jest.mock('../repositories/apiProperty.repository', () => ({
  ApiPropertyRepository: jest.fn().mockImplementation(() => ({
    getAll: jest.fn()
  }))
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

const renderHookWithQueryClient = <T,>(hook: () => T) => {
  const queryClient = createTestQueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => 
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  
  return {
    ...renderHook(hook, { wrapper }),
    queryClient
  };
};

describe('useGetProperties Hook', () => {
  const mockProperties: PropertyResponse[] = [
    {
      id: '1',
      idOwner: 'owner1',
      name: 'Beautiful Apartment',
      address: '123 Main St',
      price: 350000,
      imageUrl: 'https://example.com/image1.jpg'
    },
    {
      id: '2',
      idOwner: 'owner2',
      name: 'Cozy House',
      address: '456 Oak Ave',
      price: 450000,
      imageUrl: 'https://example.com/image2.jpg'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Hook Initialization', () => {
    it('should initialize with loading state', () => {
      const neverResolvingPromise = new Promise(() => {
      });
      mockGetProperties.mockImplementation(() => neverResolvingPromise);
      
      const { result } = renderHookWithQueryClient(() => useGetProperties());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeNull();
    });

    it('should call getProperties use case with repository', () => {
      mockGetProperties.mockResolvedValue(mockProperties);
      
      renderHookWithQueryClient(() => useGetProperties());

      expect(mockGetProperties).toHaveBeenCalledWith(
        expect.any(Object),
        undefined
      );
    });
  });

  describe('Successful Data Fetching', () => {
    it('should return properties data on successful fetch', async () => {
      mockGetProperties.mockResolvedValue(mockProperties);
      
      const { result } = renderHookWithQueryClient(() => useGetProperties());

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockProperties);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle empty properties list', async () => {
      mockGetProperties.mockResolvedValue([]);
      
      const { result } = renderHookWithQueryClient(() => useGetProperties());

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle fetch errors', async () => {
      const errorMessage = 'Failed to fetch properties';
      mockGetProperties.mockRejectedValue(new Error(errorMessage));
      
      const { result } = renderHookWithQueryClient(() => useGetProperties());

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle network errors', async () => {
      mockGetProperties.mockRejectedValue(new Error('Network Error'));
      
      const { result } = renderHookWithQueryClient(() => useGetProperties());

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Network Error');
    });
  });

  describe('Filters Integration', () => {
    it('should pass filters to getProperties use case', () => {
      const filters: PropertyFilters = {
        name: 'apartment',
        address: 'downtown',
        minPrice: 300000,
        maxPrice: 500000,
        page: 1,
        pageSize: 10
      };

      mockGetProperties.mockResolvedValue(mockProperties);
      
      renderHookWithQueryClient(() => useGetProperties(filters));

      expect(mockGetProperties).toHaveBeenCalledWith(
        expect.any(Object),
        filters
      );
    });

    it('should handle partial filters', () => {
      const partialFilters: PropertyFilters = {
        name: 'house',
        minPrice: 200000
      };

      mockGetProperties.mockResolvedValue(mockProperties);
      
      renderHookWithQueryClient(() => useGetProperties(partialFilters));

      expect(mockGetProperties).toHaveBeenCalledWith(
        expect.any(Object),
        partialFilters
      );
    });

    it('should handle undefined filters', () => {
      mockGetProperties.mockResolvedValue(mockProperties);
      
      renderHookWithQueryClient(() => useGetProperties());

      expect(mockGetProperties).toHaveBeenCalledWith(
        expect.any(Object),
        undefined
      );
    });
  });

  describe('Query Key Generation', () => {
    it('should generate different query keys for different filters', () => {
      const filters1: PropertyFilters = { name: 'apartment' };
      const filters2: PropertyFilters = { name: 'house' };

      mockGetProperties.mockResolvedValue(mockProperties);
      
      const { queryClient: client1 } = renderHookWithQueryClient(() => useGetProperties(filters1));
      const { queryClient: client2 } = renderHookWithQueryClient(() => useGetProperties(filters2));

      const cache1Keys = client1.getQueryCache().getAll().map(query => query.queryKey);
      const cache2Keys = client2.getQueryCache().getAll().map(query => query.queryKey);

      expect(cache1Keys).toContainEqual(['properties', filters1]);
      expect(cache2Keys).toContainEqual(['properties', filters2]);
    });

    it('should use same query key for same filters', () => {
      const filters: PropertyFilters = { name: 'apartment', minPrice: 300000 };

      mockGetProperties.mockResolvedValue(mockProperties);
      
      const { queryClient } = renderHookWithQueryClient(() => useGetProperties(filters));
      
      renderHookWithQueryClient(() => useGetProperties(filters));

      const cacheKeys = queryClient.getQueryCache().getAll().map((query) => query.queryKey);
      expect(cacheKeys).toContainEqual(['properties', filters]);
    });
  });

  describe('Hook Return Values', () => {
    it('should return all expected query properties', async () => {
      mockGetProperties.mockResolvedValue(mockProperties);
      
      const { result } = renderHookWithQueryClient(() => useGetProperties());

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current).toHaveProperty('data');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('isError');
      expect(result.current).toHaveProperty('isSuccess');
      expect(result.current).toHaveProperty('refetch');
    });

    it('should provide refetch functionality', async () => {
      mockGetProperties.mockResolvedValue(mockProperties);
      
      const { result } = renderHookWithQueryClient(() => useGetProperties());

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(typeof result.current.refetch).toBe('function');
      
      mockGetProperties.mockClear();
      await result.current.refetch();
      
      expect(mockGetProperties).toHaveBeenCalledTimes(1);
    });
  });
});
