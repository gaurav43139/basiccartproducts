import { useState } from "react";
import "./styles.css";

export default function App() {
  const data = [
    { name: "ITC", price: 20, isSelected: false, "24hdata": 10 },
    { name: "TCS", price: 30, isSelected: false, "24hdata": -10 },
    { name: "Paytm", price: 40, isSelected: false, "24hdata": -20 },
  ];

  const [newData, setNewData] = useState(data);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [twentyFour, setTwentyFour] = useState(false);
  function handleChange(e) {
    setSearch((prev) => e.target.value);
    const filteredData = data.filter((item) => item.name.includes(search));
    setNewData(filteredData);
  }

  // const filteredData = data.filter((item) => item.name.includes(search));
  // console.log(filteredData);

  function handleClick(item) {
    const newwData = newData.map((it, idx) => {
      if (it.name === item.name) {
        return { ...it, isSelected: !item.isSelected };
      } else {
        return it;
      }
    });
    setNewData(newwData);
    const newCartData = newwData.filter((item, idx) => {
      if (item.isSelected) {
        return item;
      }
    });
    console.log(newCartData, "nn");
    setCart(newCartData);
    //setCart((prev) => [...prev, item]);
  }
  function handleVisibility(e) {
    setIsVisible((prev) => !prev);
  }
  function handle24HChange(e) {
    setTwentyFour((prev) => !prev);
  }
  console.log(newData, "newData");
  console.log(cart, "c");
  console.log(isVisible, "setIsVisible");
  return (
    <div className="App">
      <h1>Stocks SIP</h1>
      <div className="search">
        <input type="text" onChange={(e) => handleChange(e)} value={search} />
      </div>
      <div className="product">
        {newData.map((item, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: item.isSelected === true ? "blue" : "" }}
            onClick={(e) => handleClick(item)}
          >
            {item.name} {item.price}{" "}
            <span style={{ color: item["24hdata"] > 0 ? "green" : "red" }}>
              {twentyFour && `${item["24hdata"]}%`}
            </span>
          </div>
        ))}
      </div>
      <div className="cart">
        <button onClick={(e) => handleVisibility(e)}>
          Click for Cart Details
        </button>

        <button onClick={(e) => handle24HChange(e)}>Click for 24H data</button>

        {isVisible && (
          <div className="cartitems">
            {cart.map((item, idx) => (
              <div>
                {item.name} {item.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
