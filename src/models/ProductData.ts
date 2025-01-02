export interface ProductProps {
    id: number;
    name:string;
    category:string;
    description:string;
    price:number;
    image?: string;
    onAddToCartClick?: () => void;
    onDetailsClick?: () => void;
}