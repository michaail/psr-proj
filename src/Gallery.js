import React, {Component} from 'react';
import {Card, Button, Image} from 'semantic-ui-react';
import {Storage} from 'aws-amplify';

Storage.configure({level: 'private'});

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }

  // componentDidMount = async () => {
  //   const res = await Storage.list('/');
  //   this.setState({
  //     list: res,
  //   });
  // }

  render() {

    return (
      <div>
        Gallery
        <Image src={this.state.list} size='small' />
      </div>
    )
  }
}

export default Gallery;