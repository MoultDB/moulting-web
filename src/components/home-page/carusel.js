import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './carusel.css';

const Carusel = () => {
  const [selectedTab, setSelectedTab] = useState('#Moulting');
  const [selectedTab2, setSelectedTab2] = useState('#Cicadomorpha');
  const [images, setImages] = useState([]);
  const [Keywords, setKeywords] = useState([]);
  const [sliderKey, setSliderKey] = useState(0);


  const navigate = useNavigate();

  const handleViewAllClickStage = () => {
    const stageMap = {
      '#Pre-Moult': 'pre-moult',
      '#Moulting': 'moulting',
      '#Post-Moult': 'post-moult',
      '#Exuviae': 'exuviae'
    };
    const stageParam = stageMap[selectedTab] || 'moulting';
    const taxonId = '47120'; // Arthropoda
    navigate(`/species/${taxonId}?stage=${encodeURIComponent(stageParam)}`);
  };

  const handleViewAllClickKeyword = () => {
    const tabToAccession = {
      '#Cicadomorpha': 372849,
      '#Limulidae': 326110,
      '#Araneae': 47118,
      '#Coccinellidae': 48486
    };
    const accession = tabToAccession[selectedTab2];
    if (accession) navigate(`/species/${accession}`);
  };

  // Images for the first carousel (MOULTING STAGE)
  const preMoultImages = [
    { title: 'Hypselistes florens', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/454305404/small.png',
      author: 'justinchans', observationId: 253697088 },
    { title: 'Papilio machaon', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/394711013/small.jpg',
      author: 'mathieu_h', observationId: 222808123 },
    { title: 'Phosphila miselioides', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/220080620/small.jpeg',
      author: 'craigbiegler', observationId: 129500699 },
    { title: 'Acronicta radcliffei', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/222116513/small.jpg',
      author: 'osmeterium', observationId: 130200855 }
  ];

  const moultingImages = [
    { title: 'Porcellio scaber', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/483372653/small.jpeg',
      author: 'commoncopper', observationId: 268882753 },
    { title: 'Boisea trivittata', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/455744483/small.jpg',
      author: 'nvertebrained', observationId: 254436129 },
    { title: 'Uresiphita reversalis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/402636072/small.jpg',
      author: 'kim_fleming', observationId: 226993160 },
    { title: 'Trichonephila clavata', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/392516139/small.jpg',
      author: 'drchancey', observationId: 221637481 }
  ];

  const postMoultImages = [
    { title: 'Eurymerodesmus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/461444941/small.jpg',
      author: 'joshvuh', observationId: 257254151 },
    { title: 'Arilus cristatus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/396976230/small.jpeg',
      author: 'hmstarnes', observationId: 224012626 },
    { title: 'Stephanitis typica', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/345812310/small.jpeg',
      author: 'klearad', observationId: 196421662 },
    { title: 'Musgraveia sulciventris', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/344195570/small.jpeg',
      author: 'maxcampbell', observationId: 195621598 }
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
    { title: 'Subfamily Cicadinae', img:'https://inaturalist-open-data.s3.amazonaws.com/photos/403333253/small.jpg',
      author: 'gemela-dos', observationId: 227361456 },
    { title: 'Magicicada cassinii', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/383715946/small.jpg',
      author: 'peterwchen', observationId: 216940156 },
    { title: 'Psaltoda plaga', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/446784208/small.jpeg',
      author: 'erinkidd', observationId: 249884643 },
    { title: 'Megatibicen resh', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/410415802/small.jpeg',
      author: 'dragondrew7', observationId: 230943284 }
  ];

  const limulidaeImages = [
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/333099014/small.jpeg',
      author: 'livanescudero', observationId: 190067890 },
    { title: 'Tachypleus tridentatus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/431670497/small.jpeg',
      author: 'christinanorman', observationId: 242152264 },
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/11616612/small.jpg',
      author: 'ewilhi', observationId: 8671168 },
    { title: 'Limulus polyphemus', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/10970136/small.jpg',
      author: 'crbnaturalist', observationId: 8270635 }
  ];

  const araneaeImages = [
    { title: 'Pseudeuophrys lanigera', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/435020081/small.png',
      author: 'justinchans', observationId: 243920395 },
    { title: 'Eustala', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/315146549/small.jpeg',
      author: 'emiliocorrea320', observationId: 180874175 },
    { title: 'Badumna longinqua', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/394711589/small.jpeg',
      author: 'aynature', observationId: 222802384 },
    { title: 'Phidippus johnsoni', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/486208393/small.jpeg',
      author: 'calebcam', observationId: 270611184 }
  ];

  const coccinellidaeImages = [
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/412688650/small.jpeg',
      author: 'blueranchu', observationId: 232300987 },
    { title: 'Illeis koebelei', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/410856402/small.jpg',
      author: 'melvynyeo', observationId: 231335115 },
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/207420039/small.jpg',
      author: 'seigmond', observationId: 122508700 },
    { title: 'Harmonia axyridis', img: 'https://inaturalist-open-data.s3.amazonaws.com/photos/358134799/small.jpeg',
      author: 'cephalogoddess', observationId: 202757025 }
  ];


  useEffect(() => {
    setImages(moultingImages);
    setKeywords(cicadaImages);

    setTimeout(() => {
      setSliderKey(prev => prev + 1);
    }, 100);
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    switch (tab) {
      case '#Pre-Moult': setImages(preMoultImages); break;
      case '#Moulting': setImages(moultingImages); break;
      case '#Post-Moult': setImages(postMoultImages); break;
      case '#Exuviae': setImages(exuviaeImages); break;
      default: setImages(moultingImages);
    }
  };

  const handleTabClick2 = (tab) => {
    setSelectedTab2(tab);
    switch (tab) {
      case '#Cicadomorpha': setKeywords(cicadaImages); break;
      case '#Limulidae': setKeywords(limulidaeImages); break;
      case '#Araneae': setKeywords(araneaeImages); break;
      case '#Coccinellidae': setKeywords(coccinellidaeImages); break;
      default: setKeywords(cicadaImages);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <div className="carousel-section">

      {/* MOULTING STAGE */}
      <div className="title-hd">
        <h2>MOULTING STAGE</h2>
        <a className="viewall" onClick={e => { e.stopPropagation(); handleViewAllClickStage(); }}>View all {'>'}</a>
      </div>

      {(
        <div className="tabs">
          <ul className="tab-links">
            <li className={selectedTab === '#Pre-Moult' ? 'active' : ''} onClick={() => handleTabClick('#Pre-Moult')}>#PRE-MOULT</li>
            <li className={selectedTab === '#Moulting' ? 'active' : ''} onClick={() => handleTabClick('#Moulting')}>#MOULTING</li>
            <li className={selectedTab === '#Post-Moult' ? 'active' : ''} onClick={() => handleTabClick('#Post-Moult')}>#POST-MOULT</li>
            <li className={selectedTab === '#Exuviae' ? 'active' : ''} onClick={() => handleTabClick('#Exuviae')}>#EXUVIAE</li>
          </ul>
          <Slider key={sliderKey} {...settings}>
            {images.map((img, i) => (
              <div key={i} className="slide-it">
                <div className="species-item">
                  <Link to={`/observations/${img.observationId}`}>
                    <div className="mv-img"><img src={img.img} alt={img.title} /></div>
                    <div className="title-in">
                      <h6>{img.title}</h6>
                      <p><i className="ion-android-star"></i><span>{img.author}</span></p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* TAXONOMIC GROUP */}
      <div className="title-hd">
        <h2>TAXONOMIC GROUP</h2>
        <a className="viewall" onClick={e => { e.stopPropagation(); handleViewAllClickKeyword(); }}>View all {'>'}</a>
      </div>

      {(
        <div className="tabs">
          <ul className="tab-links">
            <li className={selectedTab2 === '#Cicadomorpha' ? 'active' : ''} onClick={() => handleTabClick2('#Cicadomorpha')}>#CICADOMORPHA</li>
            <li className={selectedTab2 === '#Limulidae' ? 'active' : ''} onClick={() => handleTabClick2('#Limulidae')}>#LIMULIDAE</li>
            <li className={selectedTab2 === '#Araneae' ? 'active' : ''} onClick={() => handleTabClick2('#Araneae')}>#ARANEAE</li>
            <li className={selectedTab2 === '#Coccinellidae' ? 'active' : ''} onClick={() => handleTabClick2('#Coccinellidae')}>#COCCINELLIDAE</li>
          </ul>
          <Slider key={sliderKey} {...settings}>
            {Keywords.map((img, i) => (
              <div key={i} className="slide-it">
                <div className="species-item">
                  <Link to={`/observations/${img.observationId}`}>
                    <div className="mv-img"><img src={img.img} alt={img.title} /></div>
                    <div className="title-in">
                      <h6>{img.title}</h6>
                      <p><i className="ion-android-star"></i><span>{img.author}</span></p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

    </div>
  );
};

export default Carusel;

