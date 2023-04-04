import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import './video-viewer.css';
import { ChevronRight } from 'react-bootstrap-icons';
import brachypelmaphoto from "../../assets/images/uploads/youtube_preview/brachypelma.png";
import butterflyphoto from "../../assets/images/uploads/youtube_preview/butterfly.png";
import cicadaphoto from "../../assets/images/uploads/youtube_preview/cicada.png";
import cockroachphoto from "../../assets/images/uploads/youtube_preview/cockroach.png";
import limulusphoto from "../../assets/images/uploads/youtube_preview/limulus.png";
import scolopendraphoto from "../../assets/images/uploads/youtube_preview/scolopendra.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoSlideNav = ({ src, desc, time }) => {
    return <div className="item">
        <div className="youtube-img">
            <img src={src} alt={desc} />
        </div>
        <div className="youtube-infor">
            <h4 className="desc">{desc}</h4>
            <p>{time}</p>
        </div>

    </div>;
}

const VideoSlide = ({ src, title }) => {
    return <div>
        <iframe width="560" height="315" src={src}
                title={title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
    </div>;
}

export default class VideoViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        return <div className="youtube bg-custom-dark">
            <div className="container">
                <div className="row ipad-width">
                    <div className="col-md-12">
                        <div className="title-hd">
                            <h2>Youtube</h2>
                            <Link to="/explore/videos" className="viewall">View all <ChevronRight/></Link>
                        </div>
                        <div className="videos">
                            <div id={"video-slider"} className="video-ft">
                                <Slider
                                    asNavFor={this.state.nav2}
                                    ref={slider => (this.slider1 = slider)}
                                    arrows={false}
                                >
                                    <VideoSlide src={"https://www.youtube.com/embed/QeZPtXkBPtM?start=3"} title={"Tube video player"} />
                                    <VideoSlide src={"https://www.youtube.com/embed/rv3B9649P0c"} title={"Tube video player"} />
                                    <VideoSlide src={"https://www.youtube.com/embed/ocWgSgMGxOc"} title={"Tube video player"} />
                                    <VideoSlide src={"https://www.youtube.com/embed/QRPlrTU6XGQ"} title={"Tube video player"} />
                                    <VideoSlide src={"https://www.youtube.com/embed/b_kfa9x-aKs"} title={"Tube video player"} />
                                    <VideoSlide src={"https://www.youtube.com/embed/fPm2KBXHYZc"} title={"Tube video player"} />
                                </Slider>
                            </div>
                            <div id={"video-slider-nav"} className=" thumb-ft">
                                <Slider
                                    asNavFor={this.state.nav1}
                                    ref={slider => (this.slider2 = slider)}
                                    slidesToShow={3}
                                    slidesToScroll={1}
                                    focusOnSelect={true}
                                    dots={false}
                                    arrows={true}
                                    vertical={true}
                                >
                                    <VideoSlideNav src={brachypelmaphoto} desc={"Brachhypelma boehmei moulting"} time={"2:15"}/>
                                    <VideoSlideNav src={cicadaphoto} desc={"Cicada moulting timelapse"} time={"1:07"}/>
                                    <VideoSlideNav src={butterflyphoto} desc={"Butterfly methamorphosis"} time={"2:43"}/>
                                    <VideoSlideNav src={limulusphoto} desc={"Horseshoe crab moulting"} time={"1:31"}/>
                                    <VideoSlideNav src={scolopendraphoto} desc={"Scolopendra gigantea moulting"} time={"2:11"}/>
                                    <VideoSlideNav src={cockroachphoto} desc={"Gromphadorhina portentosa"} time={"2:05"}/>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            ;
    }
}
