import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'react-bootstrap-icons';
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
    { title: 'Acleris placidana', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377481839/medium.jpeg', author: 'osmeterium' },
    { title: 'Acronicta interrupta', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/367717228/medium.jpeg', author: 'osmeterium' },
    { title: 'Hypagyrtis unipunctata', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/262476487/medium.jpeg', author: 'osmeterium' },
    { title: 'Acronicta radcliffei', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/222116513/medium.jpg', author: 'osmeterium' }
  ];

  const moultingImages = [
    { title: 'Halyomorpha halys', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/435512412/medium.jpeg', author: 'smpierce' },
    { title: 'Oncopeltus fasciatus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/410552760/medium.jpeg', author: 'jerryfinlayson'},
    { title: 'Limacodidae', img: 'https://static.inaturalist.org/photos/406869813/medium.jpeg', author: 'savitha3'},
    { title: 'Acacesia hamata', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/419244473/medium.jpeg', author: 'aperturesciencebydan'}
  ];

  const postMoultImages = [
    { title: 'Zelus longipes', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/405022670/medium.jpg', author: 'calvertm' },
    { title: 'Arilus cristatus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/396976230/medium.jpeg', author: 'hmstarnes' },
    { title: 'Lygaeus turcicus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/404874175/medium.jpeg', author: 'gmzelle' },
    { title: 'Lycorma delicatula', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/405237143/medium.jpeg', author: 'wachzim' }
  ];

  const exuviaeImages = [
    { title: 'Araneomorphae', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/440375476/medium.jpeg', author: 'ncb1221' },
    { title: 'Neotibicen canicularis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/413959289/medium.jpeg', author: 'sandplainwanderer' },
    { title: 'Grapsus grapsus', img: 'https://static.inaturalist.org/photos/439899294/medium.jpeg', author: 'peterbergeson' },
    { title: 'Zygina flammigera', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/437583036/medium.jpeg', author: 'sascha_n' }
  ];

  // Images for the second carousel (KEYWORDS)
  const cicadaImages = [
    { title: 'Subfamily Cicadinae', img:'https://inaturalist-open-data.s3.amazonaws.com/photos/403333252/medium.jpg', author: 'gemela-dos' },
    { title: 'Genus Magicicada', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/378390004/medium.jpg', author: 'rhondahw' },
    { title: 'Genus Magicicada', img: 'https://static.inaturalist.org/photos/378536683/medium.jpeg', author: 'looghna__dainty_mac__bay' },
    { title: 'Megatibicen resh', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/410415802/medium.jpeg', author: 'dragondrew74' }
  ];

  const horseshoeCrabImages = [
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/333099014/medium.jpeg', author: 'livanescudero' },
    { title: 'Limulus polyphemus', img: 'https://static.inaturalist.org/photos/26636128/medium.jpg', author: 'jrudolph94' },
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/11616612/medium.jpg', author: 'ewilhi' },
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/10970136/medium.jpg', author: 'crbwriter' }
  ];

  const spiderImages = [
    { title: 'Thomisinae', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/357704005/medium.jpeg', author: 'dianechattaway' },
    { title: 'Eustala', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/315146549/medium.jpeg', author: 'emiliocorrea320' },
    { title: 'Argiope aurantia', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/286945520/medium.jpg', author: 'heritage226' },
    { title: 'Eriophora ravilla', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/227209417/medium.jpg', author: 'sylshessa' }
  ];

  const ladybugImages = [
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/412688650/medium.jpeg', author: 'blueranchu' },
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/300544000/medium.jpg', author: 'frances123' },
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/207420039/medium.jpg', author: 'seigmond' },
    { title: 'Harmonia axyridis', img: 'https://static.inaturalist.org/photos/231509297/medium.jpg', author: 'nehall' }
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
                {/* <a href="#" className="viewall" onClick={handleViewAllClick}>View all <ChevronRight/></a>*/}
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
                <div className="mv-img">
                  <img src={image.img} alt={image.title} />
                </div>
                <div className="title-in">
                  <h6>{image.title}</h6>
                  <p><i className="ion-android-star"></i><span>{image.author}</span></p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Second carousel */}
      <div className="title-hd">
        <h2>KEYWORD</h2>
        {/* <a href="#" className="viewall">View all <ChevronRight/></a> */}
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
                <div className="mv-img">
                  <img src={image.img} alt={image.title} />
                </div>
                <div className="title-in">
                  <h6>{image.title}</h6>
                  <p><i className="ion-android-star"></i><span>{image.author}</span></p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carusel;

