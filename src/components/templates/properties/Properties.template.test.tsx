import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropertiesTemplate from './Properties.template';
import { PropertyResponse } from '@/features/properties/domain/entities/propertyResponse';

const mockUseGetProperties = jest.fn();
jest.mock('@/features/properties/hooks/useGetProperties', () => ({
  useGetProperties: () => mockUseGetProperties()
}));

jest.mock('@/components/molecules/card/Card.molecules', () => {
  return function MockCard({ id, name, address, price }: PropertyResponse) {
    return (
      <div data-testid={`card-${id}`}>
        <h3>{name}</h3>
        <p>{address}</p>
        <span>${price.toLocaleString()}</span>
      </div>
    );
  };
});

jest.mock('@/components/molecules/filter/PropertyFilter.molecules', () => {
  return function MockPropertyFilter({ onFiltersChange }: { onFiltersChange: (filters: Record<string, unknown>) => void }) {
    return (
      <div data-testid="property-filter">
        <button 
          onClick={() => onFiltersChange({ name: 'test filter' })}
          data-testid="filter-trigger"
        >
          Filter Properties
        </button>
      </div>
    );
  };
});

jest.mock('@/components/organisms/skeletonCardGroup/SkeletonCardGroup.organism', () => {
  return function MockSkeletonCardGroup({ quantity }: { quantity: number }) {
    return (
      <div data-testid="skeleton-group">
        {Array.from({ length: quantity }, (_, index) => (
          <div key={index} data-testid={`skeleton-${index}`}>
            Loading...
          </div>
        ))}
      </div>
    );
  };
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('PropertiesTemplate Component', () => {
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

  describe('Loading State', () => {
    it('should show skeleton loading when data is not available', () => {
      mockUseGetProperties.mockReturnValue({
        data: undefined,
        error: null
      });

      renderWithQueryClient(<PropertiesTemplate />);

      expect(screen.getByTestId('skeleton-group')).toBeInTheDocument();
      expect(screen.getAllByTestId(/skeleton-\d+/)).toHaveLength(9);
    });
  });

  describe('Error State', () => {
    it('should show error message when there is an error', () => {
      mockUseGetProperties.mockReturnValue({
        data: undefined,
        error: new Error('Failed to fetch properties')
      });

      renderWithQueryClient(<PropertiesTemplate />);

      expect(screen.getByText('Error loading properties')).toBeInTheDocument();
    });
  });

  describe('Success State', () => {
    it('should render properties when data is available', () => {
      mockUseGetProperties.mockReturnValue({
        data: mockProperties,
        error: null
      });

      renderWithQueryClient(<PropertiesTemplate />);

      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByTestId('card-2')).toBeInTheDocument();
      expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
      expect(screen.getByText('Cozy House')).toBeInTheDocument();
      expect(screen.getByText('$350,000')).toBeInTheDocument();
      expect(screen.getByText('$450,000')).toBeInTheDocument();
    });

    it('should render property filter component', () => {
      mockUseGetProperties.mockReturnValue({
        data: mockProperties,
        error: null
      });

      renderWithQueryClient(<PropertiesTemplate />);

      expect(screen.getByTestId('property-filter')).toBeInTheDocument();
    });

    it('should handle empty properties list', () => {
      mockUseGetProperties.mockReturnValue({
        data: [],
        error: null
      });

      renderWithQueryClient(<PropertiesTemplate />);

      expect(screen.queryByTestId(/card-/)).not.toBeInTheDocument();
      expect(screen.getByTestId('property-filter')).toBeInTheDocument();
    });
  });

  describe('Container Structure', () => {
    it('should render main container with correct structure', () => {
      mockUseGetProperties.mockReturnValue({
        data: mockProperties,
        error: null
      });

      const { container } = renderWithQueryClient(<PropertiesTemplate />);

      const mainSection = container.querySelector('section');
      expect(mainSection).toBeInTheDocument();
      expect(mainSection).toHaveClass('container');
    });
  });

  describe('Component Integration', () => {
    it('should pass correct props to Card components', () => {
      mockUseGetProperties.mockReturnValue({
        data: mockProperties,
        error: null
      });

      renderWithQueryClient(<PropertiesTemplate />);

      expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('Cozy House')).toBeInTheDocument();
      expect(screen.getByText('456 Oak Ave')).toBeInTheDocument();
    });

    it('should render unique keys for each property card', () => {
      mockUseGetProperties.mockReturnValue({
        data: mockProperties,
        error: null
      });

      renderWithQueryClient(<PropertiesTemplate />);

      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByTestId('card-2')).toBeInTheDocument();
    });
  });
});
