import React from 'react';
import Button from '@material-ui/core/Button'
import { FormControl, InputLabel, Input, Dialog, DialogContent, DialogActions, Fab, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPhone, setProfilePicture, setTripList, setUid, setUserName, setView } from '../redux/user';
import { SvgIcon } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import { getUser, signInWithGoogle } from '../util/Firebase';
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
    const [dialog, setDialog] = React.useState(false)
    const mobile = useSelector(state => state.map.windowWidth)
    const divStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'rgba(64, 112, 191, 0.6)',        
      }

    const inputStyle = {
      fontSize: '3em',
      textAlign: 'center',      
      width: '100%',
      color: 'rgb(64,112,191)',
      // color: 'white'
    }

    const inputStyle1 = {
      fontSize: mobile ? '2em' : '3em',
      textAlign: 'center',      
      width: '100%',
      color: 'rgb(64,112,191)',
    }
    const inputLabelStyle = {
      // color: 'white'
    }

    const handleSignInGoogle = () => {
      signInWithGoogle().then(result => {        
        dispatch(setUserName(result.user.displayName))
        dispatch(setEmail(result.user.email))
        dispatch(setUid(result.user.uid))
        dispatch(setProfilePicture(result.user.photoURL))
        getUser().then(result => {          
          if (result.trips !== undefined) {
            dispatch(setTripList(result.trips))
            dispatch(setView('UserHome'))
          } else {
            dispatch(setView('Questions'))
          }
         
        }).catch((error) => {
          console.log('Error in getting user data')
        })
      }).catch((error) => {
        console.log('Something went wrong')
      })
    }

    const handleSignInPhone = () => {
      setPhoneVisible(true)
      setDialog(true)
    }
    

    const handlePhoneChange = (event) => {
      // keep track of phone input state
      setPhoneInput(event.target.value)

      if (event.target.value.length === 10 && phoneVisible) {        
        // Call recaptcha before calling SignIn API
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              
             
            }
        });
        // format phone number for Firebase Auth
        let number = '+1 ' + event.target.value
        signInWithPhone(number, recaptcha).then(() => {
          
          setPhoneVisible(false)
          setCodeVisible(true)
        }) 
      }    
    }

    const handleCodeChange = (event) => {
      // keep track of verification code input state
      setVerificationCode(event.target.value)
      
      // automatically check verification code once required length is reached
      if (event.target.value.length === 6 && codeVisible) {
        window.result.confirm(event.target.value).then(result => {
          console.log('code successful')
          
          dispatch(setUserName(result.user.displayName))
          dispatch(setEmail(result.user.email))
          dispatch(setPhone(result.user.phoneNumber))
          dispatch(setUid(result.user.uid))
          getUser().then(result => {
            if (result.trips !== undefined) {
              dispatch(setTripList(result.trips))
              dispatch(setView('UserHome'))
            } else {
              dispatch(setView('Questions'))
            }
       
          }).catch((error) => {
            console.log('Error in getting user data')
          })
        }).catch((error) => {
          // Reset Verification Code input if code is wrong
          console.log('Incorrect verification code, try again')
          setVerificationCode('')
        })
      }

    }
      return (
        <div className="App">
          <div style={divStyle}>
            <div style={{color: 'white'}}>
              <h1 style={{fontSize: '4em', fontFamily: 'Plaster, cursive'}}>BOOTS</h1>
              <p style={{fontSize: '2em', fontFamily: 'Orbitron, sans-serif'}}>plan your day trip</p>
              <Divider style={{backgroundColor: 'white'}}/>
              <div>
                <div style={{width: '100%'}}>
                  <p style={{fontSize: '1.5em'}}>Sign in</p>
                </div>
                <div style={{width: '100%'}}>
                  <Fab 
                    style={{backgroundColor: '#3f51b5', color: 'white', margin: '5px'}}
                    onClick={() => handleSignInGoogle()}
                  >
                    <SvgIcon>
                    <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                    </SvgIcon>
                  </Fab>
                  <Fab
                    color="primary"
                    onClick={() => handleSignInPhone()}
                    style={{margin: '5px'}}
                  >
                    <PhoneIcon/>
                  </Fab>
                
                            
                </div>
              </div>
              <Dialog open={dialog}>
                <DialogContent>
                <FormControl variant="outlined">
                  <div style={phoneVisible ? {} : {display: 'none'}} >
                    <InputLabel style={inputLabelStyle} htmlFor="formatted-text-mask-input">Enter phone number to sign in</InputLabel>
                    <Input
                    disableUnderline={true}
                    style={inputStyle1}
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
                  <div style={codeVisible ? {display:'flex', justifyContent: 'center'} : {display: 'none'}}>
                      <InputLabel style={inputLabelStyle} htmlFor="formatted-text-mask-input1">Enter verification code</InputLabel>
                        <Input
                        disableUnderline={true}
                        style={inputStyle}                  
                        value={verificationCode}
                        onChange={handleCodeChange}
                        name="verificatonCode"
                        id="formatted-text-mask-input1"
                        inputComponent={VerificationCodeFormat}
                        />
                    </div>
                </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button 
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setDialog(false)
                      setPhoneInput('')
                      setVerificationCode('')
                      setCodeVisible(false)
                      setPhoneVisible(false)
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              
            </div>
          </div>
         
        </div>
      
      );
}