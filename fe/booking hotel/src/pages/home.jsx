import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { Toast } from "bootstrap/dist/js/bootstrap.esm.min.js";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Portal from "../layouts/portal";
import { PaginationControl } from "react-bootstrap-pagination-control";
export default function Home() {
  const [rooms, setRooms] = useState();
  const [adultGuests, setAdultGuests] = useState(2);
  const [childGuests, setChildGuests] = useState(0);
  const [locationJourney, setLocationJourney] = useState();
  const addressRef = useRef("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (addressRef.current) {
      fetch(
        `http://localhost:8080/divisions?search=${addressRef.current}&offset=${page}`
      )
        .then((response) => response.json())
        .then((data) => setLocationJourney(data))
        .catch((error) => console.error(error));
    } else {
      fetch(
        `http://localhost:8080/stays?&guests=${adultGuests}&guests=${childGuests}&checkTimes=${startDate.toISOString()}&checkTimes=${endDate.toISOString()}&offset=${page}`
      )
        .then((response) => response.json())
        .then((data) => setRooms(data))
        .catch((error) => console.error(error));
    }
  }, [page]);
  const handleSearch = () => {
    if (endDate.getTime() < startDate.getTime()) {
      const toast = new Toast(document.getElementById("errorInput"));
      toast.show();
      return;
    }
    if (addressRef.current) {
      fetch(
        `http://localhost:8080/divisions?search=${addressRef.current}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => setLocationJourney(data))
        .catch((error) => console.error(error));
    } else
      fetch(
        `http://localhost:8080/stays?&guests=${adultGuests}&guests=${childGuests}&checkTimes=${startDate.toISOString()}&checkTimes=${endDate.toISOString()}`
      )
        .then((response) => response.json())
        .then((data) => setRooms(data))
        .catch((error) => console.error(error));
  };
  useEffect(() => {
    if (locationJourney?.items?.length > 0) {
      let newState = [];
      locationJourney?.items.forEach((item) => {
        fetch(
          `http://localhost:8080/stays?districtCode=${
            item.districtCode
          }&provinceCode=${item.provinceCode}&wardCode=${
            item.wardCode
          }&guests=${adultGuests}&guests=${childGuests}&checkTimes=${startDate.toISOString()}&checkTimes=${endDate.toISOString()}`
        )
          .then((response) => response.json())
          .then((data) => {
            newState = [...newState, ...data.items];
            setRooms({ ...rooms, items: newState });
            setRooms({ ...rooms, count: data.count });
          })
          .catch((err) => console.log(err));
      });
    }
  }, [locationJourney]);

  return (
    <Portal>
      <div
        id="errorInput"
        className="position-fixed top-0 translate-middle start-50 mt-5  toast align-items-center text-white bg-danger  border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            Ngày nhận phòng phải nhỏ hơn ngày trả phòng.
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Vietnam</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" style={{ color: "gray", textDecoration: "none" }}>
                {" "}
                Kết quả tìm kiếm
              </a>
            </li>
          </ol>
        </nav>

        <div className="d-flex align-items-start">
          <div className="sidebar">
            <div className="search-box">
              <h4>Tìm</h4>
              <div className="form-search-item">
                <label htmlFor="">Tên chỗ nghỉ / điểm đến:</label>
                <input
                  className="form-control"
                  list="datalistOptions"
                  id="exampleDataList"
                  onChange={(e) => (addressRef.current = e.target.value)}
                />
              </div>
              <div className="form-search-item">
                <label htmlFor="">Ngày nhận phòng</label>
                <DatePicker
                  minDate={Date.now()}
                  dateFormat="dd/MM/yyyy"
                  className="date-picker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="form-search-item">
                <label htmlFor="">Ngày trả phòng</label>
                <DatePicker
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  className="date-picker"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                />
              </div>

              <div className="form-search-item">
                <label htmlFor="">Số người lớn</label>
                <div className="input-group mb-3">
                  <button
                    className="input-group-text"
                    onClick={() => setAdultGuests((prev) => prev - 1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    value={adultGuests}
                    onChange={(e) => setAdultGuests(e.target.value)}
                  />
                  <button
                    className="input-group-text"
                    onClick={() => setAdultGuests((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="form-search-item">
                <label htmlFor="">Số trẻ em</label>
                <div className="input-group mb-3">
                  <button
                    className="input-group-text"
                    onClick={() => setChildGuests((prev) => prev - 1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    value={childGuests}
                    onChange={(e) => setChildGuests(e.target.value)}
                  />
                  <button
                    className="input-group-text"
                    onClick={() => setChildGuests((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="form-search-item form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Căn hộ và nhà nguyên căn
                </label>
              </div>
              <div className="form-search-item form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Tôi đi công tác
                </label>
              </div>
              <div className="d-grid gap-2 col-12 mx-auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearch}
                >
                  Tìm
                </button>
              </div>
            </div>
          </div>
          <div className="product-list">
            <h3 className="search-text-result mb-3">
              {addressRef.current
                ? ` ${addressRef.current} tìm thấy ${rooms?.count} chỗ nghỉ`
                : `Tìm thấy ${rooms?.count} chỗ nghỉ`}
            </h3>
            {rooms?.items.map((item) => (
              <div className="product-item d-flex" key={item.id}>
                <div className="product-image">
                  <img src={item.images[0].fileName} alt={item.altText} />
                </div>
                <div className="product-content">
                  <div className="product-head">
                    <h4 className="product-title">{item.name}</h4>
                    <div className="product-rate d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="product-address">
                    <a href="">{item.address}</a>
                    <span>
                      {item.districtName} {item.provinceName}
                    </span>
                  </div>
                  <div className="product-category">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21.22 3.37a.75.75 0 0 0-.6-.59c-4.85-.9-10.6.55-13.37 3.36S3.1 14.39 3.88 19.05L2 21a.75.75 0 0 0 0 1 .74.74 0 0 0 .53.22A.71.71 0 0 0 3 22l2-1.9a16.94 16.94 0 0 0 2.76.23c4.09 0 8.19-1.33 10.35-3.52 2.71-2.81 4.07-8.59 3.11-13.44zM17 15.75c-2.11 2.14-6.59 3.36-10.7 3L16.59 8.47a.75.75 0 0 0 0 -1.06.77.77 0 0 0-1.07 0l-10.3 10.3c-.33-3.91.91-8.31 3.1-10.52s7.29-3.63 11.52-3c.67 4.22-.54 9.22-2.84 11.56z"></path>
                    </svg>
                    <span>Chỗ nghỉ Du lịch bền vững</span>
                  </div>
                  <p className="product-desc">{item.description}</p>
                </div>
                <div className="product-price">
                  <div className="d-flex align-items-start" style={{ gap: 5 }}>
                    <div>
                      <div className="product-type">Rất tốt</div>
                      <div className="product-review">2,614 đánh giá</div>
                    </div>
                    <div className="product-location-point">9,3</div>
                  </div>
                  <Link
                    to={`/product-order/${item.id}`}
                    className="mt-3 btn btn-primary"
                  >
                    Đặt ngay
                  </Link>
                </div>
              </div>
            ))}
            <PaginationControl
              className="mt-5"
              page={page}
              between={4}
              total={rooms?.count}
              limit={rooms?.items.length}
              changePage={(page) => {
                setPage(page);
              }}
              ellipsis={1}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
}
