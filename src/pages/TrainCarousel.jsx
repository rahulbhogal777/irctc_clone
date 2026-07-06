import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/TrainCarousal.module.css";

// Dummy data for the carousel
const recentSearchData = [
  {
    from: { code: "NDLS", name: "New Delhi" },
    to: { code: "LKD", name: "Lucknow" },
    date: "Sat 27 Jun 2026",
    classType: "All Classes",
  },
  {
    from: { code: "NDLS", name: "New Delhi" },
    to: { code: "LKD", name: "Lucknow" },
    date: "Sat 28 Jun 2026",
    classType: "All Classes",
  },
  {
    from: { code: "NDLS", name: "New Delhi" },
    to: { code: "LKD", name: "Lucknow" },
    date: "Sat 29 Jun 2026",
    classType: "Sleeper",
  },
];

function TrainCarousal() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    pauseOnHover: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };
  return (
    <>
      <div className={styles.carouselContainer}>
        {/* tittle */}
        <h2 className={styles.heading}>Recent Searches</h2>
        <Slider {...settings} className={styles.carousel}>
          {recentSearchData.map((search, index) => (
            <div key={index} className={styles.card}>
              {/* Train route */}
              <div className={styles.trainRoute}>
                <span className={styles.stationCode}>{search.from.code}</span>
                <span className={styles.arrow}></span>
                <span className={styles.stationCode}>{search.to.code}</span>
              </div>
            </div>
          ))}
                  {/* TODO: finish the implementation of the carousel */}
        </Slider>
      </div>
    </>
  );
}

export default TrainCarousal;
