import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyFilterMolecule from './PropertyFilter.molecules';

// Mock del componente InputAtom
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

// Mock de next/image
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
    
    // Debe mostrar el botón de cerrar
    expect(screen.getByText('×')).toBeInTheDocument();
    
    // Debe mostrar los campos de filtro
    expect(screen.getByTestId('input-field-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-address')).toBeInTheDocument();
    expect(screen.getByText('Precio:')).toBeInTheDocument();
    expect(screen.getByText('Por página:')).toBeInTheDocument();
  });

  it('collapses when trigger button is clicked again', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    
    // Expandir
    fireEvent.click(triggerButton);
    expect(screen.getByText('×')).toBeInTheDocument();
    
    // Colapsar
    fireEvent.click(triggerButton);
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('calls onFiltersChange with debounce when name input changes', async () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Escribir en el campo nombre
    const nameInput = screen.getByTestId('input-field-name');
    fireEvent.change(nameInput, { target: { value: 'Casa' } });
    
    // Debe esperar el debounce (500ms)
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
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Escribir en el campo dirección
    const addressInput = screen.getByTestId('input-field-address');
    fireEvent.change(addressInput, { target: { value: 'Calle 123' } });
    
    // Debe esperar el debounce (500ms)
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
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Hacer clic en el primer botón de precio
    const priceButton = screen.getByText('Hasta $2500k');
    fireEvent.click(priceButton);
    
    // Debe llamar onFiltersChange inmediatamente
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
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Hacer clic en el segundo botón de precio
    const priceButton = screen.getByText('$2500k – $150M');
    fireEvent.click(priceButton);
    
    // El botón debe tener la clase active
    expect(priceButton).toHaveClass('active');
  });

  it('changes page size when select value changes', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Cambiar el select de página
    const pageSizeSelect = screen.getByRole('combobox');
    fireEvent.change(pageSizeSelect, { target: { value: '10' } });
    
    // Debe llamar onFiltersChange inmediatamente
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
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Hacer clic en limpiar
    const clearButton = screen.getByText('Limpiar');
    fireEvent.click(clearButton);
    
    // Debe llamar onFiltersChange con valores por defecto
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
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Verificar que todos los botones de precio están presentes
    expect(screen.getByText('Hasta $2500k')).toBeInTheDocument();
    expect(screen.getByText('$2500k – $150M')).toBeInTheDocument();
    expect(screen.getByText('Más de $150M')).toBeInTheDocument();
  });

  it('shows page size options', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Verificar que las opciones de página están presentes
    expect(screen.getByText('Selecciona cantidad...')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('works without onFiltersChange prop', () => {
    // Renderizar sin la prop onFiltersChange
    expect(() => {
      render(<PropertyFilterMolecule />);
    }).not.toThrow();
    
    // Expandir el filtro
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Hacer clic en un botón de precio no debe fallar
    const priceButton = screen.getByText('Hasta $2500k');
    expect(() => {
      fireEvent.click(priceButton);
    }).not.toThrow();
  });

  it('applies correct class names based on expansion state', () => {
    render(<PropertyFilterMolecule onFiltersChange={mockOnFiltersChange} />);
    
    const container = screen.getByRole('button', { name: /filtrar/i }).closest('div');
    
    // Inicialmente no debe tener la clase expanded
    expect(container).not.toHaveClass('expanded');
    
    // Expandir
    const triggerButton = screen.getByRole('button', { name: /filtrar/i });
    fireEvent.click(triggerButton);
    
    // Debe tener la clase expanded
    expect(container).toHaveClass('expanded');
  });
});
