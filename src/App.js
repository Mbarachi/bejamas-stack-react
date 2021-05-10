import Header from "./components/Header";
import Header2 from "./components/Header-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HeroImage from "./components/Heroimage";
import About from "./components/About";
import ProductHeader from "./components/ProductHeader";
import FilterMenu from "./components/FilterMenu";
import ProductList from "./components/ProductList";
import cartContext from "./CartContext";
import { useState } from "react";
import { products } from "../src/assets/products";
import productListContext from "./productListContext";
import AddToCartMobileButton from "./components/AddToCartMobileButton";

function App() {
  const [value, setValue] = useState(0);
  const [cartlist, setCartlist] = useState([]);

  const [productlist, manipulateProductlist] = useState(products);
  const [list, filterList] = useState(products);

  const [selectedValue, setselectedValue] = useState("");
  const [status, setStatus] = useState(false);


  const addToCart = (id) => {
    products.forEach((x) => {
      if (id === x.id) {
        setValue(value + 1);
        setCartlist([...cartlist, x]);
      }
    });
  };

  //Sort Function by name
  const compareWithName = (a, b) => {
    // Using toUpperCase() to ignore character casing
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  };

  //Sort Function by price in Descending order
  const compareWithPrice = (a, b) => {
    return b.price - a.price;
  };

  const sortProducts = (value) => {
    if (value === "price") {
      setselectedValue("price");
      manipulateProductlist([...productlist.sort(compareWithPrice)]);
    } else if (value === "alphabet") {
      setselectedValue("alphabet");
      manipulateProductlist([...productlist.sort(compareWithName)]);
    }
  };

  const flipSort = () => {
    if (selectedValue === "price" && status === false) {
      manipulateProductlist([...productlist.sort(compareWithPrice)].reverse());
      setStatus(true);
    } else if (selectedValue === "price" && status) {
      manipulateProductlist([...productlist.sort(compareWithPrice)]);
      setStatus(false);
    } else if (selectedValue === "alphabet" && status === false) {
      manipulateProductlist([...productlist.sort(compareWithName)].reverse());
      setStatus(true);
    } else if (selectedValue === "alphabet" && status) {
      manipulateProductlist([...productlist.sort(compareWithName)]);
      setStatus(false);
    }
  };

  return (
    <div className="container">
      <cartContext.Provider value={{ value, cartlist, setCartlist, setValue }}>
        <productListContext.Provider
          value={{ productlist, manipulateProductlist }}
        >
          <Header />
          <hr id="hr"></hr>
          <Header2 />
          <HeroImage />
          <AddToCartMobileButton />
          <About />
          <hr id="hr"></hr>
          <ProductHeader sortProducts={sortProducts} flipSort={flipSort} />
          <div className="row images">
            <FilterMenu />
            <ProductList addToCart={addToCart} />
          </div>
        </productListContext.Provider>
      </cartContext.Provider>
    </div>
  );
}

export default App;
