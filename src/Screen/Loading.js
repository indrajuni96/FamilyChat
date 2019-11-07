import React, { Component } from "react"
import * as firebase from "firebase"

class Loading extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                console.log('Logged in!!!')
                this.props.navigation.replace('Friend')
            } else {
                this.props.navigation.replace('Login')
            }
        })
    }

    render() {
        return (
            <>
            </>
        )
    }
}

export default Loading