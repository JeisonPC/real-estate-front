import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyFilterMolecule from './PropertyFilter.molecules';

jest.mock('@/components/atoms/input/Input.atom', () => {
  return function MockInputAtom({ 
    label, 
    id, 
    onChange, 
    ...props
  }: {
    label: string;
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          data-testid={`input-field-${id}`}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  };
});

jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />;
  };
});

describe('PropertyFilterMolecule', () => {
  const mockOnFiltersChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('expands and shows filter form when trigger button is clicked', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    expect(screen.getByText('×')).toBeInTheDocument();
    
    expect(screen.getByTestId('input-field-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-address')).toBeInTheDocument();
    expect(screen.getByText('Precio:')).toBeInTheDocument();
    expect(screen.getByText('Por página:')).toBeInTheDocument();
  });

  it('collapses when trigger button is clicked again', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    
    fireEvent.click(triggerButton);
    expect(screen.getByText('×')).toBeInTheDocument();
    
    fireEvent.click(triggerButton);
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('calls onFiltersChange with debounce when name input changes', async () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    const nameInput = screen.getByTestId('input-field-name');
    fireEvent.change(nameInput, { target: { value: 'Casa' } });
    
    await waitFor(
      () => {
        expect(mockOnFiltersChange).toHaveBeenCalledWith({
          name: 'Casa',
          address: undefined,
          minPrice: undefined,
          maxPrice: undefined,
          page: 1,
          pageSize: 20,
        });
      },
      { timeout: 600 }
    );
  });

  it('calls onFiltersChange with debounce when address input changes', async () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    const addressInput = screen.getByTestId('input-field-address');
    fireEvent.change(addressInput, { target: { value: 'Calle 123' } });
    
    await waitFor(
      () => {
        expect(mockOnFiltersChange).toHaveBeenCalledWith({
          name: undefined,
          address: 'Calle 123',
          minPrice: undefined,
          maxPrice: undefined,
          page: 1,
          pageSize: 20,
        });
      },
      { timeout: 600 }
    );
  });

  it('applies price filter when price button is clicked', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    const priceButton = screen.getByText('Hasta $2500k');
    fireEvent.click(priceButton);
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: 0,
      maxPrice: 2500000,
      page: 1,
      pageSize: 20,
    });
  });

  it('highlights active price filter button', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    const priceButton = screen.getByText('$2500k – $150M');
    fireEvent.click(priceButton);
    
    expect(priceButton).toHaveClass('active');
  });

  it('changes page size when select value changes', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    const pageSizeSelect = screen.getByRole('combobox');
    fireEvent.change(pageSizeSelect, { target: { value: '10' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: undefined,
      maxPrice: undefined,
      page: 1,
      pageSize: 10,
    });
  });

  it('clears all filters when clear button is clicked', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    const clearButton = screen.getByText('Limpiar');
    fireEvent.click(clearButton);
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: undefined,
      maxPrice: undefined,
      page: 1,
      pageSize: 20,
    });
  });

  it('shows all price filter buttons', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    expect(screen.getByText('Hasta $2500k')).toBeInTheDocument();
    expect(screen.getByText('$2500k – $150M')).toBeInTheDocument();
    expect(screen.getByText('Más de $150M')).toBeInTheDocument();
  });

  it('shows page size options', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    expect(screen.getByText('Selecciona cantidad...')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('works without onFiltersChange prop', () => {
    expect(() => {
      render(<PropertyFilterMolecule />);
    }).not.toThrow();
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    const priceButton = screen.getByText('Hasta $2500k');
    expect(() => {
      fireEvent.click(priceButton);
    }).not.toThrow();
  });

  it('applies correct class names based on expansion state', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const container = screen.getByRole('button', { name: /filtrar/i }).closest('div');
    
    expect(container).not.toHaveClass('expanded');
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    expect(container).toHaveClass('expanded');
  });
});
