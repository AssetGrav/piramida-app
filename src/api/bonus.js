const bonus = [];

if (!localStorage.getItem("bonus")) {
  localStorage.setItem("bonus", JSON.stringify(bonus));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("bonus")));
    }, 2000);
  });

export default {
  fetchAll,
};
