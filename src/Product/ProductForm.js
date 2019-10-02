import React, { createRef } from 'react';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import axios from 'axios'

var dropzoneRef = createRef()

export default class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    // This function does the uploading to cloudinary
    handleUploadImages
     = images => {
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        const uploads = images.map(image => {
            // our formdata
            const formData = new FormData();
            formData.append("file", image);
            formData.append("tags", 'PRODUCT_IMAGE'); // Add tags for the images - {Array}
            formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
            formData.append("api_key", "234688971755288"); // Replace API key with your own Cloudinary API key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Replace cloudinary upload URL with yours
            return axios.post(
                "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
                formData,
                { headers: { "X-Requested-With": "XMLHttpRequest" } })
                .then(response => console.log(response.data))
        });

        // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
        axios.all(uploads).then(() => {
            // ... do anything after successful upload. You can setState() or save the data
            console.log('Images have all being uploaded')
        });
    }
    render() {
        return (
            <Container>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Nama Produk</Label>
                                <Input type="text" name="email" id="exampleEmail" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Harga Produk</Label>
                                <Input type="text" name="password" id="examplePassword" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="dropzone">Upload Gambar</Label>
                        <Dropzone id='dropzone' ref={dropzoneRef} onDrop={this.handleUploadImages}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img style={{ width: 100 }} src="https://image.flaticon.com/icons/png/512/3/3901.png" alt="" srcset="" />
                                </div>
                            )}
                        </Dropzone>
                    </FormGroup>

                    <Button onC>Sign in</Button>
                </Form>
            </Container>
        );
    }
}