import { renderHook, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePropertyFilter } from "./usePropertyFilter";

describe("usePropertyFilter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("inicializa con valores por defecto", () => {
    const { result } = renderHook(() => usePropertyFilter());

    expect(result.current.isExpanded).toBe(false);
    expect(result.current.nameInput).toBe("");
    expect(result.current.addressInput).toBe("");
    expect(result.current.filters).toEqual({
      name: "",
      address: "",
      minPrice: undefined,
      maxPrice: undefined,
      page: 1,
      pageSize: 20,
    });
  });

  it("alterna el estado expandido", () => {
    const { result } = renderHook(() => usePropertyFilter());

    expect(result.current.isExpanded).toBe(false);

    act(() => {
      result.current.toggleExpanded();
    });

    expect(result.current.isExpanded).toBe(true);

    act(() => {
      result.current.toggleExpanded();
    });

    expect(result.current.isExpanded).toBe(false);
  });

  it("actualiza nameInput cuando cambia", () => {
    const { result } = renderHook(() => usePropertyFilter());

    act(() => {
      result.current.handleInputChange("name", "Casa nueva");
    });

    expect(result.current.nameInput).toBe("Casa nueva");
  });

  it("actualiza addressInput cuando cambia", () => {
    const { result } = renderHook(() => usePropertyFilter());

    act(() => {
      result.current.handleInputChange("address", "Calle 123");
    });

    expect(result.current.addressInput).toBe("Calle 123");
  });

  it("llama onFiltersChange con debounce para name", async () => {
    const mockOnFiltersChange = jest.fn();
    const { result } = renderHook(() => usePropertyFilter(mockOnFiltersChange));

    act(() => {
      result.current.handleInputChange("name", "Casa");
    });

    expect(result.current.nameInput).toBe("Casa");

    await waitFor(
      () => {
        expect(mockOnFiltersChange).toHaveBeenCalledWith({
          name: "Casa",
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

  it("limpia todos los filtros", () => {
    const mockOnFiltersChange = jest.fn();
    const { result } = renderHook(() => usePropertyFilter(mockOnFiltersChange));

    act(() => {
      result.current.handleInputChange("name", "Casa");
      result.current.handleInputChange("address", "Calle 123");
    });

    act(() => {
      result.current.handleClear();
    });

    expect(result.current.nameInput).toBe("");
    expect(result.current.addressInput).toBe("");
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      name: "",
      address: "",
      minPrice: undefined,
      maxPrice: undefined,
      page: 1,
      pageSize: 20,
    });
  });

  it("actualiza setFilters directamente", () => {
    const mockOnFiltersChange = jest.fn();
    const { result } = renderHook(() => usePropertyFilter(mockOnFiltersChange));

    const newFilters = {
      name: "",
      address: "",
      minPrice: 100000,
      maxPrice: 500000,
      page: 1,
      pageSize: 10,
    };

    act(() => {
      result.current.setFilters(newFilters);
    });

    expect(result.current.filters).toEqual(newFilters);
  });

  it("funciona sin onFiltersChange", () => {
    const { result } = renderHook(() => usePropertyFilter());

    expect(() => {
      act(() => {
        result.current.handleInputChange("name", "Casa");
        result.current.handleClear();
        result.current.toggleExpanded();
      });
    }).not.toThrow();
  });
});
