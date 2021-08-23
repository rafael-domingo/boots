import { Paper } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';
import React from 'react';

export default function Login({ state }) {
    const divStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const cardStyle = {
        width: '50%'
    }
    if (state === 'Login') {
        return (
            <div style={divStyle}>
                <Card style={cardStyle}>
                    <CardContent>
                    Login

                    </CardContent>
                </Card>
            </div>
        )
    }

    else if (state === 'SignUp') {
        return (
            <div>
                Sign Up
            </div>
        )
    }
}