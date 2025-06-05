import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './carusel.css'; 

const Carusel = () => {
  const [selectedTab, setSelectedTab] = useState('#Moulting'); // Set #Moulting as default
  const [selectedTab2, setSelectedTab2] = useState('#Cicada'); // Set #HorseshoeCrab as default
  const [images, setImages] = useState([]);
  const [Keywords, setKeywords] = useState([]);

  const navigate = useNavigate();

  const handleViewAllClick = () => {

    navigate(`/species/${selectedTab}`);
  };

  // Images for the first carousel (MOULTING STAGE)
  const preMoultImages = [
    { title: 'Acleris placidana', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377481839/small.jpeg',
      author: 'osmeterium', observationId: 213591256 },
    { title: 'Acronicta interrupta', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/367717228/small.jpeg',
      author: 'osmeterium', observationId: 207862827 },
    { title: 'Hypagyrtis unipunctata', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/262476487/small.jpeg',
      author: 'osmeterium', observationId: 152075960 },
    { title: 'Acronicta radcliffei', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/222116513/small.jpg',
      author: 'osmeterium', observationId: 130200855 }
  ];

  const moultingImages = [
    { title: 'Halyomorpha halys', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/435512412/small.jpeg',
      author: 'smpierce', observationId: 244180279 },
    { title: 'Oncopeltus fasciatus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/410552760/small.jpeg',
      author: 'jerryfinlayson', observationId: 231174202 },
    { title: 'Coenomorpha nervosa', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/468972970/small.jpeg',
      author: 'christopher1201', observationId: 261078824 },
    { title: 'Acacesia hamata', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/419244473/small.jpeg',
      author: 'aperturesciencebydan', observationId: 235715975 }
  ];

  const postMoultImages = [
    { title: 'Zelus longipes', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/405022670/small.jpg',
      author: 'calvertm', observationId: 228253495 },
    { title: 'Arilus cristatus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/396976230/small.jpeg',
      author: 'hmstarnes', observationId: 224012626 },
    { title: 'Lygaeus turcicus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/404874175/small.jpeg',
      author: 'gmzelle', observationId: 228178080 },
    { title: 'Lycorma delicatula', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/405237143/small.jpeg',
      author: 'wachzim', observationId: 228365538 }
  ];

  const exuviaeImages = [
    { title: 'Araneomorphae', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/440375476/small.jpeg',
      author: 'ncb1221', observationId: 246655434 },
    { title: 'Neotibicen canicularis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/413959289/small.jpeg',
      author: 'sandplainwanderer', observationId: 232964659 },
    { title: 'Huntsman Spiders', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/465064108/small.jpeg',
      author: 'spidercat', observationId: 259118537 },
    { title: 'Zygina flammigera', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/437583036/small.jpeg',
      author: 'sascha_n', observationId: 245239653 }
  ];

  // Images for the second carousel (KEYWORDS)
  const cicadaImages = [
    { title: 'Subfamily Cicadinae', img:'https://inaturalist-open-data.s3.amazonaws.com/photos/403333252/small.jpg',
      author: 'gemela-dos', observationId: 227361456 },
    { title: 'Genus Magicicada', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/378390004/small.jpg',
      author: 'rhondahw', observationId: 214094702 },
    { title: 'Subfamily Cicadinae', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/453442487/small.jpg',
      author: 'scml1961', observationId: 253262114 }, // not in project
    { title: 'Megatibicen resh', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/410415802/small.jpeg',
      author: 'dragondrew7', observationId: 230943284 }
  ];

  const horseshoeCrabImages = [
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/333099014/small.jpeg',
      author: 'livanescudero', observationId: 190067890 },
    { title: 'Tachypleus tridentatus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/28830536/small.jpeg',
      author: 'musicheer', observationId: 18821768 }, // not in project
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/11616611/small.jpg',
      author: 'ewilhi', observationId: 8671168 },
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/10970136/small.jpg',
      author: 'crbnaturalist', observationId: 8270635 }
  ];

  const spiderImages = [
    { title: 'Thomisinae', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/357704005/small.jpeg',
      author: 'dianechattaway', observationId: 202529825 }, // not in project
    { title: 'Eustala', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/315146549/small.jpeg',
      author: 'emiliocorrea320', observationId: 180874175 },
    { title: 'Argiope aurantia', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/286945520/small.jpg',
      author: 'heritage226', observationId: 165747862 }, // not in project
    { title: 'Eriophora ravilla', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/227209417/small.jpg',
      author: 'sylshessa', observationId: 133394813 } // not in project
  ];

  const ladybugImages = [
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/412688650/small.jpeg',
      author: 'blueranchu', observationId: 232300987 },
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/300544000/small.jpg',
      author: 'frances123', observationId: 173084279 }, // not in project
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/207420039/small.jpg',
      author: 'seigmond', observationId: 122508700 },
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/358134799/small.jpeg',
      author: 'cephalogoddess', observationId: 202757025 }
  ];


  useEffect(() => {
    setImages(moultingImages); // Set #Moulting images as default
    setKeywords(cicadaImages); // Set default images for the second carousel
  }, []);

  // Handle tab click for the first carousel
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    switch (tab) {
      case '#Pre-Moult':
        setImages(preMoultImages);
        break;
      case '#Moulting':
        setImages(moultingImages);
        break;
      case '#Post-Moult':
        setImages(postMoultImages);
        break;
      case '#Exuviae':
        setImages(exuviaeImages);
        break;
      default:
        setImages(moultingImages);
    }
  };

  // Handle tab click for the second carousel
  const handleTabClick2 = (tab) => {
    setSelectedTab2(tab);
    switch (tab) {
      case '#Cicada':
        setKeywords(cicadaImages);
        break;
      case '#HorseshoeCrab':
        setKeywords(horseshoeCrabImages);
        break;
      case '#Spider':
        setKeywords(spiderImages);
        break;
      case '#Ladybug':
        setKeywords(ladybugImages);
        break;

      default:
        setKeywords(cicadaImages);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
    <div className="carousel-section">
      {/* First carousel */}
      <div className="title-hd">
        <h2>MOULTING STAGE</h2>
                <a href="#" className="viewall">View all {'>'}</a>
      </div>
      <div className="tabs">
        <ul className="tab-links">
          <li className={selectedTab === '#Pre-Moult' ? 'active' : ''} onClick={() => handleTabClick('#Pre-Moult')}>#PRE-MOULT</li>
          <li className={selectedTab === '#Moulting' ? 'active' : ''} onClick={() => handleTabClick('#Moulting')}>#MOULTING</li>
          <li className={selectedTab === '#Post-Moult' ? 'active' : ''} onClick={() => handleTabClick('#Post-Moult')}>#POST-MOULT</li>
          <li className={selectedTab === '#Exuviae' ? 'active' : ''} onClick={() => handleTabClick('#Exuviae')}>#EXUVIAE</li>
        </ul>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="slide-it">
              <div className="species-item">
                <Link to={"/observations/" + image.observationId}>
                <div className="mv-img">
                  <img src={image.img} alt={image.title} />
                </div>
                <div className="title-in">
                  <h6>{image.title}</h6>
                  <p><i className="ion-android-star"></i><span>{image.author}</span></p>
                </div>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Second carousel */}
      <div className="title-hd">
        <h2>KEYWORD</h2>
        <a href="#" className="viewall">View all {'>'}</a>
      </div>
      <div className="tabs">
        <ul className="tab-links">
          <li className={selectedTab2 === '#Cicada' ? 'active' : ''} onClick={() => handleTabClick2('#Cicada')}>#CICADA</li>
          <li className={selectedTab2 === '#HorseshoeCrab' ? 'active' : ''} onClick={() => handleTabClick2('#HorseshoeCrab')}>#HORSESHOE CRAB</li>
          <li className={selectedTab2 === '#Spider' ? 'active' : ''} onClick={() => handleTabClick2('#Spider')}>#SPIDER</li>
          <li className={selectedTab2 === '#Ladybug' ? 'active' : ''} onClick={() => handleTabClick2('#Ladybug')}>#LADYBUG</li>

        </ul>
        <Slider {...settings}>
          {Keywords.map((image, index) => (
            <div key={index} className="slide-it">
              <div className="species-item">
                <Link to={"/observations/" + image.observationId}>

                <div className="mv-img">
                  <img src={image.img} alt={image.title} />
                </div>
                <div className="title-in">
                  <h6>{image.title}</h6>
                  <p><i className="ion-android-star"></i><span>{image.author}</span></p>
                </div>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carusel;

