import React from 'react';
import Button from '@material-ui/core/Button'
import { Icon, IconButton, FormControl, InputLabel, Input } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setEmail, setUid, setUserName, setView } from '../redux/user';
import { SvgIcon } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import { signInWithGoogle } from '../util/Firebase';
import NumberFormat from 'react-number-format';
import { signInWithPhone } from '../util/Firebase';
import firebase from 'firebase';

function PhoneNumberFormat(props) {
  const { inputRef, onChange, ...other } = props;
  
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="+1 (###) ###-####"
      isNumericString
      allowEmptyFormatting mask="_"
    />
  );
}

function VerificationCodeFormat(props) {
  const { inputRef, onChange, ...other } = props;
  
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="#-#-#-#-#-#"
      isNumericString
      allowEmptyFormatting mask="_"
    />
  );
}
export default function Home() {
    const dispatch = useDispatch()
    const [phoneInput, setPhoneInput] = React.useState()
    const [verificationCode, setVerificationCode] = React.useState()
    const [phoneVisible, setPhoneVisible] = React.useState(false)
    const [codeVisible, setCodeVisible] = React.useState(false)
    const [signInVisible, setSignInVisible] = React.useState(true)
    const divStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'rgba(64, 112, 191, 0.6)'
      }

    const buttonStyle = {
      backgroundColor: 'rgb(64,112,191)',
      color: 'white',
      margin: '20px'
    }

    const inputStyle = {
      fontSize: '5em',
      color: 'white'
    }

    const inputLabelStyle = {
      color: 'white'
    }

    const handleSignInGoogle = () => {
      setSignInVisible(false)
      signInWithGoogle().then(result => {
        dispatch(setUserName(result.user.displayName))
        dispatch(setEmail(result.user.email))
        dispatch(setUid(result.user.uid))
        dispatch(setView('UserHome'))        
      }).catch((error) => {
        console.log('Something went wrong')
      })
    }

    const handleSignInPhone = () => {
      setSignInVisible(false)
      setPhoneVisible(true)
    }
    

    const handlePhoneChange = (event) => {
      console.log("event")

      setPhoneInput(event.target.value)
      console.log(phoneInput)
      if (event.target.value.length === 10 && phoneVisible) {
        
        let number = '+1 650-123-4567';
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log('signin')
             
            }
        });
        console.log(event.target.value)
        signInWithPhone(number, recaptcha).then(() => {
          console.log(window.result)
          setPhoneVisible(false)
          setCodeVisible(true)
        }) 
      }
    

    }

    const handleCodeChange = (event) => {
      console.log("event")

      setVerificationCode(event.target.value)
      
      if (event.target.value.length === 6 && codeVisible) {
        window.result.confirm(event.target.value).then(result => {
          console.log('code successful')
          console.log(result)
          dispatch(setView('UserHome'))
        })
      }

    }
      return (
        <div className="App">
          <div style={divStyle}>
            <div style={{color: 'white', fontFamily: 'phosphate'}}>
              <h1>Boots</h1>
              <p>Plan your day trip</p>
              <div style={signInVisible ? {} : {display: 'none'}}>
                <div style={{width: '100%'}}>
                <Button style={buttonStyle} onClick={() => handleSignInGoogle()}>
                  <SvgIcon>
                  <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                  </SvgIcon>
                  Sign In with Google
                </Button>
                </div>
                <div style={{width: '100%'}}>
                  <Button style={buttonStyle} onClick={() => handleSignInPhone()}>
                    <PhoneIcon/>
                    Sign In with Phone Number
                  </Button>
                            
                </div>
              </div>
              
              <FormControl>
                  <div style={phoneVisible ? {} : {display: 'none'}} >
                    <InputLabel style={inputLabelStyle} htmlFor="formatted-text-mask-input">Enter phone number</InputLabel>
                    <Input
                    style={inputStyle}
                    value={phoneInput}
                    onChange={handlePhoneChange}
                    name="textmask"
                    id="formatted-text-mask-input"
                    inputComponent={PhoneNumberFormat}
                    />
                    <div id="recaptcha" ></div>
                  </div>
                 
                </FormControl>    
                <FormControl>
                  <div style={codeVisible ? {} : {display: 'none'}}>
                      <InputLabel style={inputLabelStyle} htmlFor="formatted-text-mask-input1">Enter verification code</InputLabel>
                        <Input
                        style={inputStyle}
                        value={verificationCode}
                        onChange={handleCodeChange}
                        name="verificatonCode"
                        id="formatted-text-mask-input1"
                        inputComponent={VerificationCodeFormat}
                        />
                    </div>
                </FormControl>
            </div>
          </div>
         
        </div>
      
      );
}