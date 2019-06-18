import React, { Component } from "react";
import styles from "./gifImage.module.css";

class GifImage extends Component {
  constructor(props) {
    super(props);
    this.gif = React.createRef();
    this.state = {
      play: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    /*global SuperGif*/
    this.rub = new SuperGif({
      gif: this.gif.current,
      progressbar_height: 0,
      auto_play: false,
      loop_mode: true,
      rubbable: true
    });

    this.rub.load(function() {
      console.log("oh hey, now the gif is loaded");
    });
  }

  componentWillUnmount() {}

  clickHandler() {
    if (this.state.play) {
      this.setState(
        {
          play: false
        },
        () => {
          this.rub.pause();
        }
      );
    } else {
      this.setState(
        {
          play: true
        },
        () => {
          this.rub.play();
        }
      );
    }
  }

  render() {
    const { data } = this.props;
    console.log("data");
    const downsizedStillGif = data.images.fixed_width_still.url;
    const playableGif = data.images.fixed_width_downsampled.url;

    return (
      <div className={styles.giphyImage} onClick={this.clickHandler}>
        {this.state.play ? (
          <i className={`fas fa-pause ${styles.hoverIcon}`} />
        ) : (
          <i className={`fas fa-play ${styles.hoverIcon}`} />
        )}
        <img
          ref={this.gif}
          src={downsizedStillGif}
          rel_animated_src={playableGif}
          rel_auto_play="0"
          rel_rubbable="1"
          alt="GIPHY"
        />
      </div>
    );
  }
}

export default GifImage;
