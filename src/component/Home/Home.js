import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import HomeSlider from "./HomeSlider";
import ProductsCard from "./ProductsCard";
import ProductsCarousel from "./ProductsCarousel";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <HomeSlider />

          <ProductsCard to="/products" items={products} title="Featured Product" />
          {/* <ProductsCarousel items={products} title={"On Sale Products"} /> */}

          <ProductsCard to="/products" items={products} title="Best selling Products" />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
