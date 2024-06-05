import { LocalStorage } from "./../../ts/classes/LocalStorage,";
import { Cart } from "./../../ts/types/cart";
// Importing type 'product' for using :
import { Product } from "../../ts/types/product";

// Creating 'MainView' class for main view of web app :
export class MainView {
  // Creating field for 'body' :
  private body: HTMLBodyElement;

  // Creating field for 'main' :
  private main!: HTMLElement;

  // Methods that will be binded in controller side :
  private getProductsByType: (type: string) => Promise<void>;

  // Filter Products by :
  private filterProductsBy: (filterParam: string) => Promise<void>;

  // Adding products to cart :
  private addProductToCart: (product: Product) => Promise<void>;

  // Creating function that gets elements and writes to 'subscribe' section :
  public async writeElementsToSubscribeSection(
    products: Product[]
  ): Promise<void> {
    // Getting list from 'section 'to add items :
    const subscribe__list: HTMLElement = document.querySelector(
      ".subscribe1__products"
    ) as HTMLElement;

    subscribe__list.innerHTML = "";
    // Creating inner HTML of this list :
    products.forEach(async (p) => {
      const item: string = `
      <li class='product'>
        <i class="fa-solid fa-circle-plus product__add-cart"></i>
        <p class='product__isSale'>${p.sale}</p>
        <img class='product__image' src='${p.path}'>
        <h4 class='product__fullname'>${p.fullname}</h4>
        <div class='product__type-price'>
          <p class='product__type'>${p.type}</p>
          <p class='product__price'>${p.price}</p>
        </div>
      </li>
      `;

      // Inserting inner HTML to this list :
      subscribe__list.insertAdjacentHTML("beforeend", item);
    });

    // Adding event when pressed the add to cart button adds it to cart :
    const addCartButtons = document.querySelectorAll(".product__add-cart");
    addCartButtons.forEach(async (button) => {
      button.addEventListener("click", async () => {
        // Getting parent element :
        const parent: HTMLLIElement = button.parentElement as HTMLLIElement;

        // Getting all info about product :
        const img = parent.children[2] as HTMLImageElement;
        const src = img.src;

        const h4 = parent.children[3] as HTMLHeadingElement;
        const fullName: string = h4.textContent as string;

        const div = parent.children[4] as HTMLDivElement;

        const type: string = (div.firstElementChild as HTMLParagraphElement)
          .textContent as string;
        let price: string = (div.lastElementChild as HTMLParagraphElement)
          .textContent as string;

        price = price.replace("$", "");

        // Creating new product and adding it to cart :
        const newProduct: Product = {
          sale: "",
          type: type,
          price: parseFloat(price),
          fullname: fullName,
          path: src,
        };

        // Add this to cart and update cart view :
        await this.addProductToCart(newProduct);
      });
    });
  }

  // Define the main view of the web app :
  constructor() {
    this.getProductsByType = async () => {};
    this.filterProductsBy = async () => {};
    this.addProductToCart = async () => {};
    this.body = document.querySelector("body") as HTMLBodyElement;
    this.addHTML();
  }

  // Functions that adds HTML code to '.html' file :
  public async addHTML(): Promise<void> {
    await this.addHeader();
    await this.addMain();
    await this.addHeroSection();
    await this.addExploreSection();
    await this.addSubscribe1Section(); // <--- Clothes here
    await this.addZaraSection();
    await this.addProductsDiscountsSection();
    await this.addFooterLinks();
    await this.addFooter();
    await this.addEventsToSubscribe1Section(); // <--- Adding events to section's some children
    await this.addEventForAccount();
    await this.addEventForCart();
  }

  // Adding 'header'  :
  private async addHeader(): Promise<void> {
    const header: HTMLElement = document.createElement("header") as HTMLElement;
    header.className = "header";

    // Creating inside html of header :
    const insideOfHeader: string = `
    <div class='header__container'>
        <div class='header__logo'>
            <img width='31px' height='15px' src='./src/assets/images/header__img.png'>
            <h3 class='header__text'>coral</h3>
            <img width='31px' height='15px' src='./src/assets/images/header__img.png'>
        </div>
        <ul class='header__account-shopping'>
          <a id='account-link' href=#>Account</a>
          <a id='cart-link' href=#>Cart<span id='count-of-proudcts-in-cart'></span> </a>
        </ul>
    </div>

    <ul class='header__links'>
       <a class='header__link' href=#>Jewelry & Accessories</a>
       <a class='header__link' href=#>Clothing & Shoes</a>
       <a class='header__link' href=#>Home & Living</a>
       <a class='header__link' href=#>Wedding & Party</a>
       <a class='header__link' href=#>Toys & Entertainment</a>
       <a class='header__link' href=#>Art & Collectibles</a>
       <a class='header__link' href=#>Craft Supplies & Tools</a>
    </ul>`;
    header.insertAdjacentHTML("beforeend", insideOfHeader);

    // Appending 'header' inside to 'body' :
    this.body.append(header);
  }

  // Adding 'main' :
  async addMain(): Promise<void> {
    this.main = document.createElement("main") as HTMLElement;
    this.body.append(this.main);
  }

  // Creating function which adds 'hero' to 'body' :
  private async addHeroSection(): Promise<void> {
    // Creating section element as hero to add :
    const heroSection: HTMLElement = document.createElement("section");
    heroSection.className = "hero";

    // Creating HTML as string to insert it into section :
    const insideHero: string = `
    <div class='hero__container'>
      <div class='hero__embed-container'>
        <h1 class='hero__header'>collections</h1>
        <pre class='hero__paragraph'>you can explore ans shop many different collection

from various barands here.</pre>
        <button class='hero__button'>shop now</button>
      </div>
      <img src='./src/assets/images/hero_girl_img.png'>
      </div>
      <img class='hero__image i1' src='./src/assets/images/hero_img1.png'>
      <img class='hero__image i2' src='./src/assets/images/hero_img2.png'>
    `;

    // Inserting to 'hero' section :
    heroSection.insertAdjacentHTML("beforeend", insideHero);

    // Inserting hero to 'main' :
    this.main.append(heroSection);
  }

  // Creating function that adds explore section to UI  :
  private async addExploreSection(): Promise<void> {
    // Creating section element as explore to add :
    const exploreSection: HTMLElement = document.createElement("section");

    // Giving class name for design (sass) :
    exploreSection.className = "explore";

    // Adding some HTML item to 'explore' section :
    const insideExplore: string = `
    <ul class='explore__icon-list'>
      <img src='./src/assets/images/explore__b1.png'>
      <img src='./src/assets/images/explore__b2.png'>
      <img src='./src/assets/images/explore__b3.png'>
      <img src='./src/assets/images/explore__b4.png'>
      <img src='./src/assets/images/explore__b5.png'>
      </ul>
      <ul class='explore__clothings'>
        <img width='500px' height='530px' src='./src/assets/images/explore__w1.png'>
        <p class='explore__rotated-text'>Explore new and popular styles</p>
        <ul class='explore__clothings-small'>
          <img width='240px' src='./src/assets/images/explore__w2.png'>
          <img width='240px' src='./src/assets/images/explore__w3.png'>
          <img width='240px' src='./src/assets/images/explore__w4.png'>
          <img width='240px' src='./src/assets/images/explore__w5.png'>
        </ul>
      </ul>
        `;

    // Inserting HTML item to 'explore' section :
    exploreSection.insertAdjacentHTML("beforeend", insideExplore);

    // Insertion 'explore' section to main :
    this.main.append(exploreSection);
  }

  // Creating function that adds 1-st subscribe section to 'main' :
  private async addSubscribe1Section(): Promise<void> {
    // Creating subscribe section :
    const subscribe1Section: HTMLElement = document.createElement("section");

    // Giving class name to add design :
    subscribe1Section.className = "subscribe1";

    // Adding HTML item to it :
    const insideSubscribe1Section: string = `
      <h2 class='subscribe1__header'>Or subscribe to the newsletter</h2>
      <div class='subscribe1__links-filter'>
        <ul class='subscribe1__links'>
          <li>
            <a class='subscribe1__link all-p' href=#>All Products</a>
          </li>
          <li>
            <a class='subscribe1__link' href=#>T-Shirt</a>
          </li>
          <li>
            <a class='subscribe1__link' href=#>Hoodie</a>
          </li>
          <li>
            <a class='subscribe1__link' href=#>Jacket</a>
          </li>
        </ul>
        <select class='subscribe1__filter'>
          <option value='filter'>Filter</option>
          <option value='price'>Price</option>
          <option value='fullname'>Fullname</option>
          <option value='fullname'>Type</option>
        </select>
      </div>
      <ul class='subscribe1__products'>
      </ul>`;

    // Inserting HTML item to 'section' :
    subscribe1Section.insertAdjacentHTML("beforeend", insideSubscribe1Section);

    // Inserting 'section' to 'main' :
    this.main.append(subscribe1Section);
  }

  // Creating function thad adds 'zara' section to 'main' :
  private async addZaraSection(): Promise<void> {
    // Creating 'zara' section :
    const zaraSection: HTMLElement = document.createElement("section");

    // Giving class name for design :
    zaraSection.className = "zara";

    // Items for section :
    const zaraItems: string = `
      <img class='zara__bg' src='./src/assets/images/zara_bg.png'>
      <img class='zara__logo' src='./src/assets/images/zara_logo.png'>
      <img class='zara__logo2' src='./src/assets/images/zara_logo2.png'>
      <div class='zara__container'>
        <pre class='zara__text'>
Lustrous yet understated. The new evening
wear collection exclusively offered at the
reopened Giorgio Armani boutique in Los
Angeles.</pre>
        <button class='zara__button'>see collection</button>
      </div>
    `;

    // Adding items to 'zara' - section :
    zaraSection.insertAdjacentHTML("beforeend", zaraItems);

    // Adding 'zara' section to main :
    this.main.append(zaraSection);
  }

  // Creating function that adds 'products-discounts' section to 'main' :
  private async addProductsDiscountsSection(): Promise<void> {
    // Creating 'products-discounts' section :
    const productsDiscountsSection: HTMLElement =
      document.createElement("section");

    // Adding class for design :
    productsDiscountsSection.className = "products-discounts";

    // Creating inner HTML for 'producsts-discounts' section :
    const productsDiscountsInnerHtml: string = `
    <h2 class='products-discounts__header1'>Follow products and discounts on Instagram</h2>
    <ul class='products-discounts__images'>
      <li><img class='products-discounts__img' src='./src/assets/images/pd_img1.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/pd_img2.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/pd_img3.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/pd_img4.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/pd_img5.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/pd_img6.png'></li>
    </ul>
    <h2 class='products-discounts__header2'>Or subscribe to the newsletter</h2>
    <form class='products-discounts__form'>
      <input class='products-discounts__email' placeholder='Email address...'>
      <button class='products-discounts__button'>SUBMIT</button>
    </form>
    `;

    // Adding this HTML to 'products-discounts' section :
    productsDiscountsSection.insertAdjacentHTML(
      "beforeend",
      productsDiscountsInnerHtml
    );

    // Adding this section to 'main' :
    this.main.append(productsDiscountsSection);
  }

  private async addFooterLinks(): Promise<void> {
    // Creating 'footer-links' section :
    const footerLinksSection: HTMLElement = document.createElement("section");

    // Adding class for design :
    footerLinksSection.className = "footer-links";

    // Creating inner HTML for 'footer-links' section :
    const footerLinksInnerHtml: string = `
    <ul class='footer-links__list'>
      <div class='footer-links__left-footer'>
        <div class='footer-links__header'>
          <img class='footer-links__img' src='./src/assets/images/header__img.png'>
          <p>coral</p>
          <img class='footer-links__img' src='./src/assets/images/header__img.png'>
        </div>
        <pre class='footer-links__paragraph'>
Lorem ipsum dolor sit amet, consectetur adipiscing
elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua
        </pre>
      </div>
      <ul class='footer-menu'>
        <li class='footer-menu__header'>catalog</li>
        <li class='footer-menu__item'>Necklaces</li>
        <li class='footer-menu__item'>Hoodies</li>
        <li class='footer-menu__item'>Jewelry Box</li>
        <li class='footer-menu__item'>t-shirt</li>
        <li class='footer-menu__item'>Jacket</li>
      </ul>
      <ul class='footer-menu'>
        <li class='footer-menu__header'>about us</li>
        <li class='footer-menu__item'>Our Producers</li>
        <li class='footer-menu__item'>Sitemap</li>
        <li class='footer-menu__item'>FAQ</li>
        <li class='footer-menu__item'>About Us</li>
        <li class='footer-menu__item'>Terms & Conditions</li>
      </ul>
      <ul class='footer-menu'>
        <li class='footer-menu__header'>customer services</li>
        <li class='footer-menu__item'>Contact Us</li>
        <li class='footer-menu__item'>Track Your Order</li>
        <li class='footer-menu__item'>Product Care & Repair</li>
        <li class='footer-menu__item'>Book an Appointment</li>
        <li class='footer-menu__item'>Shipping & Returns</li>
      </ul>
    </ul>
    `;

    // Adding this HTML to section :
    footerLinksSection.insertAdjacentHTML("beforeend", footerLinksInnerHtml);

    // Adding 'section' to 'main' :
    this.main.append(footerLinksSection);
  }

  // Creating 'section' for footer of the site :
  private async addFooter(): Promise<void> {
    // Creating 'footer' element for adding 'main' :
    const footer: HTMLElement = document.createElement("footer");

    // Adding class name to 'footer' for design :
    footer.className = "footer";

    // Creating inner HTML for 'footer' :
    const footerInner: string = `
    <p class='footer__text'>© 2022 Coral , Inc.</p>
    <img class='footer__image' src='./src/assets/images/payments.png'>
    <p class='footer__text'>Scroll To Top</p>
    `;

    // Adding inner to 'footer' :
    footer.insertAdjacentHTML("beforeend", footerInner);

    // Adding 'footer' to body :
    this.body.append(footer);
  }

  // Binding function :
  public async bindGetProductsByType(
    handler: (type: string) => Promise<void>
  ): Promise<void> {
    this.getProductsByType = handler;
  }

  public async bindFilterProductsBy(
    handler: (filterProp: string) => Promise<void>
  ): Promise<void> {
    this.filterProductsBy = handler;
  }

  public async bindAddProductToCart(
    handler: (product: Product) => Promise<void>
  ): Promise<void> {
    this.addProductToCart = handler;
  }

  private async addEventsToSubscribe1Section(): Promise<void> {
    // Adding some events to links :
    const list: HTMLUListElement = document.querySelector(
      ".subscribe1__links"
    ) as HTMLUListElement;
    const links = list.children;
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", (e) => {
        e.preventDefault();
        const element = links[i] as HTMLLIElement;
        this.getProductsByType(element.textContent as string);
      });
    }

    // Adding event to filter button :
    const filterButton: HTMLSelectElement = document.querySelector(
      ".subscribe1__filter"
    ) as HTMLSelectElement;
    filterButton.addEventListener("change", (e) => {
      const select: HTMLSelectElement = e.currentTarget as HTMLSelectElement;
      const selectedItemText: string = (
        select.options[select.selectedIndex].textContent as string
      ).toLocaleLowerCase();
      this.filterProductsBy(selectedItemText);
    });
  }

  // Adding event to 'account' link :
  public async addEventForAccount(): Promise<void> {
    // Switching of scroll bar of 'body' :
    this.body.style.overflow = "auto";

    // Getting element from dom :
    const accountLink: HTMLAnchorElement = document.querySelector(
      "#account-link"
    ) as HTMLAnchorElement;

    // Adding event when it's clicked :
    accountLink.addEventListener("click", async (e) => {
      // Preventing default functions :
      e.preventDefault();

      // Switching off the scroll-bar :
      this.body.style.overflow = "hidden";

      // Creating module window for body :
      const moduleWindow: HTMLDivElement = document.createElement("div");

      // Adding class name for some design :
      moduleWindow.className = "module-window";

      // Adding content for 'module-window' :
      const content: HTMLDivElement = document.createElement("div");

      // Adding class name to 'content' for design :
      content.className = "module-content animate__animated animate__fadeIn";

      // Creating inside item for container :
      const insideContent: string = `
      <i class="fa-solid fa-xmark"></i>
      <h2 class='module-content__header'>Log in to your account</h2>
      <ul class='module-content__icons'>
        <li class='module-content__icon'>
          <img width='50px' height='50px' src='./src/assets/images/logos/fb_logo.png'>
        </li>
        <li class='module-content__icon'>
          <img width='50px' height='50px' src='./src/assets/images/logos/twitter_logo.png'>
        </li>
        <li class='module-content__icon'>
          <img width='50px' height='50px' src='./src/assets/images/logos/yahoo_logo.png'>
        </li>
        <li class='module-content__icon'>
          <img width='50px' height='50px' src='./src/assets/images/logos/amazon_logo.png'>
        </li>
      </ul>
      <input id='module-content__email' placeholder='  Email address'>
      <input id='module-content__password' placeholder='  Password'>
      <button class='module-content__button'>log in</button>
      <a class='module-content__forgotpass' href=#>Forgot password ?</a>
      <a class='module-content__signup' href=#>No account? Sign up</a>
      `;

      // Adding inner HTML to content :
      content.insertAdjacentHTML("beforeend", insideContent);

      // Adding 'content' to 'module-window' :
      moduleWindow.appendChild(content);

      // Adding some event to 'module-window' :
      moduleWindow.addEventListener("click", (e) => {
        // Checking if the target is the module window itself :
        if (
          e.target == moduleWindow ||
          (e.target as HTMLElement).tagName == "I"
        ) {
          setTimeout(() => {
            content.classList.remove("animate__fadeIn");
            content.classList.add("animate__fadeOutUp");
          }, 0);
          setTimeout(() => {
            this.body.style.overflow = "auto";
            moduleWindow.remove();
          }, 1000);
        }
      });

      // Adding this module window to 'main' :
      this.main.append(moduleWindow);
    });
  }

  // Adding event to 'cart' link :
  public async addEventForCart(): Promise<void> {
    // Getting element from dom :
    const cartLink: HTMLAnchorElement = document.querySelector(
      "#cart-link"
    ) as HTMLAnchorElement;

    // Adding event when it's clicked :
    cartLink.addEventListener("click", async (e) => {
      e.preventDefault();

      this.body.style.overflow = "hidden";

      // creating 'cart' window for body :
      const cartWindow: HTMLDivElement = document.createElement("div");

      // Adding class name for design :
      cartWindow.className = "module-window";

      // Creating content of module :
      const cartContent: HTMLDivElement = document.createElement("div");

      // Adding class name for design :
      cartContent.className = "cart-content";

      // Inserting inner HTML to cart content :
      const insideCart: string = `
      <div class='cart-content'>
       <div class='cart-content__c1'>
        <p class='cart-content__paragraph'>coral</p>
        <i class='fa-solid fa-remove cart-content__close'></i>
       </div>
       <p class='cart-content__paragraph2'>You are eligible for free shipping!</p>
       <ul class='cart-content__products'>
       </ul>
       <div class='cart-content__footer'>
          <p class='cart-content__ordernote'>Add Order Note</p>
          <p class='cart-content__shipping'>Shipping & taxes calculated at checkout</p>
          <button class='cart-content__btn'>Checkout   -   $<span class='cart-content__totalcost'></span></button>
       </div>
      </div
      `;

      // Adding inner HTML to cart :
      cartContent.insertAdjacentHTML("beforeend", insideCart);

      // Adding class to cart content for design :
      cartContent.className =
        "cart-content animate__animated animate__slideInRight";

      // Adding content to cart :
      cartWindow.append(cartContent);

      // Adding event to container :
      cartWindow.addEventListener("click", (e) => {
        if (
          e.target == cartWindow ||
          (e.target as HTMLElement).tagName == "I"
        ) {
          setTimeout(() => {
            cartContent.classList.remove("animate__slideInRight");
            cartContent.classList.add("animate__slideOutRight");
          }, 0);
          setTimeout(() => {
            this.body.style.overflow = "auto";
            cartWindow.remove();
          }, 1000);
        }
      });

      // Adding container to 'main' :
      this.main.append(cartWindow);

      // Adding products from local storage :
      await this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
    });
  }

  public async updateCartView(cart: Cart[]) {
    const totalCost: HTMLSpanElement = document.querySelector(
      ".cart-content__totalcost"
    ) as HTMLSpanElement;

    let sum = 0;

    // Get Total cost of products  :
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].count * cart[i].product.price;
    }

    totalCost.textContent = LocalStorage.getTotalCost().toString();

    const listOfProducts: HTMLUListElement = document.querySelector(
      ".cart-content__products"
    ) as HTMLUListElement;
    listOfProducts.innerHTML = "";
    cart.forEach((c, index) => {
      const i = `
    <li class='cart-content__product'>
      <img src='${c.product.path}' class='cart-content__product-image'>
      <div class='cart-content__product-info'>
        <p class='cart-content__product-name'>${c.product.fullname}</p>
        <p class='cart-content__product-price'>$${c.product.price}</p>
        <div class='cart-content__increase-decrease-remove'>
          <div class='cart-content__increase-decrease'>
            <b id='d${index}' class="fa-solid fa-minus"></b>
            <p class='cart-content__count'>${c.count}</p>
            <b id='i${index}' class="fa-solid fa-plus"></b>
          </div>
          <a id='r${index}' class='cart-content__remove' href=#>Remove</a>
       </div>
      </div>
   </li>`;
      listOfProducts.insertAdjacentHTML("beforeend", i);

      const removeLink = document.querySelector(`#r${index}`);
      const increaseBtn = document.querySelector(`#i${index}`);
      const decreaseBtn = document.querySelector(`#d${index}`);

      // Adding events to them :
      removeLink?.addEventListener("click", (e) => {
        e.preventDefault();
        LocalStorage.removeProductFromLocalStorage(index);
        this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
      });

      increaseBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        LocalStorage.increaseProductCount(index);
        this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
      });

      decreaseBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        LocalStorage.decreaseProductCount(index);
        this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
      });
    });
  }
}
