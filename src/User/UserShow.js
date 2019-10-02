import React from 'react';
import { Jumbotron, Button,  ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect } from 'react-router-dom'


export default class UserShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            redirect: false,
            userProducts:[]
        }
    }

    componentDidMount = () => {
        fetch(`https://mpbinarsiang.herokuapp.com/user/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {

                if (data.success) {
                    this.setState(state=>({
                        user: data.data,
                        userProducts: [...state.userProducts, ...data.data.products]
                    }))
                } else {
                    this.setState({
                        redirect: true
                    })
                }
                // console.log(this.state.userProducts, "INI state")
            })
            
    }

    render() {
        var allProducts = this.state.userProducts.map(product=>{
            return(
                <div key={product._id}>
                    <ListGroupItem>
                        <img src={product.image} alt=""/>
                        <p>{product.name}</p>
                    </ListGroupItem>
                </div>
            )
        })

        if (this.state.redirect) {
            return (
                <Redirect to='/' />
            )
        }else{
            return (
                <div>
                    <Jumbotron>
                        <h1 className="display-3">Hello, {this.state.user.username}</h1>
                        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-2" />
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                            <Button color="primary">Learn More</Button>
                        </p>
                    </Jumbotron>
                    <div>
                        {allProducts}
                    </div>
                </div>
            )
        }

    }
}