class RandomId {
  constructor(readonly id = Math.floor(Math.random() * 1000).toString()) {}
}

class Person {
  readonly id: string;
  constructor(private name: string, private readonly age: number) {
    this.id = new RandomId().id;
  }

  getCredential() {
    return {
      name: this.name,
      age: this.age,
    };
  }
}

class Client extends Person {
  ownProducts: Product[] = [];
  constructor(name: string, age: number, private credit: number) {
    super(name, age);
  }

  set updatedCredits(value: number) {
    this.credit = value;
    return;
  }

  getPersonInfos() {
    const result = this.getCredential();
    return {
      ...result,
      id: this.id,
      credit: this.credit,
    };
  }

  addMyOwnProduct(prod: Product) {
    this.ownProducts.push(prod);
  }
}

class Product {
  public id: string = new RandomId().id;
  public unity: number;
  private quality: number;
  private name: string;
  private price: string;

  constructor(name: string, quality: number, price: string, unity: number) {
    this.unity = unity;
    this.price = price;
    this.name = name;
    this.quality = quality;
  }

  set updatedUnity(newUnity: number) {
    this.unity = newUnity;
    return;
  }

  infos() {
    return {
      name: this.name,
      quantity: this.quality,
      price: this.price,
      quality: this.quality,
      unity: this.unity,
    };
  }
}

class Company {
  private readonly clients: Client[] = [];
  private readonly products: Product[] = [];
  private static totalCash: number = 0;

  constructor(
    private readonly name: string,
    private readonly own: string,
    private caixa: string = ""
  ) {}

  addProduct(productForAdd: Product[]) {
    productForAdd.forEach((client) => {
      this.products.push(client);
    });
    return;
  }

  addNewClient(clientForAdd: Client) {
    this.clients.push(clientForAdd);
    return;
  }

  private updatedUnity(productID: string, quantity: number) {
    this.products.find((prod) => {
      if (prod.id !== productID) {
        return;
      }
      prod.updatedUnity = prod.unity - quantity;
    });
  }

  sell(productID: string, quantityUnity: number, clientId: string) {
    const cart = Array.from({ length: quantityUnity }).map((_) => {
      let product = this.products.find((props) => props.id === productID);
      const { unity } = product!.infos();

      if (unity < quantityUnity) {
        throw new Error("Stoke is lower.");
      }

      return product;
    });

    if (cart === undefined || cart === null) {
      throw new Error("Product not found.");
    }

    const totalPrice = cart.reduce((storage, current) => {
      if (!current) {
        return storage;
      }
      let { price } = current.infos();
      const [priceGetter, _] = price.split("R$");
      const priceFormate = priceGetter.trim().replace(",", ".");
      return (storage += Number(priceFormate));
    }, 0);

    const client = this.clients.find((client) => {
      const { id } = client.getPersonInfos();
      return id === clientId;
    });

    if (client) {
      const { credit, name } = client?.getPersonInfos();
      if (credit < totalPrice) {
        throw new Error(
          `Client ${name}, you don't have money for this buys, sorry.`
        );
      }
      this.caixa = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((Company.totalCash += totalPrice));
      cart.forEach((prod) => {
        client.addMyOwnProduct(prod!);
      });

      this.updatedUnity(productID, quantityUnity);
    }
  }

  getBalense() {
    const clients = this.clients.map((client) => client.getCredential());

    return {
      CompanyName: this.name,
      own: this.own,
      caixa: this.caixa,
      companyClients: clients,
      productStoke: this.products.map((prod) => {
        return prod.infos();
      }),
    };
  }
}

class Main {
  private readonly productsForRegister = [] as Product[];
  constructor(private readonly company: Company) {}

  addProductsToCompany(products: Product[]) {
    products.forEach((prod) => {
      this.productsForRegister.push(prod);
    });
    this.company.addProduct(this.productsForRegister);
  }

  addClientNew(client: Client) {
    this.company.addNewClient(client);
  }

  selling(productID: string, quantity: number, clientId: string) {
    this.company.sell(productID, quantity, clientId);
  }

  get companyBalense() {
    return this.company.getBalense();
  }
}

const company = new Company("Pão de açúcar", "Leandro");

const newAirSoft = new Product("airSoft", 100, "199,99 R$", 2);
const bike = new Product("bike", 100, "2,99 R$", 7);
const patins = new Product("patins", 70, "1,99 R$", 100);

const start = new Main(new Company("Pao de acuação", "Leandro"));

start.addProductsToCompany([newAirSoft, bike, patins]);
const joão = new Client("Maria", 21, 200);
const maria = new Client("Maria", 11, 200);

start.addClientNew(joão);
start.addClientNew(maria);
start.selling(bike.id, 7, joão.id);
start.selling(patins.id, 8, joão.id);

console.log(start.companyBalense);
