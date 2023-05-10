import Portal from "../layouts/portal";
import { useLoaderData } from "react-router-dom";
import { Toast } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
export async function loader({ params }) {
  console.log(params.id, "id");
  return fetch(`https://spotty-cougars-greet.loca.lt//stays/${params.id}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export default function ProductOrder() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    localStorage.setItem('email', event.target.value);
  };
  
  const data = useLoaderData();
  let dateStart = new Date(data.rooms[0].reservedTimes[0].from);
  let options = { day: "numeric", month: "long", year: "numeric" };
  const fromDate = `${dateStart.getDate()}h, ${dateStart.toLocaleDateString(
    "vi-VN",
    options
  )}`;

  const navigate = useNavigate();
  
  const  handleNavigate = () =>{
    navigate(`/product-confirm/${data.id}`);
  }
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
          <div className="md-step follow-item d-flex py-4 px-0 align-items-center">
            <div className="md-step-circle">
              <span>3</span>
            </div>
            <div className="md-step-title mt-0 ms-2">Bước cuối cùng</div>
          </div>
        </div>

        <div className="d-flex" style={{ gap: 20 }}>
          <div className="bill">
            <div className="product-detail">
              <h4 className="title fw-bolder">Chi tiết đặt phòng của bạn</h4>
              <div className="d-flex justify-content-between">
                <div className="check-in">
                  <span className="check-title fw-bold d-block my-1 ">
                    Nhận phòng
                  </span>
                  <p className="check-date fw-bolder mb-1">{fromDate}</p>
                  <span className="check-time">Từ {fromTime}</span>
                </div>
                <div className="check-out">
                  <span className="check-title fw-bold d-block my-1">
                    Trả phòng
                  </span>
                  <p className="check-date fw-bolder mb-1">{toDate}</p>
                  <span className="check-time">Cho đến {toTime}</span>
                </div>
              </div>
              <div className="check-total">
                <span className="fw-bold d-block mt-3">
                  Tổng thời gian lưu trú:
                </span>
                <b className="fw-bolder">{durionTime} ngày</b>
              </div>
              <hr />
              <h4 className="title">Bạn đã chọn:</h4>
              <span>Phòng {data.rooms[0].name} </span>
            </div>
            <div className="short-hand-price">
              <h4 className="title">Tóm tắt giá</h4>
              <div className="d-flex justify-content-between">
                <span className="price-title">Giá thuê một ngày</span>
                <span className="price-total fs-6 fw-bold">
                  {numberWithCommas(data.rooms[0].pricePerDay)} VND
                </span>
              </div>

              <p>
                Bạn được giảm giá vì chỗ nghỉ này đang có ưu đãi trong thời gian
                có hạn cho một số phòng khớp với tìm kiếm của bạn.
              </p>
              <div className="total-bill  d-flex align-items-center  justify-content-between px-2 py-4">
                <h4 className="fw-bolder mb-0">Giá</h4>
                <div className="bill-price">
                  <h4 className="finally-price my-1 fw-bolder text-end">
                    VND{" "}
                    {numberWithCommas(
                      parseInt(data.rooms[0].pricePerDay) * parseInt(durionTime)
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="order-form">
            <div className="product-item d-flex">
              <div className="product-image">
                <img
                  src={data.images[0].fileName}
                  alt={data.images[0].altText}
                />
              </div>
              <div className="product-content">
                <div className="product-head">
                  <h4 className="product-title">{data.name}</h4>
                  <div className="product-rate d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
                    </svg>
                  </div>
                </div>
                <div className="product-address">
                  <a href="">{data.address}</a>
                  <span>
                    {data.wardName} {data.districtName} {data.provinceName}
                  </span>
                </div>
                <div className="product-category">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21.22 3.37a.75.75 0 0 0-.6-.59c-4.85-.9-10.6.55-13.37 3.36S3.1 14.39 3.88 19.05L2 21a.75.75 0 0 0 0 1 .74.74 0 0 0 .53.22A.71.71 0 0 0 3 22l2-1.9a16.94 16.94 0 0 0 2.76.23c4.09 0 8.19-1.33 10.35-3.52 2.71-2.81 4.07-8.59 3.11-13.44zM17 15.75c-2.11 2.14-6.59 3.36-10.7 3L16.59 8.47a.75.75 0 0 0 0 -1.06.77.77 0 0 0-1.07 0l-10.3 10.3c-.33-3.91.91-8.31 3.1-10.52s7.29-3.63 11.52-3c.67 4.22-.54 9.22-2.84 11.56z"></path>
                  </svg>
                  <span>Chỗ nghỉ Du lịch Bền vững</span>
                </div>
                <p className="product-desc">{data.description}</p>
              </div>
            </div>
            <div className="tip p-3 mb-4">
              <h4 className="title fw-bolder fs-5">Mách nhỏ:</h4>
              <ul>
                <li>Không cần thẻ tín dụng!</li>
                <li>
                  Lưu trú linh động: Bạn có thể hủy miễn phí bất cứ lúc nào,
                  chốt ngay mức giá hấp dẫn này hôm nay.
                </li>
                <li>
                  Hôm nay không cần trả tiền. Bạn sẽ thanh toán trong lúc nghỉ.
                </li>
                <li>Hoàn tất đặt phòng này để được MIỄN PHÍ taxi sân bay </li>
                <li>
                  Bạn đang đặt Phòng Superior Giường Đôi - Không có Cửa sổ cuối
                  cùng còn trống chúng tôi có ở Raon Danang Beach.{" "}
                </li>
              </ul>
            </div>
            <div className="info-customer p-3 mb-4">
              <h4 className="title fw-bolder fs-5">
                Nhập thông tin chi tiết của bạn
              </h4>
              <div className="warning">
                <span className="required_fields_description p-1">
                  Gần xong rồi! Chỉ cần điền phần thông tin * bắt buộc.
                </span>
                <p className="bui-alert__text mt-3">
                  <svg
                    className="bk-icon-streamline-info_sign me-2"
                    height="24"
                    role="presentation"
                    width="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M14.25 15.75h-.75a.75.75 0 0 1-.75-.75v-3.75a1.5 1.5 0 0 0-1.5-1.5h-.75a.75.75 0 0 0 0 1.5h.75V15a2.25 2.25 0 0 0 2.25 2.25h.75a.75.75 0 0 0 0-1.5zM11.625 6a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zM22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12z"></path>
                  </svg>
                  Vui lòng điền thông tin bằng Tiếng Việt hoặc Tiếng Anh
                </p>
              </div>
              <form action="">
                <div>
                  <div>
                    <label className="fw-bolder">Bạn sắp đi công tác?</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      defaultValue="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Đúng
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      defaultValue="option2"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Sai
                    </label>
                  </div>
                </div>

                <div className="d-flex mt-3">
                  <div className="me-3">
                    <label className="form-label fw-bolder">
                      Họ (tiếng Anh)
                    </label>
                    <input className="form-control" placeholder="Nhập họ..." />
                  </div>
                  <div>
                    <label className="form-label fw-bolder">
                      Tên (tiếng Anh)
                    </label>
                    <input className="form-control" placeholder="Nhập tên..." />
                  </div>
                </div>

                <div className="mt-3 w-50">
                  <label className="form-label fw-bolder">Địa chỉ email</label>
                  <input className="form-control" placeholder="Nhập email..."  value={email}
        onChange={handleEmailChange}/>
                </div>

                <div className="mt-3">
                  <label className="fw-bold">Bạn đặt phòng cho ai?</label>
                </div>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Tôi là khách lưu trú chính
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Đặt phòng này là cho người khác
                  </label>
                </div>
              </form>
            </div>
            <div className="info-customer special-option p-3 mb-4">
              <h4 className="title fw-bolder fs-5">
                Phòng {data.rooms[0].name}
              </h4>
              <p>- {data.rooms[0].description}</p>
              <p className="d-flex align-items-center fw-bold">
                Số người tối đa
                <button
                  className="btn"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Tối đa ${data.rooms[0].maxAdultGuests} người lớn, ${data.rooms[0].maxChildrenGuests} trẻ em`}
                >
                  <svg
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Tooltip on top"
                    className="ms-2 bk-icon -streamline-person_half"
                    height="16"
                    width="16"
                    viewBox="0 0 24 24"
                    role="presentation"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0zM3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0z"></path>
                  </svg>
                  <svg
                    className="bk-icon -streamline-person_half"
                    height="16"
                    width="16"
                    viewBox="0 0 24 24"
                    role="presentation"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0zM3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0z"></path>
                  </svg>
                </button>
              </p>
            </div>
            <div className="info-customer special-option p-3 mb-4">
              <h4 className="title fw-bolder fs-5">Các Yêu Cầu Đặc Biệt</h4>
              <p>
                Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng – tuy nhiên,
                chỗ nghỉ sẽ cố gắng hết sức để thực hiện. Bạn luôn có thể gửi
                yêu cầu đặc biệt sau khi hoàn tất đặt phòng của mình!
              </p>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Vui lòng ghi yêu cầu của bạn tại đây. (không bắt buộc)
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-primary"
            type="button"
            // onClick={() => {
            //   const toast = new Toast(document.getElementById("success"));
            //   toast.show();
            //}}
            onClick = {() => handleNavigate()}
            
          >
            Đặt phòng
          </button>
        </div>
      </div>
      <div
        id="success"
        className="position-fixed bottom-0 end-0 mb-3 me-3 toast align-items-center text-white bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">Đặt phòng thành công.</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </Portal>
  );
}
