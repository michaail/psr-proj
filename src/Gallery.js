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
    const t = Storage.list('/')

    await this.getKeys();
  }

  getKeys = async () => {
    const res = await API.get('testApiCall', '/getKeys');
    this.setState({
      list: res,
    });
    console.log(res);

    // await Storage.vault.put(filename, file, {
    //   contentType: 'image/jpeg'
    // });
  }

  handleCLick = async () => {
    const d = await API.get('testApiCall', '/t1');
    console.log(d);
  }

  render() {

    return (
      <div>
        Gallery
        
        <Button onClick={() => this.handleCLick()}>Call API</Button>
      </div>
    )
  }
}

export default Gallery;