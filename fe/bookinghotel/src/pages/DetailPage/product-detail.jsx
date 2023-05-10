import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import photos from "./PhotoData";
import './product-detail.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FaChild } from "react-icons/fa";
import Popup from "./Popup"
import { FaBed } from "react-icons/fa";
import { BiArrowToRight } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import Portal from "../../layouts/portal";
import url from "../Url";
export async function loader({ params }) {
  console.log(params.id, "id");
  return fetch(`${url}/stays/${params.id}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export default function ProductDetail() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hotelData, setHotelData] = useState(null);
  const data = useLoaderData();
  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate(`/product-order/${data.id}`);
  }
  console.log("data : ", data);
  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    if (data) {
      setHotelData(data);
    }
  }, [data]);

  if (!hotelData) {
    return <div>Loading...</div>;
  }

  return (
    <Portal>
    <ScrollToTop/>
    <div className="hotel-container">
      {/* {hotelData && (
        <div>
          <h1>{hotelData.id}</h1>
          <h2>Hotel name: {hotelData.name}</h2>
          <p>Hotel description: {hotelData.description}</p>
          <p>Location: {hotelData.location}</p>
          <p>Price per night: {hotelData.price}</p>
        </div>
      )} */}
      {hotelData && (
        <div className="hotel-wrapper">
          <button className="book-hotel" onClick={() => handleNavigate()}>Đặt ngay</button>
          <h1 className="hotel-title" style={{ color: "#19A7CE" }}>
            {hotelData.name}
          </h1>
          <div className="hotel-address">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              {hotelData.address}, {hotelData.wardName},{hotelData.districtName}
              , {hotelData.provinceName}- <a href="#">Hiển thị bản đồ</a>
            </span>
          </div>
          <div className="hotel-images">
            {photos.map((item) => {
              return (
                <div className="hotel-img-wrapper">
                  <img src={item.src} alt="" className="hotelImg"></img>
                </div>
              );
            })}
          </div>
          <div className="hotel-details">
            <div className="hotel-detailsText">
              <h2 className="hotel-title">
                Nghỉ ngơi ở {hotelData.name} Hotel
              </h2>
              <p className="hotel-desc" style={{ marginTop: "30px" }}>
                {hotelData.description}
                <br></br>
                <br></br>
                {hotelData.description}
                <br></br>
                <br></br>
                {hotelData.description}
              </p>
            </div>

            <div className="hotel-box">
              <h3>Điểm nổi bật của chỗ nghỉ</h3>
              <h3>Hoàn hảo cho kỳ nghỉ 1 đêm!</h3>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ color: "#0071c2" }}
              ></FontAwesomeIcon>
              <span style={{ marginLeft: "6px" }}>
                Địa điểm hàng đầu: Được khách gần đây đánh giá cao (9,2 điểm)
              </span>
              <h3>Thông tin về bữa sáng:</h3>
              <p> Kiểu Á</p>
              <h3>Phòng có: </h3>
              <p>Nhìn ra biển</p>
              <button className="roomBooking" onClick={() => handleNavigate()}>Đặt ngay</button>
            </div>
          </div>
          <h1>Phòng ở khách sạn chúng tôi</h1>
          <div className="title-list-room">
            <div>Loại phòng</div>
            <div>Phù hợp cho (số người lớn và số trẻ em)</div>
            <div>Xem</div>
          </div>
          {hotelData.rooms.map((room) => (
            <>
              <div className="room-list">
                <div className="room-type-container">
                  <p style={{ color: "#0071c2", fontWeight: "bold" }}>
                    Phòng {room.name}
                  </p>
                  <p>{room.bedsCount} giường đôi cực lớn</p>
                </div>

                <div
                  className="room-suitable-for"
                  style={{ paddingTop: "25px" }}
                >
                  {room.maxAdultGuests} x{" "}
                  <AiOutlineUser style={{ fontSize: "1.6rem" }} /> +{" "}
                  {room.maxChildrenGuests} x{" "}
                  <FaChild style={{ fontSize: "1.1rem" }} />
                </div>

                <div className="room-price-btn" style={{ paddingTop: "25px" }}>
                  <button onClick={handlePopupOpen}>Xem chi tiết</button>
                </div>
              </div>

              <div className="room-list">
                <div className="room-type-container">
                  <p style={{ color: "#0071c2", fontWeight: "bold" }}>
                    Phòng {room.name}
                  </p>
                  <p>{room.bedsCount} giường đôi cực lớn</p>
                </div>

                <div
                  className="room-suitable-for"
                  style={{ paddingTop: "25px" }}
                >
                  {room.maxAdultGuests} x{" "}
                  <AiOutlineUser style={{ fontSize: "1.6rem" }} /> +{" "}
                  {room.maxChildrenGuests} x{" "}
                  <FaChild style={{ fontSize: "1.1rem" }} />
                </div>

                <div className="room-price-btn" style={{ paddingTop: "25px" }}>
                  <button onClick={handlePopupOpen}>Xem chi tiết</button>
                </div>
              </div>

              <div className="room-list">
                <div className="room-type-container">
                  <p style={{ color: "#0071c2", fontWeight: "bold" }}>
                    Phòng {room.name}
                  </p>
                  <p>{room.bedsCount} giường đôi cực lớn</p>
                </div>

                <div
                  className="room-suitable-for"
                  style={{ paddingTop: "25px" }}
                >
                  {room.maxAdultGuests} x{" "}
                  <AiOutlineUser style={{ fontSize: "1.6rem" }} /> +{" "}
                  {room.maxChildrenGuests} x{" "}
                  <FaChild style={{ fontSize: "1.1rem" }} />
                </div>

                <div className="room-price-btn" style={{ paddingTop: "25px" }}>
                  <button onClick={handlePopupOpen}>Xem chi tiết</button>
                </div>
              </div>

              <div className="room-list">
                <div className="room-type-container">
                  <p style={{ color: "#0071c2", fontWeight: "bold" }}>
                    Phòng {room.name}
                  </p>
                  <p>{room.bedsCount} giường đôi cực lớn</p>
                </div>

                <div
                  className="room-suitable-for"
                  style={{ paddingTop: "25px" }}
                >
                  {room.maxAdultGuests} x{" "}
                  <AiOutlineUser style={{ fontSize: "1.6rem" }} /> +{" "}
                  {room.maxChildrenGuests} x{" "}
                  <FaChild style={{ fontSize: "1.1rem" }} />
                </div>

                <div className="room-price-btn" style={{ paddingTop: "25px" }}>
                  <button onClick={handlePopupOpen}>Xem chi tiết</button>
                </div>
              </div>

              {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={handlePopupClose}>
                  <div className="popup-container">
                    <div className="room-title">
                      <h3>{room.name}</h3>
                      <img
                        src={room.images[0].fileName}
                        alt={room.images[0].altText}
                      />
                    </div>

                    <div className="room-info">
                      <h4>Thông tin phòng</h4>
                      <p>{room.description}</p>
                      <span><b>Giá theo giờ:</b> {room.pricePerHour} VND</span> <br></br>
                      <span><b>Giá theo ngày:</b> {room.pricePerDay} VND</span> <br></br>
                      <span><b>Phòng</b> </span><br></br>
                        <p>--{">"} Có {room.bedsCount} giường <FaBed/> </p>
                        <p>--{">"} Tối đa {room.maxAdultGuests} người lớn <AiOutlineUser/></p> 
                        <p>--{">"} Tối đa {room.maxAdultGuests} trẻ nhỏ <FaChild/></p> 

                        <button onClick={() => handleNavigate()}>Đặt ngay</button>
                    </div>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {/* {hotelData.rooms.map(room => (
        <div key={room.code} className="room">
          <img src={room.images[0].fileName} alt={room.images[0].altText} />
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p>Price per hour: {room.pricePerHour}</p>
          <p>Price per day: {room.pricePerDay}</p>
          <p>Number of beds: {room.bedsCount}</p>
          <p>Max adult guests: {room.maxAdultGuests}</p>
          <p>Max children guests: {room.maxChildrenGuests}</p>
          {room.reservedTimes.map(reservedTime => (
            <div key={reservedTime.code}>
              <p>Reserved from: {reservedTime.from}</p>
              <p>Reserved to: {reservedTime.to}</p>
              <p>Name: {reservedTime.name}</p>
              <p>Email: {reservedTime.email}</p>
              <p>Phone: {reservedTime.phone}</p>
              <p>Total price: {reservedTime.totalPrice}</p>
            </div>
          ))}
        </div>
      ))} */}
        </div>
      )}

      {/* <div>
      <h1>{hotelData.name}</h1>
      <p>{hotelData.description}</p>
      <img src={hotelData.images[0].fileName} alt={hotelData.images[0].altText} />
      <h2>Rooms</h2>
      {hotelData.rooms.map((room) => (
        <div key={room.code}>
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p>Price per hour: {room.pricePerHour}</p>
          <p>Price per day: {room.pricePerDay}</p>
          <img src={room.images[0].fileName} alt={room.images[0].altText} />
          <p>Beds count: {room.bedsCount}</p>
          <p>Max adult guests: {room.maxAdultGuests}</p>
          <p>Max children guests: {room.maxChildrenGuests}</p>
          {room.reservedTimes.length > 0 && (
            <div>
              <h4>Reserved times:</h4>
              <ul>
                {room.reservedTimes.map((reservedTime, index) => (
                  <li key={index}>
                    From: {reservedTime.from}, To: {reservedTime.to}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      <h2>Location</h2>
      <p>{hotelData.address}, {hotelData.wardName}, {hotelData.districtName}, {hotelData.provinceName}</p>
    </div> */}
    </div>
    </Portal>
  );
};


