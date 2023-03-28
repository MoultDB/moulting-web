import React from 'react';
import {Link} from "react-router-dom";
import Slider from "react-slick";
import moultinginsect1 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_1.jpg";
import moultinginsect2 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_2.jpg";
import moultinginsect3 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_3.jpg";
import moultinginsect4 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_4.jpg";
import moultinginsect5 from "../../assets/images/uploads/photo_carusel/moulting_insect/photo_5.jpg";
import tarantula1 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_1.jpg";
import tarantula2 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_2.jpg";
import tarantula3 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_3.jpg";
import tarantula4 from "../../assets/images/uploads/photo_carusel/tarantula_moulting/photo_4.jpg";
import contributorgiulia from "../../assets/images/uploads/top_contributors/giulia.jpg";
import contributormarc from "../../assets/images/uploads/top_contributors/marc.jpg";
import contributorkenny from "../../assets/images/uploads/top_contributors/kenny.jpg";
import contributormichele from "../../assets/images/uploads/top_contributors/roar.jpg";
import {CaretRightFill, StarFill, ChevronRight} from 'react-bootstrap-icons';
import './last-updates.css';

const $ = require('jquery');


const ImageSlide = ({ src, title, likeCount, href }) => {
    return <div className="slide-it">
        <div className="photo-item">
            <Link to={href}>
                <div className="ph-img">
                    <img src={src} alt={title} />
                </div>
                <div className="hvr-inner">Open <CaretRightFill /></div>
                <div className="title-in">
                    <h6>{title}</h6>
                    <p><StarFill color={"#f5b50a"} size={18}/><span> {likeCount}</span> likes</p>
                </div>
            </Link>
        </div>
    </div>;
}

const Contributor = ({ src, title, uploadCount, href }) => {
    return <Link to={href}>
        <div className="contr-item">
            <img src={src} alt={title} width="70" height="70"/>
            <div className="contr-author">
                <h6>{title}</h6>
                <span>{uploadCount} uploads</span>
            </div>
        </div>
    </Link>
}

export default class LastUpdates extends React.Component {

    componentDidMount() {
        var tabsClick = $('.tabs .tab-links a');
        tabsClick.on('click', function(e)  {
            var newTabAttrValue = $(this).attr('href');
            var newTab = $('.tabs ' + newTabAttrValue);
            // Show new tab content and hide all other contents
            newTab.show().siblings().hide();
            // Add 'active' to new tab name and remove it for all other tab names
            $(this).parent('li').addClass('active').siblings().removeClass('active');
            e.preventDefault();
        });
    }

    render() {
        var settings = {
            slidesToShow: 2,
            dots: true,
            centerMode: true,
            autoplay: true,
            arrows: false,
            adaptiveHeight: false
        };
        return <div className="photo-items">
            <div className="container">
                <div className="row ipad-width">
                    <div className="col-md-8">

                        <div className="title-hd">
                            <h2>Last uploaded Photos</h2>
                            <Link to="/explore/photos" className="viewall">View all <ChevronRight/></Link>
                        </div>

                        <div className="tabs">
                            <ul className="tab-links">
                                <li className="active"><a href="#moultinginsectimages">#moultinginsect</a></li>
                                <li><a href="#tarantulamoltingimages">#tarantulamolting</a></li>
                            </ul>
                            <div className="tab-content">
                                <div id="moultinginsectimages" className="tab active">
                                    <div className="wrapper">
                                        <Slider {...settings}>
                                            <ImageSlide src={moultinginsect1} title={"moultinginsect 1"} likeCount={101}
                                                     href={"/taxon/moultinginsect1.html"}/>
                                            <ImageSlide src={moultinginsect2} title={"moultinginsect 2"} likeCount={102}
                                                     href={"/taxon/moultinginsect2.html"}/>
                                            <ImageSlide src={moultinginsect3} title={"moultinginsect 3"} likeCount={103}
                                                     href={"/taxon/moultinginsect3.html"}/>
                                            <ImageSlide src={moultinginsect4} title={"moultinginsect 4"} likeCount={104}
                                                     href={"/taxon/moultinginsect4.html"}/>
                                            <ImageSlide src={moultinginsect5} title={"moultinginsect 5"} likeCount={105}
                                                     href={"/taxon/moultinginsect5.html"}/>
                                        </Slider>
                                    </div>
                                </div>

                                <div id="tarantulamoltingimages" className="tab">
                                    <div className="wrapper">
                                        <Slider {...settings}>
                                            <ImageSlide src={tarantula1} title={"tarantula 1"} likeCount={105}
                                                     href={"/taxon/tarantula1.html"}/>
                                            <ImageSlide src={tarantula2} title={"tarantula 2"} likeCount={106}
                                                     href={"/taxon/tarantula2.html"}/>
                                            <ImageSlide src={tarantula3} title={"tarantula 3"} likeCount={107}
                                                     href={"/taxon/tarantula3.html"}/>
                                            <ImageSlide src={tarantula4} title={"tarantula 4"} likeCount={108}
                                                     href={"/taxon/tarantula4.html"}/>
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="title-hd">
                            <h2>Last uploaded Videos</h2>
                            <Link to="/explore/videos" className="viewall">View all <ChevronRight/></Link>
                        </div>

                        <div className="tabs">
                            <ul className="tab-links">
                                <li className="active"><a href="#topratedvideos">#top rated</a></li>
                                <li><a href="#mostcommentedvideos">#most commented</a></li>
                            </ul>
                            <div className="tab-content">
                                <div id="topratedvideos" className="tab active">
                                    <div className="wrapper">
                                        <Slider {...settings}>
                                            <ImageSlide src={moultinginsect1} title={"moultinginsect 1"} likeCount={101}
                                                     href={"/taxon/moultinginsect1.html"}/>
                                            <ImageSlide src={moultinginsect2} title={"moultinginsect 2"} likeCount={102}
                                                     href={"/taxon/moultinginsect2.html"}/>
                                            <ImageSlide src={moultinginsect3} title={"moultinginsect 3"} likeCount={103}
                                                     href={"/taxon/moultinginsect3.html"}/>
                                            <ImageSlide src={moultinginsect4} title={"moultinginsect 4"} likeCount={104}
                                                     href={"/taxon/moultinginsect4.html"}/>
                                            <ImageSlide src={moultinginsect5} title={"moultinginsect 5"} likeCount={105}
                                                     href={"/taxon/moultinginsect5.html"}/>
                                        </Slider>
                                    </div>
                                </div>

                                <div id="mostcommentedvideos" className="tab">
                                    <div className="wrapper">
                                        <Slider {...settings}>
                                            <ImageSlide src={tarantula1} title={"tarantula 1"} likeCount={105}
                                                     href={"/taxon/tarantula1.html"}/>
                                            <ImageSlide src={tarantula2} title={"tarantula 2"} likeCount={106}
                                                     href={"/taxon/tarantula2.html"}/>
                                            <ImageSlide src={tarantula3} title={"tarantula 3"} likeCount={107}
                                                     href={"/taxon/tarantula3.html"}/>
                                            <ImageSlide src={tarantula4} title={"tarantula 4"} likeCount={108}
                                                     href={"/taxon/tarantula4.html"}/>
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="sidebar">
                            <div className="twitter-timeline">
                                <a href="https://twitter.com/moultdb?ref_src=twsrc%5Etfw"
                                   rel="noopener noreferrer" target="_blank">Tweets by moultdb</a>
                            </div>
                            <div className="contributors">
                                <h4 className="sb-title">Top Contributors</h4>
                                <Contributor src={contributorgiulia} title={"#1 Giulia Zancolli"}
                                             uploadCount={36} href={"/contributor/giulia-zancolli"} />
                                <Contributor src={contributormichele} title={"#2 Michele Leone"}
                                             uploadCount={18} href={"/contributor/michele-leone"} />
                                <Contributor src={contributormarc} title={"#3 Marc Robinson-Rechavi"}
                                             uploadCount={12} href={"/contributor/marc-robinson-rechavi"} />
                                <Contributor src={contributorkenny} title={"#4 Kenneth Kim"}
                                             uploadCount={8} href={"/contributor/kenneth-kim"} />
                                <Link to="/contributor" className="btn">See all contributors<ChevronRight /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
