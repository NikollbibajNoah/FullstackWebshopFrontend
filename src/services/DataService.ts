import axios from "axios";
import { ProductProps } from "../models/ProductData";
import { ShoppingCartProductsProps } from "../components/Products";

const isDev = import.meta.env.VITE_DEV_MODE;
const endpoint = isDev
  ? "http://localhost:5000/products"
  : "https://localhost:7071/StoreProducts";
  

export const fetchProducts = async () => {
  try {
    const res = await axios.get(endpoint);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const res = await axios.get(`${endpoint}/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addProductToCart = async (product: ProductProps) => {
  try {
    const data: ShoppingCartProductsProps = {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productCategory: product.category,
      productDescription: product.description,
      productImage: product.image ? product.image : "",
      quantity: 1,
    };
    
    const checkRes = await axios.get("http://localhost:5000/shoppingcart");

    if (checkRes.status === 200) {
      const shoppingCartProducts: ShoppingCartProductsProps[] = checkRes.data;

      const productExists = shoppingCartProducts.find(
        (cartProduct) => cartProduct.productId === product.id
      );

      if (productExists) {
        productExists.quantity++;
        console.log("Product already exists in cart");
        const temp = await axios.put(
          `http://localhost:5000/shoppingcart/${productExists.id}`,
          productExists
        );
        return temp.data;
      }
    }

    const res = await axios.post("http://localhost:5000/shoppingcart", data);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};
