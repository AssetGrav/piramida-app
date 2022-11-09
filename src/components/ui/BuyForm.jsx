import React, { useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import { validator } from "../../utils/validator";
import PropTypes from "prop-types";
import { useProduct } from "../../hook/useProduct";
import { v4 as uuidv4 } from "uuid";

function BuyForm({ product, userId }) {
  const [data, setData] = useState({
    quantaty: 0,
    total: 0,
  });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const { buyProduct, bonus, pushBonus } = useProduct();
  const [dataUpgrade, setDataUpgrade] = useState(false);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    if (data.quantaty === 0) {
      setDataUpgrade(true);
    }
    setEnterError(null);
  };
  const validatorConfig = {
    quantaty: {
      isContainDigit: {
        message: "Только цифры",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    setData({ ...data, total: data.quantaty * product.price });
  }, [dataUpgrade]);

  function mathBonus(sum, level) {
    let num = 0;
    if (level === 1) {
      num = sum * 0.05;
    }
    if (level === 2) {
      num = sum * 0.07;
    }
    if (level === 3) {
      num = sum * 0.1;
    }
    return Math.round(num);
  }
  function bonusForLevel(levels, total, buyerId) {
    const newLevels = levels.map((elem) => {
      return {
        _id: "prod" + uuidv4(),
        for_user_id: elem._id,
        level: elem.level,
        from_user_id: buyerId,
        bonus: mathBonus(total, elem.level),
      };
    });
    console.log("newLevel", newLevels);
    return newLevels;
  }
  console.log("func", bonusForLevel(userId.levelList, data.total, userId._id));
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("curentUser", userId.levelList, data.total, userId._id, bonus);
    const isValid = validate();
    if (!isValid) return;
    try {
      buyProduct(product, data);
      pushBonus(bonusForLevel(userId.levelList, data.total, userId._id));
    } catch (error) {
      setEnterError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row">
        <div className="w-20">Цена</div>
        <div>{product.price}</div>
      </div>
      <div className="flex flex-row">
        <div className="w-20">кол-во</div>
        <TextField
          name="quantaty"
          value={data.quantaty}
          onChange={handleChange}
          error={errors.quantaty}
          className="w-20"
        />
      </div>
      <div className="flex flex-row">
        <div className="w-20">Итого</div>
        <div>{data.total}</div>
      </div>
      {enterError && <p className="text-red-500">{enterError}</p>}
      <button
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        type="submit"
        disabled={!isValid || enterError}
      >
        Оплатить
      </button>
    </form>
  );
}

BuyForm.propTypes = {
  product: PropTypes.object,
  userId: PropTypes.object,
};

export default BuyForm;
