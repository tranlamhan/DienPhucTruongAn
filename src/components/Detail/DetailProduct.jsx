import React, { useState } from "react";
import { Row } from "react-bootstrap";
import CardMain from "../Card/CardMain";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsPlusLg, BsGiftFill } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";
import "./Detail.css";
import DetailInfor from "./DetailInfor";
import ModalVideo from "../Modal/ModalVideo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { productService } from "../../service/product.service";
import { Link } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { useAuth } from "../AuthContext/index";

export default function DetailProduct() {
  //Lấy thông tin sản phẩm
  const params = useParams();
  // const [product, setProduct] = useState({});
  const { loadingData, data: product } = useFetch(() => {
    return productService.getProductById(params.id);
  });
  // useEffect(() => {
  //   const fetch = () => {
  //     if (_product && !loadingData) {
  //       setProduct(_product.data.metadata);
  //     }
  //   };
  //   fetch();
  // },[]);

  const { loadingImage, data: listImage } = useFetch(() => {
    return productService.getProductImage(params.id);
  });

  //List type product
  const { loadingLevelProduct, data: listProduct } = useFetch(() => {
    return productService.getAllProducts();
  });
  var arrLevel = [];
  if (!loadingLevelProduct) {
    arrLevel = listProduct?.data.metadata.filter(
      (item) => item.category_id === product.category_id
    );
  }

  // //Increment & Decrement INPUT QUANTITY
  const [count, setCount] = useState(1);
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    if (count < 99) setCount(count + 1);
  };

  //Handle button copy
  const [textCopy, setTextCopy] = useState("Sao chép");
  const changeTextBtnCopy = () => {
    navigator.clipboard.writeText("FREESHIP");
    setTextCopy("Đã lưu");
    setTimeout(() => {
      setTextCopy("Sao chép");
    }, 1500);
  };

  //Add to cart
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { user } = useAuth();
  const { execute: addCart } = useAsync(productService.createAddCart);

  const addToCart = async () => {
    try {
      const field = {
        product_id: params.id,
        quantity: count,
        user_id: user.id,
      };
      await addCart(field);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công", toastOptions);
    } catch (error) {
      console.log(error);
      toast.error(
        "Bạn chưa đăng nhập . Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng",
        toastOptions
      );
    }
  };

  if (loadingData && loadingImage) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <ToastContainer />
      <CardMain>
        <Row>
          <div className="col-12 flex items-center gap-2">
            <h1 className="font-bold mb-2 text-[1.1em]">
              {product?.data.metadata.product_name}
            </h1>
          </div>
          <Row>
            <div className="col-lg-4 col-tb-5 col-tbs-12 relative image-slick">
              <ModalVideo />
              <Carousel
                showThumbs={true}
                showIndicators={false}
                swipeable={true}
                useKeyboardArrows={true}
                showArrows={true}
                showStatus={false}
              >
                {listImage ? (
                  listImage.data.metadata.map((item, index) => (
                    <img src={item.image_base64} alt="" key={index} />
                  ))
                ) : (
                  <img src="" alt="" />
                )}
              </Carousel>
            </div>
            <div className="col-lg-5 col-tb-7 col-tbs-12">
              <span className="font-bold text-[1.5em] text-[var(--mainColor)]">
                {Number(product?.data.metadata.product_price)
                  .toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                <span>₫</span>
              </span>
              <div className="flex flex-wrap mt-[15px] gap-2">
                {arrLevel?.map((item, index) => (
                  <a
                    className={
                      item?.product_id === product?.product_id
                        ? "btn-type-product btn-type-product-checked"
                        : "btn-type-product"
                    }
                    href={"/detail/" + item?.product_id}
                    key={index}
                  >
                    <div className="flex items-center relative">
                      <div className="relative w-[14px] h-[14px] mr-[7px]">
                        <span className="checkbox-type"></span>
                        <AiFillCheckCircle className="absolute icon-checkbox" />
                      </div>
                      <p className="text-[0.8em] p-0 font-bold">
                        {item?.product_id}
                      </p>
                    </div>
                    <p className="text-[var(--red)] text-[0.8em] font-bold">
                      {Number(item?.product_price)
                        .toFixed(0)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      <span>₫</span>
                    </p>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-[15px]">
                <span className="text-[1.2em] font-bold mr-[30px]">
                  Số lượng
                </span>
                <div className="btn-quantity" onClick={decrementCount}>
                  <AiOutlineMinus />
                </div>
                <div className="btn-quantity" onClick={incrementCount}>
                  <BsPlusLg />
                </div>
                <input
                  type="text"
                  className="text-quantity"
                  name="quantity"
                  value={count}
                  maxLength="2"
                  id="number-quantity"
                  autoComplete="off"
                  min="1"
                  onChange={(event, e) => {
                    const value = Number(event.target.value);
                    setCount(value);
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-center gap-3 mt-[20px]">
                <div
                  className="w-[70%] col-tb-6 flex items-center flex-col bg-[var(--mainColor)] text-white py-[10px] rounded-[15px] cursor-pointer relative hover-overlay-main"
                  onClick={() => {
                    addToCart();
                    navigate("/paying");
                  }}
                >
                  <div className="hover-overlay"></div>
                  <p className="uppercase font-bold">mua ngay</p>
                  <p>(Giao hàng miễn phí tận nơi)</p>
                </div>
                <div
                  className="w-[30%] col-tb-6 bg-[var(--menuHover)] border-2 flex items-center flex-col border-solid py-[10px] border-[var(--mainColor)] text-[var(--mainColor)] cursor-pointer rounded-[15px] hover-blue-white"
                  onClick={addToCart}
                >
                  <GiShoppingCart className="text-[1.6em]" />
                  <p className="text-white">Thêm vào giỏ</p>
                </div>
              </div>
             
            </div>
            <div className="col-lg-3 col-tb-12 col-tbs-12">
              <div className="flex items-center border-main rounded-[10px] p-[10px]">
                <img
                  src={require("../../assets/Icon/consultant.png")}
                  alt=""
                  className="w-[50px] h-[50px]"
                />
                <p className="text-[0.8em] ml-[15px]">
                  Gọi ngay{" "}
                  <span className="text-[1em] font-bold text-[var(--mainColor)]">
                    0363 993 993
                  </span>{" "}
                  để được tư vấn tốt nhất!
                </p>
              </div>
              <div className="border-gray rounded-[10px] p-[10px] text-[0.8em] mt-[20px]">
                <p>
                  Tình trạng: <span className="text-[#00b907]">Còn hàng</span>
                </p>
                <p>
                  Thương hiệu:{" "}
                  <span className="text-[#00b907]">Phúc Trường An</span>
                </p>
                {/* <p>
                  Loại: <span className="text-[#00b907]">Đèn Đường</span>
                </p> */}
              </div>
             
            </div>
          </Row>
          <DetailInfor
            Infor={product?.data.metadata}
            Image={listImage?.data?.metadata}
          />
        </Row>
      </CardMain>
      {/* <div className="justify-between items-center gap-2 sticky-bottom p-[10px] d-lg-none d-sm-flex">
        <div className="border-red cursor-pointer rounded-[10px] py-[3px] w-[35%] flex flex-col items-center relative">
          <img className="w-[40px]"
            src="https://bizweb.dktcdn.net/thumb/small/100/463/111/themes/889675/assets/hotline.png?1686880710266"
            alt=""
          />
          <span className="font-bold text-[1.1em]">Liên hệ</span>
          <div className="flex justify-between absolute top-[-130%] left-[15%] gap-2  p-[10px] bg-white rounded-[10px] card-shadow">
            <Link to="/detail" className="btn-call">
              <FiPhoneCall />
            </Link>
            <Link to="/detail" className="btn-call">
              <div className="bg-white rounded-[5px] w-fit overflow-hidden flex justify-center items-center">
                <img
                  src={require("../../assets/Icon/zalo.png")}
                  alt=""
                  className="w-[25px] h-[25px]"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center w-100 uppercase bg-[var(--menuHover)] cursor-pointer rounded-[10px] py-[25px] hover-bdr-yellow">
          <span className="font-bold text-[1.1em] text-white inline">
            Thêm vào giỏ
          </span>
        </div>
        <div className="flex flex-col items-center w-[55%] uppercase bg-[var(--mainColor)] cursor-pointer rounded-[10px] py-[25px] hover-bdr-blue">
          <span className="font-bold text-[1.1em] text-white">Mua ngay</span>
        </div>
      </div> */}
    </>
  );
}
