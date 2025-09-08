import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card.molecules";
import { PropertyResponse } from "@/features/properties/domain/entities/propertyResponse";

// Mock de next/image
jest.mock("next/image", () => {
  return function MockImage({
    src,
    alt,
    style,
    ...otherProps
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }) {
    // Filtrar props específicas de Next.js Image que no son válidas para <img>
    // Evitamos usar fill, priority, sizes
    const imgProps = {
      src: src || undefined, // Convertir string vacío a undefined
      alt: alt || "", // Asegurar que alt siempre tenga un valor
      style,
      ...otherProps,
    };

    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img data-testid="property-image" {...imgProps} />
    );
  };
});

describe("Card Component", () => {
  const mockProperty: PropertyResponse = {
    id: "test-id-123",
    idOwner: "owner-456",
    name: "Beautiful Ocean View Apartment",
    address: "123 Beach Avenue, Miami, FL",
    price: 450000,
    imageUrl: "https://example.com/property-image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render property card with all basic information", () => {
      render(<Card {...mockProperty} />);

      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Beautiful Ocean View Apartment"
      );
      expect(
        screen.getByText("123 Beach Avenue, Miami, FL")
      ).toBeInTheDocument();
      expect(screen.getByText("$450,000")).toBeInTheDocument();
      expect(screen.getByText("STARTING AT")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /discover more/i })
      ).toBeInTheDocument();
    });

    it("should render property image with correct attributes", () => {
      render(<Card {...mockProperty} />);

      const image = screen.getByTestId("property-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        "https://example.com/property-image.jpg"
      );
      expect(image).toHaveAttribute("alt", "Beautiful Ocean View Apartment");
    });

    it("should apply semantic HTML structure", () => {
      render(<Card {...mockProperty} />);

      const article = screen.getByRole("article");
      const heading = screen.getByRole("heading", { level: 2 });
      const button = screen.getByRole("button");

      expect(article).toContainElement(heading);
      expect(article).toContainElement(button);
    });
  });

  describe("Price Formatting", () => {
    it("should format price with commas for large numbers", () => {
      const expensiveProperty = {
        ...mockProperty,
        price: 1250000,
      };

      render(<Card {...expensiveProperty} />);
      expect(screen.getByText("$1,250,000")).toBeInTheDocument();
    });

    it("should format price without commas for small numbers", () => {
      const cheapProperty = {
        ...mockProperty,
        price: 5000,
      };

      render(<Card {...cheapProperty} />);
      expect(screen.getByText("$5,000")).toBeInTheDocument();
    });

    it("should handle zero price", () => {
      const freeProperty = {
        ...mockProperty,
        price: 0,
      };

      render(<Card {...freeProperty} />);
      expect(screen.getByText("$0")).toBeInTheDocument();
    });
  });

  describe("Content Display", () => {
    it("should display long property names correctly", () => {
      const longNameProperty = {
        ...mockProperty,
        name: "Luxury Penthouse with Panoramic Ocean Views and Premium Amenities in Downtown Miami",
      };

      render(<Card {...longNameProperty} />);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Luxury Penthouse with Panoramic Ocean Views and Premium Amenities in Downtown Miami"
      );
    });

    it("should display long addresses correctly", () => {
      const longAddressProperty = {
        ...mockProperty,
        address:
          "1234 Very Long Street Name in a Beautiful Neighborhood, Miami Beach, FL 33139",
      };

      render(<Card {...longAddressProperty} />);
      expect(
        screen.getByText(
          "1234 Very Long Street Name in a Beautiful Neighborhood, Miami Beach, FL 33139"
        )
      ).toBeInTheDocument();
    });

    it("should handle special characters in name and address", () => {
      const specialCharsProperty = {
        ...mockProperty,
        name: 'Casa "El Paraíso" - Luxury Villa',
        address: "123 Calle de la Playa #456, São Paulo",
      };

      render(<Card {...specialCharsProperty} />);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        'Casa "El Paraíso" - Luxury Villa'
      );
      expect(
        screen.getByText("123 Calle de la Playa #456, São Paulo")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings gracefully", () => {
      const emptyProperty = {
        ...mockProperty,
        name: "",
        address: "",
        imageUrl: "",
      };

      render(<Card {...emptyProperty} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("");

      const image = screen.getByTestId("property-image");
      // Con nuestro mock, cuando src es vacío se convierte a undefined
      expect(image).not.toHaveAttribute("src");
      expect(image).toHaveAttribute("alt", "");
    });

    it("should handle undefined values by converting to string", () => {
      const undefinedProperty = {
        id: "test-id",
        idOwner: "owner-id",
        name: undefined as unknown as string,
        address: undefined as unknown as string,
        price: 100000,
        imageUrl: undefined as unknown as string,
      };

      render(<Card {...undefinedProperty} />);

      // El componente debería renderizar sin errores
      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(screen.getByText("$100,000")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA roles and semantic structure", () => {
      render(<Card {...mockProperty} />);

      const article = screen.getByRole("article");
      const heading = screen.getByRole("heading", { level: 2 });
      const button = screen.getByRole("button");
      const image = screen.getByRole("img");

      expect(article).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });

    it("should have descriptive alt text for image", () => {
      render(<Card {...mockProperty} />);

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "Beautiful Ocean View Apartment");
    });

    it("should have clear button text", () => {
      render(<Card {...mockProperty} />);

      const button = screen.getByRole("button", { name: /discover more/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("CSS Classes", () => {
    it("should apply the correct CSS classes", () => {
      const { container } = render(<Card {...mockProperty} />);

      const article = container.querySelector("article");
      expect(article).toHaveClass("containerGlobal");

      const cardContainer = container.querySelector(".container");
      expect(cardContainer).toBeInTheDocument();

      const media = container.querySelector(".media");
      expect(media).toBeInTheDocument();

      const content = container.querySelector(".content");
      expect(content).toBeInTheDocument();

      const button = container.querySelector(".button");
      expect(button).toBeInTheDocument();
    });
  });
});
