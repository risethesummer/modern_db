import { Navigate, useLoaderData } from "react-router-dom";
import Portal from "../../layouts/portal";
import { useState, useEffect } from "react";
import { BsFillPatchQuestionFill, BsStar } from "react-icons/bs";
import "./ConfirmOrder.css";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import url from "../Url";
export async function loader({ params }) {
  console.log(params.id, "id");
  return fetch(`${url}//stays/${params.id}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

const ConfirmOrder = ({ params }) => {
  const [hotelData, setHotelData] = useState(null);
  const data = useLoaderData();
  const navigate = useNavigate();
  console.log("data : ", data);

  const handleNavigateBack = () =>{
    navigate('/');
  }
  useEffect(() => {
    if (data) {
      setHotelData(data);
    }
  }, [data]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const email = localStorage.getItem('email');
  let dateStart = new Date(data.rooms[0].reservedTimes[0].from);
  let options = { day: "numeric", month: "long", year: "numeric" };
  const fromDate = `${dateStart.getDate()}h, ${dateStart.toLocaleDateString(
    "vi-VN",
    options
  )}`;
  let dateStartCustom = new Date(data.rooms[0].reservedTimes[0].from);
  dateStartCustom.setDate(dateStart.getDate() - 1);
  let optionsCustom = { day: "numeric", month: "long", year: "numeric" };
  const formDateCustom = `${dateStartCustom.toLocaleDateString(
    "vi-VN",
    optionsCustom
  )}`;
  const fromTime = dateStart.toLocaleTimeString("vi-VN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateEnd = new Date(data.rooms[0].reservedTimes[0].to);
  options = { day: "numeric", month: "long", year: "numeric" };
  const toDate = `${dateEnd.getDate()}h, ${dateEnd.toLocaleDateString(
    "vi-VN",
    options
  )}`;
  const toTime = dateEnd.toLocaleTimeString("vi-VN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const durionTime = Math.floor((dateEnd - dateStart) / 86400000);

  return (
    <Portal>
    <ScrollToTop/>
      <div className="container product-order">
        <div className="md-stepper-horizontal d-flex justify-content-between align-items-center">
          <div className="md-step active done  follow-item d-flex align-items-center py-4 px-0">
            <div className="md-step-circle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </div>
            <div className="md-step-title mt-0 ms-2">Bạn chọn</div>
          </div>
          <div className="md-step-bar" />

          <div className="md-step active follow-item d-flex py-4 px-0 align-items-center">
            <div className="md-step-circle">
              <span>2</span>
            </div>
            <div className="md-step-title mt-0 ms-2 ">Chi tiết về bạn</div>
          </div>
          <div className="md-step-bar" />
          <div className="md-step active follow-item d-flex py-4 px-0 align-items-center">
            <div className="md-step-circle">
              <span>3</span>
            </div>
            <div className="md-step-title mt-0 ms-2">Bước cuối cùng</div>
          </div>
        </div>

        <h3>
          Xác nhận lại thông tin của bạn tại khách sạn{" "}
          <span style={{ color: "#0071c2" }}>{data.name}</span>
        </h3>

        {hotelData && (
          <div className="confirm-container">
            <div className="info">
              <img
                style={{
                  borderRadius: "10px",
                  width: "400px",
                  height: "260px",
                }}
                src={data.images[0].fileName}
                alt={data.images[0].altText}
              />
              <p style={{ marginTop: "20px" }}>
                {data.address}, {data.wardName}, {data.districtName},{" "}
                {data.provinceName}
              </p>
              <h5 className="wordBold">Got a question?</h5>
              <p>+8401239412</p>
              <a href="#" style={{ textDecoration: "none" }}>
                Email the property
              </a>
              <br></br>
              <BsFillPatchQuestionFill /> <h4>Need help?</h4>
              <a href="#">Contact Customer Service</a>
            </div>

            <div className="info">
              <p>Confirmation email: <span style={{fontWeight:"bold",color:"red"}}>{email}</span> </p>
              <h4 className="title fw-bolder">Chi tiết đặt phòng của bạn</h4>
              <span className="check-title fw-bold d-block my-1 ">
                Nhận phòng
              </span>
              <p>{fromDate}</p>
              <span className="check-title fw-bold d-block my-1">
                Trả phòng
              </span>
              <p>{toDate}</p>
              <b>
                <span style={{ color: "#19A7CE" }}>
                  <BsStar />
                  Update to a room
                </span>
              </b>{" "}
              with a balcony for just 227,796 VND
              <span className="fw-bold d-block mt-3">
                Tổng thời gian lưu trú: {durionTime} ngày
              </span>
              <span>
                <b>Bạn đã chọn:</b> Phòng {data.rooms[0].name}{" "}
              </span>
              <br></br>
              <h4 className="title" style={{ marginTop: "20px" }}>
                Tóm tắt giá
              </h4>
              <div className="d-flex justify-content-between">
                <span className="price-title">Giá thuê một ngày</span>
                <span className="price-total fs-6 fw-bold">
                  {numberWithCommas(data.rooms[0].pricePerDay)} VND
                </span>
              </div>
              <div
                className="total-bill  d-flex align-items-center  justify-content-between px-2 py-4"
                style={{ marginTop: "20px" }}
              >
                <h5 className="fw-bolder mb-0">Tổng tiền</h5>
                <div className="bill-price">
                  <h4 className="finally-price my-1 fw-bolder text-end">
                    <span style={{ color: "green" }}>
                      {numberWithCommas(
                        `VND ${
                          parseInt(data.rooms[0].pricePerDay) *
                          parseInt(durionTime)
                        }`
                      )}
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="info">
              <p className="wordBlue">Change dates</p>
              <p className="wordBlue">Add space for more guest</p>
              <p className="wordBold">View policies</p>
              <hr></hr>
              <p className="wordBold">View confirmation</p>
              <p className="wordBold">Print confirmation</p>
              <hr></hr>
            </div>
          </div>
        )}
        <div className="checkingFinal-booking">
          <div className="alertBeforeCancel">
            <p>
              Để miễn phí hủy phòng, bạn phải <b>HỦY</b> trước 23:59 ngày{" "}
              {formDateCustom} (Quy định của khách sạn chỉ được hủy trước 1 ngày
              tính từ ngày nhận phòng). Sau khoảng thời gian này, bạn phải trả{" "}
              <span style={{ fontWeight: "bold" }}>
                {numberWithCommas(
                  `VND ${
                    parseInt(data.rooms[0].pricePerDay) * parseInt(durionTime)
                  }`
                )}
              </span>{" "}
              nếu muốn hủy phòng
            </p>
          </div>
          <div className="bnt-cancel">
            <button onClick={() => handleNavigateBack()}>Hủy đặt phòng</button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmOrder;
