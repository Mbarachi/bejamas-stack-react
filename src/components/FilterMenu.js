import { useContext, useEffect, useState } from "react";
import productListContext from "../productListContext";

const FilterMenu = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [p20, setp20] = useState({ name: "0-20", checked: false });
  const [p20to100, setp20to100] = useState({ name: "20-100", checked: false });
  const [p100to200, setp100to200] = useState({
    name: "100-200",
    checked: false,
  });
  const [p200, setp200] = useState({ name: "200", checked: false });

  const refs = [p20, p20to100, p100to200, p200];

  const { productlist, manipulateProductlist } = useContext(productListContext);

  useEffect(() => {
    setAllProducts(productlist);
  }, []);

  const filterProducts = ({ checked, value }) => {
    let filteredCategories = [];
    if (!checked) {
      filteredCategories = categories.filter((category) => category !== value);
    } else {
      filteredCategories = [...categories, value];
    }
    setCategories(filteredCategories);

    const filteredProducts = getProductArrayByCategories(filteredCategories);

    manipulateProductlist([...filteredProducts]);
  };

  const getProductArrayByCategories = (filteredCategories) => {
    let filteredProducts = [];
    if (filteredCategories.length > 0) {
      allProducts.forEach((p) => {
        if (filteredCategories.includes(p.category)) {
          filteredProducts.push(p);
        }
      });
    } else {
      filteredProducts = allProducts;
    }
    return filteredProducts;
  };

  //   const filterProductsByprice = () => {
  //     manipulateProductlist([
  //       ...productlist.filter((product) => product.price < 20),
  //     ]);
  //   };

  const filterProductsByprice = (ref) => {
    for (let i = 0; i < refs.length; i++) {
      const { checked, name } = refs[i];
      if (name === ref.name) {
        checkFilterCheckBox(name, !checked);
        console.log(refs[i]);
      } else {
        checkFilterCheckBox(name, false);
      }
    }
    manipulateProductlist([
      ...allProducts.filter((product) =>
        getPriceRange(ref.name, parseInt(product.price))
      ),
    ]);
  };

  const checkFilterCheckBox = (name, bool) => {
    switch (name) {
      case p20.name:
        return setp20({ name, checked: bool });
      case p20to100.name:
        return setp20to100({ name, checked: bool });
      case p100to200.name:
        return setp100to200({ name, checked: bool });
      case p200.name:
        return setp200({ name, checked: bool });
      default:
        return (bool) => setp100to200({ name, checked: bool });
    }
  };

  const getPriceRange = (refVal, price) => {
    const range = refVal.split("-");
    if (range.length === 2) {
      return price >= range[0] && price < range[1];
    } else {
      return price > range[0];
    }
  };

  return (
    <div className="col-sm-3">
      
        <div id="filters">
            <b>Category</b>
            <br />
            <br />

            <div className="filter-check-box">
                <input
                className="form-check-input"
                type="checkbox"
                value="people"
                onChange={(e) => filterProducts(e.target)}
                />
                <label className="form-check-label">People</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                type="checkbox"
                value="premium"
                onChange={(e) => filterProducts(e.target)}
                />
                <label className="form-check-label">Premium</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                type="checkbox"
                value="pets"
                onChange={(e) => filterProducts(e.target)}
                />
                <label className="form-check-label">Pets</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                type="checkbox"
                value="food"
                onChange={(e) => filterProducts(e.target)}
                />
                <label className="form-check-label">Food</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                type="checkbox"
                value="landmarks"
                onChange={(e) => filterProducts(e.target)}
                />
                <label className="form-check-label">Landmark</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                type="checkbox"
                value="cities"
                onChange={(e) => filterProducts(e.target)}
                />
                <label className="form-check-label">Cities</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                type="checkbox"
                value="nature"
                onChange={(e) => filterProducts(e.target)}
                />
                <label className="form-check-label">Nature</label>
            </div>
            <hr id="hr-filter-menu" />

            <b>Price</b>
            <br />
            <br />

            <div className="filter-check-box">
                <input
                className="form-check-input"
                checked={p20.checked}
                type="checkbox"
                value="0-20"
                onChange={() => filterProductsByprice(p20)}
                />
                <label className="form-check-label">Lower than $20</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                checked={p20to100.checked}
                type="checkbox"
                value="20-100"
                onChange={() => filterProductsByprice(p20to100)}
                />
                <label className="form-check-label">$20 - $100</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                checked={p100to200.checked}
                type="checkbox"
                value="100-200"
                onChange={() => filterProductsByprice(p100to200)}
                />
                <label className="form-check-label">$100 - $200</label>
            </div>

            <div className="filter-check-box">
                <input
                className="form-check-input"
                checked={p200.checked}
                type="checkbox"
                value="200"
                onChange={() => filterProductsByprice(p200)}
                />
                <label className="form-check-label">More than $200</label>
            </div>
            <div className="row" id="filter-buttons" style={{paddingBottom: '15px'}}>
                <div className="col-sm-6" style={{display:'flex', justifyContent:'space-between'}}>
                    <button style={{width:'150px'}} type="button" className="btn btn-outline-secondary">Clear</button>
                    <button style={{width:'150px', color:'white', backgroundColor: 'black'}} type="button" className="btn btn-outline-secondary">Save</button>
                </div>
            </div>
        </div>
        
    </div>

  );
};

export default FilterMenu;
