class Product {
    constructor(
        public id: string,
        public name: string,
        public price: Price
    ) {}

    changeName(newName: string) {
        this.name = newName;
    }

    changePrice(newPrice: Price) {
        this.price = newPrice;
    }
}