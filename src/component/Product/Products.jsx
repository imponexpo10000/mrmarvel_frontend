import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { Drawer } from "@material-ui/core";
import { BsFilterRight } from "react-icons/bs";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [drawerOpen, setdrawerOpen] = useState(false);

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, alert, error]);

  const applyFilter = () => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  };

  const filterBox = () => {
    return (
      <div className="filterBox">
        <p>Price</p>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />

        <p>Categories</p>
        <ul className="categoryBox">
          {categories.map((cat) => (
            // <li
            //   className="category-link"
            //   key={category}
            //   onClick={() => setCategory(category)}
            // >
            //   {category}
            // </li>
            <div>
              <input
                name="category"
                type={"checkbox"}
                value={cat}
                checked={cat === category}
                id={cat}
                onChange={() => setCategory(cat)}
              />
              <label htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </ul>

        <fieldset>
          <legend>Ratings Above</legend>
          <Slider
            color="var(--primary)"
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>

        <button onClick={applyFilter} className="applyFilter">
          Apply Filter{" "}
        </button>
      </div>
    );
  };

  return (
    <Fragment>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={() => setdrawerOpen(false)}
      >
        {filterBox()}
      </Drawer>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <div className="productsContainer">
            <div className="filter">{filterBox()}</div>
            <div className="products">
              <div className="header">
                <p className="medium-heading">Products</p>
              </div>
              <div className="items">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <h2> No Products Found :)</h2>
                )}
              </div>

              {resultPerPage < count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mb_filter">
            <span> Products</span>
            <button
              className="filter"
              onClick={() => setdrawerOpen(!drawerOpen)}
            >
              <span> Filter</span>
              <span>
                <BsFilterRight />
              </span>
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;