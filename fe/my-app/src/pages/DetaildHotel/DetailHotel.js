import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import photos from "./PhotoData";
import './Detaild.css'
const Detail = () => {
  return (
    <div className="hotel-container">
      <div className="hotel-wrapper">
      <button className="book-hotel">Đặt ngay</button>
        <h1 className="hotel-title" >Saphia Hotel Nha Trang</h1>
        <div className="hotel-address">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>90 Trần Phú, Nha Trang, Việt Nam - <a href="#">Hiển thị bản đồ</a></span>
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
        <div className="hotel-details" >
          <div className="hotel-detailsText">
            <h2 className="hotel-title">Nghỉ ngơi ở Saphia Hotel Nha Trang</h2>
            <p className="hotel-desc" style={{marginTop:"30px"}}>
              Tọa lạc tại thành phố Nha Trang, cách bãi biển Nha Trang 600 m,
              Saphia Hotel Nha Trang cung cấp chỗ nghỉ với nhà hàng, chỗ đỗ xe
              riêng miễn phí và hồ bơi ngoài trời. Chỗ nghỉ này có các phòng gia
              đình và sân hiên tắm nắng. Nơi đây cung cấp dịch vụ lễ tân 24 giờ,
              dịch vụ phòng và dịch vụ thu đổi ngoại tệ cho khách. <br></br> <br></br>
              Phòng nghỉ
              gắn máy điều hòa tại khách sạn có bàn làm việc, ấm đun nước,
              minibar, két an toàn, TV màn hình phẳng và phòng tắm riêng với vòi
              sen. Một số phòng còn được bố trí khu vực bếp ăn đi kèm tủ lạnh và
              lò nướng. Tất cả các phòng đều được trang bị tủ để quần áo.
              <br></br> <br></br> Khách
              nghỉ tại Saphia Hotel Nha Trang có thể thưởng thức bữa sáng kiểu
              Á. Chỗ nghỉ cũng cung cấp dịch vụ cho thuê xe đạp và dịch vụ văn
              phòng với WiFi miễn phí trong toàn bộ khuôn viên. Saphia Hotel Nha
              Trang nằm cách Bãi tắm phía Nam 2 km và Bãi Tranh 3 km. Sân bay
              gần nhất là sân bay quốc tế Cam Ranh, nằm trong bán kính 34 km từ
              khách sạn.
            </p>
            <p>
              Các khoảng cách nêu trong mô tả chỗ nghỉ được tính toán bằng ©
              OpenStreetMap
            </p>
            
          </div>

          <div className="hotel-box">
          <h3>Điểm nổi bật của chỗ nghỉ</h3>
          <h3>Hoàn hảo cho kỳ nghỉ 1 đêm!</h3>
          <FontAwesomeIcon icon={faLocationDot} style={{color:"#0071c2"}} > 
          
          </FontAwesomeIcon>
          <span style={{marginLeft:"6px"}}>Địa điểm hàng đầu: Được khách gần đây đánh giá cao (9,2 điểm)</span>
          <h3>Thông tin về bữa sáng:</h3>
          <p> Kiểu Á</p>
          <h3>Phòng có: </h3>
          <p>Nhìn ra biển</p>
          <button className="roomBooking">Đặt ngay</button>
        </div>
        
        </div>
        
      </div>
    </div>
  );
};

export default Detail;
