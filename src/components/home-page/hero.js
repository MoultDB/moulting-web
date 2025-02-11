import React from 'react';
import './hero.css';
import Slider from "react-slick";
import AuthService from "../../services/auth.service";
import SocialLinks from "../common/social-links";
import TaxonItem from './taxonitem';

const HeroSlider = ({ images }) => {
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
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    // Taxon images with path mapping
    const taxonImages = [
        { src: images[0], taxonName: "Chelicerata", path: "chelicerata", description: "Photo by huttonia" },
        { src: images[1], taxonName: "Myriapoda", path: "myriapoda", description: "Photo by melvynyeo" },
        { src: images[2], taxonName: "Crustacea", path: "crustacea", description: "Photo by melvynyeo" }, 
        { src: images[3], taxonName: "Hexapoda", path: "hexapoda", description: "Photo by gillessanmartin"}
    ];

    return (
        <div className="hero-slider">
            <Slider {...settings}>
                {taxonImages.map((item, index) => (
                    <TaxonItem key={index} src={item.src} taxonName={item.taxonName} path={item.path} description={item.description} />
                ))}
            </Slider>
        </div>
    );
};

export default class Hero extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            images: []
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser });

        const urls = [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/405101307/medium.jpeg', // Chelicerata
            'https://inaturalist-open-data.s3.amazonaws.com/photos/412140258/large.jpg', // Myriapoda
            'https://inaturalist-open-data.s3.amazonaws.com/photos/412460648/large.jpg', // Crustacea
            'https://inaturalist-open-data.s3.amazonaws.com/photos/384958717/medium.jpg' // Hexapoda
        ];

        this.setState({ images: urls });
    }

    render() {
        return (
            <div className="slider photo-items">
                <div className="container">
                    <div className="row">
                        <div className="social-link">
                            <p>Follow us: </p>
                            <SocialLinks />
                        </div>

                        <div className="description">
                            <h1>Contribute to Science!</h1>
                            <p>
                            This site is dedicated to citizen science, focusing on the study of arthropod molting through our 
                            iNaturalist project. Join us by contributing photos or observations of this fascinating process. 
                            Your contributions will be shared online, with full credit to you. Explore the diverse collection 
                            of images and data directly from iNaturalist and help advance our understanding of arthropod biology.
                            </p>
                        </div>

                        <HeroSlider images={this.state.images} />

                        <div className="hero-button">
                            <div className="button-wrapper">
                                <a href="https://www.inaturalist.org/projects/moulting-arthropods"
                                   rel="noopener noreferrer"
                                   target="_blank"
                                   className="pushable red-button">
                                    <span className="front">Go to iNaturalist</span>
                                </a>

                                <a href="/tutorial"
                                   className="pushable white-button">
                                    <span className="front">How to upload</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
