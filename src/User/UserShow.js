import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import { async } from 'q';

export default  class UserShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            redirect:false
        }
    }

    componentDidMount = async ()=>{
       await fetch(`https://mpbinarsiang.herokuapp.com/user/${this.props.match.params.id}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data, 'ini data')
            if(data.success){
            this.setState({
                user:data.data
            })
        }else{
            this.setState({
                redirect:true
            })
        }
        })
    }    

    render(){
        if(this.state.redirect){
            return(
                <Redirect to='/' />
            )
        }
        return(
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
            </div>
        )
    }
}