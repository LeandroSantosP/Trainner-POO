import { Client } from "../Client/Client";
import { ProductCategory } from "../Product/interface/ProductContract";
import { Product } from "../Product/Product";
import { CompanyContract, sellingInput } from "./interface/CompanyContract";

interface ObjValidation {
  products: Product[];
  totalDiscount: number;
  haveErros: boolean;
}

export class Company implements CompanyContract {
  private readonly _clients: Client[] = [];
  private readonly _products: Product[] = [];
  private _totalCash: number = 0;

  constructor(public readonly name: string, public readonly own: string) {}

  RegisterClient(Client: Client): void {
    this._clients.push(Client);
  }

  RegisterProduct(...products: Product[]): void {
    products.forEach((product) => this._products.push(product));
  }

  removeProduct(product: Product): void | false {
    const indexForDelete = this._products.indexOf(product);

    if (indexForDelete === -1) return false;
    this._products.splice(indexForDelete, 1);
  }

  private addDiscount(product: Product, productsForSelling: ObjValidation) {
    const { category } = product.getProductInfos;
    if (category.includes(ProductCategory.DRINK)) {
      productsForSelling.totalDiscount += 1;
    } else if (category.includes(ProductCategory.ELECTRONICS)) {
      productsForSelling.totalDiscount += 2;
    } else if (category.includes(ProductCategory.FOOD)) {
      productsForSelling.totalDiscount += 2;
    }
  }

  get balense() {
    return {
      totalCash: this._totalCash,
      productStoke: this._products,
      clients: this._clients,
    };
  }

  selling(params: sellingInput): boolean {
    let productsForSelling = {
      products: [] as Product[],
      totalDiscount: 0,
      haveErros: false,
    } as ObjValidation;

    const client = this._clients.find(
      (currentClient) => currentClient.getCredentials.id === params.clientId
    );

    params.productId.forEach((id) => {
      const isClientCompany = this._clients.find((client) => {
        const { id } = client.getCredentials;

        return id;
      });

      const product = this._products.find((product) => {
        return product.getProductInfos.id === id;
      });

      if (!product) {
        productsForSelling.haveErros = true;
        return;
      }

      productsForSelling.products.push(product);

      if (isClientCompany) {
        this.addDiscount(product, productsForSelling);
      }
    });

    if (!client) {
      return false;
    }
    if (productsForSelling.haveErros) {
      return false;
    }

    let totalPrice = 0;

    productsForSelling.products.forEach((product) => {
      const {
        getProductInfos: { price },
      } = product;
      totalPrice += price;
      const res = this.removeProduct(product);
      client.setNewProduct = product;

      if (res === false) {
        return false;
      }
    });

    client.removeCash(totalPrice, (cash) => {
      const currentSalt = cash;

      return currentSalt.toString();
    });
    this._totalCash += totalPrice;
    return true;
  }
}
