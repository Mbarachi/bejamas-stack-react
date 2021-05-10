import {useState} from 'react'
import ReactPaginate from 'react-paginate'
import { useContext } from "react";
import productListContext from '../productListContext'


const ProductList = ({ addToCart }) => {

    const {productlist, manipulateProductlist} = useContext(productListContext); 

    const processImg = (image) => {
        if(image.src === undefined) {
            return image
        }
        return image.src;
    }

    const [pageNumber, setPageNumber] = useState(0)

    const productlistPerPage = 6
    const pagesVisited = pageNumber * 6
    

    const displayproductlist = productlist.slice(pagesVisited, pagesVisited + productlistPerPage).map(
        product => {
            return(
                <div className="col-sm-4" key={product.id}>
                    <div className="card">
                        <img src={processImg(product.image)} className="card-img-top" alt="..."/>
                        <button id="add-to-cart" onClick={() => addToCart(product.id)}>ADD TO CART</button>
                        {product.bestseller 
                            ? 
                            <b className="top-left-corner"
                            >Best Seller</b>
                        : ''}

                        {product.featured ? 
                            <b 
                                className="top-left-corner"
                                >Featured</b>
                        : ''}
                        </div>
                        <div className="row">
                            <div className="col-sm-12" style={{paddingBottom:'20px'}}>
                                <label style={{marginBottom:'0'}}>{product.category}</label><br/>
                                <b style={{fontSize:'20px'}}>{product.name}</b><br/>
                                <label>{'$'+product.price}</label>
                            </div>
                        </div>
                </div>
            )
        })
    
    const pageCount = Math.ceil(productlist.length / productlistPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return (
        <div className="col-sm-9">
            <div className="row">
               {displayproductlist}
               <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName = {"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
               />
            </div>
        </div>
       
    )
}

export default ProductList
