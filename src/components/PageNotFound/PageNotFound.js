import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class PageNotFound extends Component {
    render() {
        return (
            <>
                <Redirect
                    to={{
                        pathname: "/",
                        // state: { from: location }
                    }}
                />
            </>
        )
    }
}
