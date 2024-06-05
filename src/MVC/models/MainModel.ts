import { Cart } from "./../../ts/types/cart";
// Importing type 'product' for using :
import { Product } from "./../../ts/types/product";

// Importing special 'LocalStorage' class to work with it :
import { LocalStorage } from "../../ts/classes/LocalStorage,";
import { Server } from "../../ts/classes/Json";

// Creating 'MainModel' class for main logic of web app :
export class MainModel {
  public products!: Product[];
  public productsInCart: Cart[];
  // Creating contructor that initialize the product in cart list :
  constructor() {
    this.productsInCart = LocalStorage.readAllProductsFromLocalStorage();

    Server.getAllProducts().then((value) => {
      this.products = value;
    });
  }

  public async addProductToCart(product: Product): Promise<void> {
    LocalStorage.writeProductToCart(product);
    this.productsInCart = LocalStorage.readAllProductsFromLocalStorage();
  }

  // Universal function that sets products in model as type :
  public async setAllProductsByType(type: string): Promise<void> {
    if (type.trim() == "All Products") {
      const data = await Server.getAllProducts();
      this.products = data;
    } else {
      const data = await Server.getProductsByType(type);
      this.products = data;
    }
  }

  // Universal function to filter products :
  // Function to convert price string to number
  public priceToNumber(price: string): number {
    return parseFloat(price.replace("$", ""));
  }

  // Function to sort products by a given criterion
  public async sortProducts(criterion: keyof Product): Promise<void> {
    this.products = this.products.slice().sort((a, b) => {
      let aValue = a[criterion];
      let bValue = b[criterion];

      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });
  }
}
