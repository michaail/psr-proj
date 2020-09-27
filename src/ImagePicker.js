import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';
import {Storage, API} from 'aws-amplify';

class ImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      file: null,
      buttonDisabled: false,
    }
  }

  handleChange = (file) => {
    this.setState({ 
      file,
    });
  }

  handleClick = async () => {
    this.setState({ buttonDisabled: true })
    const {file} = this.state;
    const filename = `${Date.now()}-${file.name}`;
    const {key} = await Storage.vault.put(filename, file, {
      contentType: 'image/jpeg'
    });
    this.setState({ buttonDisabled: false })
    console.log(key);
    alert(`recipt uploaded with key: ${key}`)
    return key;
  }

  render() {
    
    return (
      <div>
        <Input type='file' onChange={(e) => this.handleChange(e.target.files[0])} />
        <Button primary disabled={this.state.buttonDisabled} onClick={() => this.handleClick()}>Upload</Button>
      </div>
    )
  }
}

export default ImagePicker;