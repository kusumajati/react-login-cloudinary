import React, { createRef } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

var dropzoneRef = createRef()

export default class ProductForm2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            name:'',
            price:''
        }
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.createProduct = this.createProduct.bind(this)

    }
    createProduct(event){
        event.preventDefault()
        fetch('https://mpbinarsiang.herokuapp.com/product', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('TOKEN')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                name: this.state.name,
                price: this.state.price,
                image: this.state.image 
            }) // body data type must match "Content-Type" header
          }).then(response => response.json())
          .then(data=>{
              console.log('PRODUCT CREATED', data)
              this.props.history.push('/')
          })
    }
    onChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }
    onChangePrice(event) {
        this.setState({
            price: event.target.value
        })
    }
    // This function does the uploading to cloudinary
    handleUploadImages = images => {
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        const uploads = images[0]
        // our formdata
        const formData = new FormData();
        formData.append("file", uploads);
        formData.append("tags", 'product_image'); // Add tags for the images - {Array}
        formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
        formData.append("api_key", "234688971755288"); // Replace API key with your own Cloudinary API key
        formData.append("timestamp", (Date.now() / 1000) | 0);

        // Replace cloudinary upload URL with yours
        return axios.post(
            "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
            formData,
            { headers: { "X-Requested-With": "XMLHttpRequest" } })
            .then(response => {
                //masukan logic
                this.setState({
                    image: response.data.secure_url
                })
                console.log(this.state.image, "INI STATE IMAGE")
            })



    }

    render() {
        var dropzone
        if (!this.state.image) {
            //dropzone nya gambar kamera
            dropzone =
                <Dropzone id='dropzone' ref={dropzoneRef} onDrop={this.handleUploadImages}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: '200px' }} src="https://www.mbsplugins.de/images/drop-files-here-extra.jpg" alt="" srcset="" />
                        </div>
                    )}
                </Dropzone>
        } else {
            //dropzonnya gambr dari response
            dropzone =
                <Dropzone id='dropzone' ref={dropzoneRef} onDrop={this.handleUploadImages}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: 100 }} src={this.state.image} alt="" srcset="" />
                        </div>
                    )}
                </Dropzone>
        }
        if (!localStorage.getItem('TOKEN')) {
            return (
                <Redirect to='/login' />
            )
        } else {


            return (
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Nama Produk</Label>
                        <Col sm={10}>
                            <Input onChange={this.onChangeName} type="text" name="email" id="exampleEmail" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>Harga Produk</Label>
                        <Col sm={10}>
                            <Input onChange={this.onChangePrice} type="number" name="password" id="examplePassword" />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for='dropzone'>Upload Gambar</Label>
                        {dropzone}
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button type='submit' onClick={this.createProduct}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }
    }
}