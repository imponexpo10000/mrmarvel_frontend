import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { sections } = useSelector((state) => state.categories);
  return (
    <div className="header">
      <div className="top">
        <div className="left">qrqrq</div>
        <div className="center">
          <Link to={"/"} className="logo">
            <img
              src="https://res.cloudinary.com/mr-marvel/image/upload/v1652368687/layouts/2_FIBZ_profile_ig-removebg-preview_abdihd.png"
              alt=""
            />
          </Link>
        </div>
        <div className="right">
          <Link to="/cart">
            <AiOutlineShoppingCart />
            <span>Cart</span>
          </Link>
          <Link to="/account">
            <BiUserCircle />

            <span>Sign in</span>
          </Link>
        </div>
      </div>
      <div className="bottom">
        <div className="links">
          {sections.map((section) => (
            <Link to={"/"}>
              <span>{section.name}</span>
              <div className="megaMenu"></div>
            </Link>
          ))}
          <Link to={"/"}>
            <span>Home</span>
            <div className="megaMenu"></div>
          </Link>
          <Link to={"/products"}>Shop</Link>
          <Link to={"/about"}>About Us</Link>
          <Link to={"/contact"}>Contuct Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
