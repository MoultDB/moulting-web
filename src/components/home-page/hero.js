import React from 'react';
import './hero.css';
import { Link } from "react-router-dom";
import {Facebook, Instagram, Mastodon, Twitter} from 'react-bootstrap-icons';
import chelicherata from "../../assets/images/uploads/main_slider/chelicherata.jpg";
import myriapoda from "../../assets/images/uploads/main_slider/myriapoda.jpg";
import crostacea from "../../assets/images/uploads/main_slider/crostacea.jpg";
import hexapoda from "../../assets/images/uploads/main_slider/hexapoda.jpg";
import Slider from "react-slick";

const TaxonItem = ({ src, title, speciesCount }) => {
    const href = "/taxon/" + title;
    return <div className="photo-item">
        <Link to={href}>
            <div className="ph-img">
                <img src={src} alt={title}/>
            </div>
            <div className="title-in">
                <h6>{title}</h6>
                <p><span>{speciesCount}</span> Species uploaded</p>
            </div>
        </Link>
        </div>
    }
;

const HeroSlider = () => {
    const settings = {
        slidesToShow: 4,
        dots: false,
        autoplay: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            <TaxonItem src={chelicherata} title={"Chelicherata"} speciesCount={258}/>
            <TaxonItem src={myriapoda} title={"Myriapoda"} speciesCount={138}/>
            <TaxonItem src={crostacea} title={"Crustacea"} speciesCount={86}/>
            <TaxonItem src={hexapoda} title={"Hexapoda"} speciesCount={207}/>
        </Slider>
    );
}

export default class Hero extends React.Component {
    render() {
        return <div className="slider photo-items">
            <div className="container">
                <div className="row">
                    <div className="social-link">
                        <p>Follow us: </p>
                        <a href="https://www.facebook.com/groups/402623715250579" rel="noopener noreferrer" target="_blank"><Facebook/></a>
                        <a href="https://twitter.com/moultdb" rel="noopener noreferrer" target="_blank"><Twitter/></a>
                        <a href="https://www.instagram.com/moultdb/" rel="noopener noreferrer" target="_blank"><Instagram/></a>
                        <a href="https://ecoevo.social/@moultdb" rel="noopener noreferrer" target="_blank"><Mastodon/></a>
                    </div>

                    <div className="description">
                        <h1> Contribute to Science! </h1>
                        This is a citizen science project to gather information on arthropod moulting. You will
                        become a nature reporter, posting photos, videos or any kind of information you can glean
                        about this fashinating process. As part of this community and working together towards the
                        same goal, all the information are posted online, acknowledging the reporter who contributed
                        the data.
                    </div>

                    <div className="slick-multiItemSlider">
                        <HeroSlider />
                    </div>

                    <Link to="./contribute/photo-upload" className="hero-button" >Let's start </Link>

                </div>
            </div>
        </div>;
    }
}
