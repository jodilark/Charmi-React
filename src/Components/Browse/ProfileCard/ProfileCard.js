import React, {Component} from "react";
import {Link} from "react-router-dom";
import $ from 'jquery';
import './ProfileCard.css';

export default class ProfileCard extends Component {

  componentDidMount() {
    console.log('component did mount...')
    $(document).ready(function () {
      $('#profileSlideClose').click(function () {
        console.log('hello')
        $('.profileSliderContainer').removeClass('profileSliderContainerOpen')
      })
    })
  }

  componentWillUnmount() {
    console.log('component unmounting...')
  }


  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <div className="browseImageWrapper">
            <div className='browseImage' style={{backgroundImage: `url(${this.props.primary_photo})`}}></div>
          </div>
          <div className="browseNameAge">
            {`${this.props.name}, ${this.props.age}`}
            <span>{`${this.props.home_town}, ${this.props.state_code}`}</span>
          </div>
        </div>
        <div className="profileSliderContainer">
          <div className="aboutWrapper">
            {/* <div className="aboutImage"><img src={this.props.primary_photo}/> </div> */}
            <div className="profileHeader">
              <div className="profileFirstName">{this.props.name}</div>
              <div className="ageLocation"> {this.props.age}
                - {this.props.home_town + "," + " "}{this.props.state_code}</div>
            </div>

            <h4>About Me</h4>
            <p>{this.props.about}</p>
            <hr/>
            <h4>School<span>{this.props.school}</span></h4>
            <h4>Work<span>&nbsp; {this.props.work}</span></h4>
            <h4>Height<span>{this.props.height}</span></h4>
            <h4>Relationship Readiness<span>{this.props.relationship_readiness}</span></h4>
            <hr/>
            <div className="profileSlideCloseContainer">
              <div id="profileSlideClose" className="fa fa-angle-down" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

