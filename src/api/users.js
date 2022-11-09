const users = [
  {
    _id: "1",
    name: "Calvin Hawkins",
    email: "417051@mail.ru",
    password: "Aa123456",
    licence: true,
    levelList: [],
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    _id: "2",
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    password: "Aa123456",
    licence: true,
    levelList: [{ _id: "1", level: 1, value: "", bonus: 0 }],
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    _id: "3",
    name: "Ted Fox",
    email: "ted.fox@example.com",
    password: "Aa123456",
    licence: true,
    levelList: [
      { _id: "1", level: 1, value: "", bonus: 0 },
      { _id: "2", level: 2, value: "", bonus: 0 },
    ],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    _id: "4",
    name: "Grey Bolt",
    email: "bolt.hawkins@example.com",
    password: "Aa123456",
    licence: true,
    levelList: [
      { _id: "1", level: 1, value: "", bonus: 0 },
      { _id: "2", level: 2, value: "", bonus: 0 },
      { _id: "3", level: 3, value: "", bonus: 0 },
    ],
    image:
      "https://i.pinimg.com/736x/b3/a6/32/b3a632a5547d22c553075514add449db.jpg",
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("users")));
    }, 2000);
  });

const update = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex((u) => u._id === id);
    users[userIndex] = { ...users[userIndex], ...data };
    localStorage.setItem("users", JSON.stringify(users));
    resolve(users[userIndex]);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("users")).find(
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
