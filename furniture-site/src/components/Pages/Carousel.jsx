import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Carousel = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2000,            
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <img
          src="https://www.nilkamalfurniture.com/cdn/shop/files/Desktop-banner_NBS_Bed_1521x.jpg?v=1767585430"
          alt="slide 1"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="https://www.nilkamalfurniture.com/cdn/shop/files/Website_Banner_-_Explore_Now_revised_1521x.jpg?v=1763985413"
          alt="slide 2"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="https://www.nilkamalfurniture.com/cdn/shop/files/Desktop-banner_NYS_Beds_2362e2e3-acc0-4984-9eca-b8bd1367f870_1521x.gif?v=1766392794"
          alt="slide 3"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
