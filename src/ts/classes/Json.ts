// Importing 'axios' for api :
import axios from "axios";

// Importing product type to work with it :
import { Product } from "./../types/product";

// Creating class that will be work with 'json-server' get datas :
export class Server {
  // Getting all products by 'axios' :
  public static async getAllProducts(): Promise<Product[]> {
    const response = await axios.get("http://localhost:3000/all-products");
    return response.data;
  }

  public static async getProductsByType(type: string): Promise<Product[]> {
    const response = await axios.get("http://localhost:3000/all-products");
    return response.data.filter(
      (product: Product) =>
        product.type.trim().toLocaleLowerCase() ==
        type.trim().toLocaleLowerCase()
    );
  }
}
