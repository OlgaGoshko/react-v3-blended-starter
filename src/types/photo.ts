export interface Photo {
  id: number;
  avg_color: string;
  alt: string;
  src: {
    original: string;
    large: string;
  };
}
