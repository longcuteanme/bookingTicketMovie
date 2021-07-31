import React, { Component } from "react";
import { Carousel } from "antd";
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {connect} from 'react-redux'
import './CarouselCompo.css'
import { LAY_DANH_SACH_BANNER_SAGA } from "../../../redux/constants/totalConstants";
import { Link } from "react-router-dom";

const divStyle = {
  width: "100%",
  height: "650px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const scrollToTop = () => {
  window.scrollTo({
    top:0,
    left:0,
    behavior: 'smooth'
  });
};

class CarouselCompo extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }
  displayPlayButton=()=>{
    this.setState({
      playButton:true
    })
  }
  hidePlayButton=()=>{
    this.setState({
      playButton:false
    })
  }
  renderCarousel = (content) => {
    return content.map((item, index) => {
      return (
        <Link to={`/ChiTiet/${item?.maPhim}`} onClick={scrollToTop} key={item}>
          <div className="flex items-center justify-center" key={index} style={{ backgroundImage: `url("${item.hinhAnh}")`, ...divStyle,}}>
          </div>
        </Link>
      );
    });
  };
  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }
  componentDidMount=()=>{
    this.props.dispatch({
      type:LAY_DANH_SACH_BANNER_SAGA
    })
  }
  // shouldComponentUpdate=(nextProps)=>{
  //   if(this.props.listBanner.length===0)
  //     return true
  //   else{
  //     const result=_.differenceWith(this.props.listBanner,nextProps.listBanner)
  //     return result.length!==0
  //   }
  // }
  render() {
    const settingCarousel = {
      dots: true,
      infinite: true,
      autoplaySpeed:2000,
      speed:500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="w-screen relative" style={{height:'650px'}} onMouseEnter={()=>{this.displayPlayButton()}} onMouseLeave={()=>{this.hidePlayButton()}}>
        <div className="" style={{zIndex:'1'}}>
          <Carousel ref={node => (this.carousel = node)} {...settingCarousel} autoplay>{this.renderCarousel(this.props.listBanner)}</Carousel>
        </div>
        <div className="h-full absolute left-0 top-0 z-90 flex items-center">
          <LeftOutlined className="iconCarousel" style={{color:'white'}} onClick={()=>{this.previous()}}/>
        </div>
        <div className="h-full absolute right-0 top-0 z-90 flex items-center">
        <RightOutlined className="iconCarousel" style={{color:'white'}} onClick={()=>{this.next()}}/>
        </div>
      </div>
    );
  }
}
export default connect((state)=>{
  return{
    listBanner:state.danhSachBannerReducer.listBanner
  }
})(CarouselCompo)