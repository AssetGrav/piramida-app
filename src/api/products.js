const products = [
  {
    _id: "1",
    name: "apple",
    image:
      "https://m.dom-eda.com/uploads/images/catalog/item/86df51de21/c25c94fe96_1000.jpg",
    description: "about apple write",
    price: 2000,
    quantaty: 10,
  },
];

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("products")));
    }, 2000);
  });

const update = (id, data) =>
  new Promise((resolve) => {
    const products = JSON.parse(localStorage.getItem("products"));
    const productIndex = products.findIndex((u) => u._id === id);
    products[productIndex] = { ...products[productIndex], ...data };
    localStorage.setItem("products", JSON.stringify(products));
    resolve(products[productIndex]);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("products")).find(
          (user) => user._id === id
        )
      );
    }, 1000);
  });
export default {
  fetchAll,
  getById,
  update,
};
