"use client";
import { useState } from "react";
import styles from "./order-by.module.scss";
import { ArrowDownIcon } from "../icons/arrow-down";
import { useFilterStore } from "core/hooks/useFilter/useFilter";
import { Order } from "core/types/order";

interface OrderOptionProps {
  label: string;
  onClick: () => void;
}

const OrderOption = ({ label, onClick }: OrderOptionProps) => (
  <li>
    <a
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(evt) => evt.code === "Enter" && onClick()}
    >
      {label}
    </a>
  </li>
);

export const OrderBy = () => {
  const [showModal, setShowModal] = useState(false);
  const { setOrder } = useFilterStore();

  const handleOptionClick = (order: Order) => {
    setOrder(order);
    setShowModal(false);
  };

  const orderOptions = [
    { order: Order.DEFAULT, label: "Featured" },
    { order: Order.ASC, label: "Price: Low to High" },
    { order: Order.DSC, label: "Price: High to Low" },
    { order: Order.RATING, label: "Avg. Customer Review" },
  ];

  return (
    <div className={styles["container"]}>
      <div
        className={styles["orderby"]}
        onClick={() => setShowModal(!showModal)}
        onKeyDown={(evt) => evt.code === "Enter" && setShowModal(!showModal)}
        role="button"
        tabIndex={0}
      >
        <span>Order by</span>
        <ArrowDownIcon />
      </div>
      {showModal && (
        <div className={styles["modal"]}>
          <ul>
            {orderOptions.map(({ order, label }) => (
              <OrderOption
                key={order}
                label={label}
                onClick={() => handleOptionClick(order)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
