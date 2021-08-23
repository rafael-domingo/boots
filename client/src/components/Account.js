import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithPhone } from '../util/Firebase';
import firebase from 'firebase';

export default function Account() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handlePhoneClick = () => {
        let number = '+1 650-123-4567';
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log('signin')
             
            }
        });
        signInWithPhone(number, recaptcha)

    }
    return (
        <div>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.uid}</p>
            <button type="submit" id="recaptcha" onClick={() => handlePhoneClick()}>Sign in With Phone</button>
        </div>
    )
}