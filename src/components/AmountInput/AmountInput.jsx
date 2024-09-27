/** @format */

import styles from "./AmountInput.module.css";

export function AmountInput({ amount, setAmount, id = null, callback }) {
  function handleChangeAmount(value) {
    callback ? callback() : "";
    if (value < 1 || value > 20) setAmount(1);
    else setAmount(value);
  }

  return (
    <div className={styles.amountInput}>
      <button onClick={() => handleChangeAmount(amount - 1)}>-</button>
      <input
        id={id}
        type="numder"
        min={1}
        step={1}
        value={amount}
        onChange={(e) => handleChangeAmount(Number(e.target.value))}></input>
      <button onClick={() => handleChangeAmount(amount + 1)}>+</button>
    </div>
  );
}
