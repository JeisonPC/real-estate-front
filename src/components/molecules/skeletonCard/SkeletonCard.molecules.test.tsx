import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonCard from './SkeletonCard.molecules';

describe('SkeletonCard Component', () => {
  describe('Rendering', () => {
    it('should render skeleton card with basic structure', () => {
      const { container } = render(<SkeletonCard />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render all skeleton elements', () => {
      const { container } = render(<SkeletonCard />);

      const mainContainer = container.querySelector('section');
      expect(mainContainer).toBeInTheDocument();

      const media = container.querySelector('.media');
      expect(media).toBeInTheDocument();

      const content = container.querySelector('.content');
      expect(content).toBeInTheDocument();

      const lines = container.querySelectorAll('.line');
      expect(lines).toHaveLength(2);

      const price = container.querySelector('.price');
      expect(price).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes to container', () => {
      const { container } = render(<SkeletonCard />);

      const mainContainer = container.querySelector('section');
      expect(mainContainer).toHaveClass('container');
    });

    it('should apply skeleton classes to media element', () => {
      const { container } = render(<SkeletonCard />);

      const media = container.querySelector('.media');
      expect(media).toHaveClass('media');
      expect(media).toHaveClass('skel');
    });

    it('should apply correct classes to text lines', () => {
      const { container } = render(<SkeletonCard />);

      const lines = container.querySelectorAll('.line');
      
      expect(lines[0]).toHaveClass('line');
      expect(lines[0]).toHaveClass('lg');
      expect(lines[0]).toHaveClass('skel');

      expect(lines[1]).toHaveClass('line');
      expect(lines[1]).toHaveClass('md');
      expect(lines[1]).toHaveClass('skel');
    });

    it('should apply skeleton class to price element', () => {
      const { container } = render(<SkeletonCard />);

      const price = container.querySelector('.price');
      expect(price).toHaveClass('price');
      expect(price).toHaveClass('skel');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-hidden attribute for screen readers', () => {
      const { container } = render(<SkeletonCard />);

      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-hidden', 'true');
    });

    it('should use semantic section element', () => {
      const { container } = render(<SkeletonCard />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Structure Validation', () => {
    it('should have proper content structure', () => {
      const { container } = render(<SkeletonCard />);

      const content = container.querySelector('.content');
      expect(content).toBeInTheDocument();

      const contentChildren = content?.children;
      expect(contentChildren).toHaveLength(3);
    });

    it('should render skeleton elements in correct order', () => {
      const { container } = render(<SkeletonCard />);

      const content = container.querySelector('.content');
      const children = content?.children;

      expect(children?.[0]).toHaveClass('line');
      expect(children?.[0]).toHaveClass('lg');

      expect(children?.[1]).toHaveClass('line');
      expect(children?.[1]).toHaveClass('md');

      expect(children?.[2]).toHaveClass('price');
    });
  });

  describe('Component Behavior', () => {
    it('should render consistently across multiple renders', () => {
      const { container: container1 } = render(<SkeletonCard />);
      const { container: container2 } = render(<SkeletonCard />);

      const section1 = container1.querySelector('section');
      const section2 = container2.querySelector('section');

      expect(section1).toHaveClass('container');
      expect(section2).toHaveClass('container');

      const skeletonElements1 = container1.querySelectorAll('.skel');
      const skeletonElements2 = container2.querySelectorAll('.skel');

      expect(skeletonElements1).toHaveLength(4);
      expect(skeletonElements2).toHaveLength(4);
    });

    it('should not have any interactive elements', () => {
      const { container } = render(<SkeletonCard />);

      const buttons = container.querySelectorAll('button');
      const links = container.querySelectorAll('a');
      const inputs = container.querySelectorAll('input');

      expect(buttons).toHaveLength(0);
      expect(links).toHaveLength(0);
      expect(inputs).toHaveLength(0);
    });
  });

  describe('Visual Elements', () => {
    it('should have media placeholder element', () => {
      const { container } = render(<SkeletonCard />);

      const media = container.querySelector('.media');
      expect(media).toBeInTheDocument();
      expect(media).toHaveClass('skel');
    });

    it('should have text line placeholders with different sizes', () => {
      const { container } = render(<SkeletonCard />);

      const largeLine = container.querySelector('.line.lg');
      const mediumLine = container.querySelector('.line.md');

      expect(largeLine).toBeInTheDocument();
      expect(mediumLine).toBeInTheDocument();
      expect(largeLine).not.toBe(mediumLine);
    });

    it('should have price placeholder', () => {
      const { container } = render(<SkeletonCard />);

      const price = container.querySelector('.price');
      expect(price).toBeInTheDocument();
      expect(price).toHaveClass('skel');
    });
  });
});
