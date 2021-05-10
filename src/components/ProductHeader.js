import {FaSort} from 'react-icons/fa'

const ProductHeader = ({ sortProducts, flipSort }) => {

    const toggle = () => {
        var x = document.getElementById("filters");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    return(
        <div className="row topnav" id="product-header">
                <div className="col-6">
                    <span>
                        <b style={{fontSize:'20px'}}>Photography /&nbsp;</b>
                        <label style={{color:'#9B9B9B'}}>Premium Photos</label>
                    </span>     
                </div>
                <div className="col-6" id="toggle">
                    <span className="icon" onClick={() => toggle()} style={{float:'right'}}>
                        <i className="fa fa-bars"></i>
                    </span>
                </div>
                <div className="col-6" id="sort">
                    <div style={{float:'right'}}>
                        <span style={{color:'#656565', paddingRight:'3px'}}>
                            <FaSort onClick={() => flipSort()}/>
                            Sort By
                        </span>
                        <select onChange={(e) => sortProducts(e.target.value)}>
                            <option value="">none</option>
                            <option value="price">Price</option>
                            <option value="alphabet">Alphabetically</option>
                        </select>
                    </div>
                    
                </div>
            </div>
    )
}

export default ProductHeader