import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class UserAll extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        fetch("https://mpbinarsiang.herokuapp.com/user")
            .then(response => response.json())
            .then(data => {
                this.setState(state=>({
                    users:[...state.users, ...data.data]
                }))
                // console.log(this.state.users, 'INI STATE USERS')
            })

    }

    render() {
        var listOfUsers = this.state.users.map(user=>{
            return(
              <div key={user._id} >
                    <Link to={'/user/'+user._id}>
                    <ListGroupItem >{user.username}</ListGroupItem>
                    </Link>
                </div>
            )
        })



        return (
            <div>
                <ListGroup>
                    {listOfUsers}
                    {/* <Link to='/user-show'>
                        <ListGroupItem>Cras justo odio</ListGroupItem>
                    </Link>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Morbi leo risus</ListGroupItem>
                    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem> */}
                </ListGroup>
            </div>
        )
    }
}