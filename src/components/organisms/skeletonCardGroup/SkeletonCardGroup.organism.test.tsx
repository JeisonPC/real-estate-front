import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonCardGroupOrganism from './SkeletonCardGroup.organism';

jest.mock('@/components/molecules/skeletonCard/SkeletonCard.molecules', () => {
  return function MockSkeletonCard() {
    return (
      <div data-testid="skeleton-card" aria-hidden="true">
        <div data-testid="skeleton-media">Loading media...</div>
        <div data-testid="skeleton-content">
          <div data-testid="skeleton-title">Loading title...</div>
          <div data-testid="skeleton-address">Loading address...</div>
          <div data-testid="skeleton-price">Loading price...</div>
        </div>
      </div>
    );
  };
});

let mockUUIDCounter = 0;

describe('SkeletonCardGroupOrganism Component', () => {
  let mockCryptoRandomUUID: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUUIDCounter = 0;
    mockCryptoRandomUUID = jest.spyOn(crypto, 'randomUUID')
      .mockImplementation(() => {
        mockUUIDCounter++;
        return `550e8400-e29b-41d4-a716-44665544000${mockUUIDCounter.toString().padStart(1, '0')}`;
      });
  });

  afterEach(() => {
    mockCryptoRandomUUID.mockRestore();
    mockUUIDCounter = 0;
  });

  describe('Default Behavior', () => {
    it('should render one skeleton card by default', () => {
      render(<SkeletonCardGroupOrganism />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(1);
    });

    it('should render container with correct CSS class', () => {
      const { container } = render(<SkeletonCardGroupOrganism />);

      const mainContainer = container.querySelector('.container');
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe('Quantity Prop', () => {
    it('should render the specified number of skeleton cards', () => {
      render(<SkeletonCardGroupOrganism quantity={3} />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(3);
    });

    it('should render multiple skeleton cards when quantity is set', () => {
      render(<SkeletonCardGroupOrganism quantity={5} />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(5);
    });

    it('should handle zero quantity gracefully', () => {
      render(<SkeletonCardGroupOrganism quantity={0} />);

      const skeletonCards = screen.queryAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(0);
    });

    it('should handle large quantities', () => {
      render(<SkeletonCardGroupOrganism quantity={10} />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(10);
    });
  });

  describe('Unique Keys Generation', () => {
    it('should generate unique keys for each skeleton card', () => {
      render(<SkeletonCardGroupOrganism quantity={3} />);

      expect(mockCryptoRandomUUID).toHaveBeenCalledTimes(3);
    });

    it('should call crypto.randomUUID for key generation', () => {
      render(<SkeletonCardGroupOrganism quantity={2} />);

      expect(mockCryptoRandomUUID).toHaveBeenCalledTimes(2);
      expect(mockCryptoRandomUUID).toHaveBeenCalledWith();
    });
  });

  describe('Component Structure', () => {
    it('should wrap skeleton cards in a container div', () => {
      const { container } = render(<SkeletonCardGroupOrganism quantity={2} />);

      const containerDiv = container.querySelector('div.container');
      expect(containerDiv).toBeInTheDocument();

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      skeletonCards.forEach(card => {
        expect(containerDiv).toContainElement(card);
      });
    });

    it('should maintain proper DOM structure', () => {
      const { container } = render(<SkeletonCardGroupOrganism quantity={3} />);

      const containerDiv = container.querySelector('.container');
      expect(containerDiv?.children).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('should include accessibility attributes from skeleton cards', () => {
      render(<SkeletonCardGroupOrganism quantity={2} />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      skeletonCards.forEach(card => {
        expect(card).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Performance Considerations', () => {
    it('should use memoization for keys generation', () => {
      const { rerender } = render(<SkeletonCardGroupOrganism quantity={3} />);

      expect(mockCryptoRandomUUID).toHaveBeenCalledTimes(3);

      mockCryptoRandomUUID.mockClear();

      rerender(<SkeletonCardGroupOrganism quantity={3} />);

      expect(mockCryptoRandomUUID).not.toHaveBeenCalled();
    });

    it('should regenerate keys when quantity changes', () => {
      const { rerender } = render(<SkeletonCardGroupOrganism quantity={2} />);

      expect(mockCryptoRandomUUID).toHaveBeenCalledTimes(2);

      mockCryptoRandomUUID.mockClear();

      rerender(<SkeletonCardGroupOrganism quantity={4} />);

      expect(mockCryptoRandomUUID).toHaveBeenCalledTimes(4);
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative quantity by treating it as 0', () => {
      render(<SkeletonCardGroupOrganism quantity={-1} />);

      const skeletonCards = screen.queryAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(0);
    });

    it('should handle undefined quantity by using default', () => {
      render(<SkeletonCardGroupOrganism quantity={undefined} />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(1);
    });
  });
});
