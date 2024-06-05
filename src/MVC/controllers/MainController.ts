import { Product } from "./../../ts/types/product";
import { MainModel } from "../models/MainModel";
import { MainView } from "../views/MainView";

// Creating 'MainController' class for working with model and view of web project :
export class MainController {
  // Creating 2 fields model,view for working with them all :
  model: MainModel;
  view: MainView;

  // Constructor for initalising the 'model' and 'view' :
  constructor(model: MainModel, view: MainView) {
    this.model = model;
    this.view = view;

    setTimeout(() => {
      this.view.writeElementsToSubscribeSection(this.model.products);
    }, 100);

    this.view.bindGetProductsByType(this.getProductsByType.bind(this));
    this.view.bindFilterProductsBy(this.sortProductsBy.bind(this));
    this.view.bindAddProductToCart(this.addProductToCart.bind(this));
  }

  private async getProductsByType(type: string): Promise<void> {
    await this.model.setAllProductsByType(type);
    await this.view.writeElementsToSubscribeSection(this.model.products);
  }

  private async sortProductsBy(filter: string): Promise<void> {
    this.model.sortProducts(filter as keyof Product);
    await this.view.writeElementsToSubscribeSection(this.model.products);
  }

  private async addProductToCart(product: Product): Promise<void> {
    await this.model.addProductToCart(product);
  }
}
