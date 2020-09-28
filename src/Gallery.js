import React, {Component} from 'react';
import {Card, Button, Image} from 'semantic-ui-react';
import {Storage, API} from 'aws-amplify';

Storage.configure({level: 'private'});

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }

  componentDidMount = async () => {
    const res = await API.get('testApiCall', '/getKey');
    this.setState({
      list: res,
    });
    console.log(res);
  }

  handleCLick = async () => {
    const d = await API.get('testApiCall', '/t1');
    console.log(d);
  }

  render() {

    return (
      <div>
        Gallery
        <Image src={this.state.list} size='small' />
        <Button onClick={() => this.handleCLick()}>Call API</Button>
      </div>
    )
  }
}

export default Gallery;