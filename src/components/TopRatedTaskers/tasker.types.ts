export interface Tasker {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  categoryId?: string;
}

export interface CategoryTab {
  id: string;
  name: string;
  icon: React.ReactNode;
}
