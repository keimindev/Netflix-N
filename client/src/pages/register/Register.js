import {axiosInstance} from '../../config';
import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { storage } from '../../firebase';
import "./register.scss";

function Register() {
  
    const defaultPic = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(defaultPic);

    const [uploaded, setUploaded] = useState(0);

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const upload = (users) => {
      users.forEach( (user) => {
        const fileName = new Date().getTime() + user.label + user.file.name;
        const uploadTask = storage.ref(`/users/${fileName}`).put(user.file);
        uploadTask.on(
        "state_changes", 
        (snapshot) => {
          const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is" + progress + " % done.");
        }, 
        (err) => { console.log(err)
        }, 
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            setUser( (prev) => {
              return {...prev, [user.label]: url };
            });
            setUploaded(prev => prev + 1);
          });
        })
  
      }) 
    }


    const handleStart = () => {
      setEmail(emailRef.current.value)
    }

    const handleFinish = () => {
      setPassword(passwordRef.current.value);
    }

    const onChangeHandle = (evt) => {
         if(evt.target.files.length){
             var imgTarget = (evt.target.files)[0];
             var fileReader = new FileReader();
             fileReader.readAsDataURL(imgTarget);
             fileReader.onload = function(e) {
              setProfilePic(e.target.result);
             }
         }else{
             setProfilePic(defaultPic);
         }
     }


     const handleUpload = (e) => {
      e.preventDefault();
      upload( [
        {file: profilePic, label: "profilePic" },
      ])
  
    }

    const submit = async (e) => {
      e.preventDefault()
      setUsername(usernameRef.current.value);
      {
        try{
          await axiosInstance.post("auth/register", { email, password, username, profilePic });
          history.push("/login");
        }catch(err){
          console.log(err)
  
        }
      }

    }

    return (
        <>
          <div className="register">
            <div className="top">
                <div className="wrapper">
                <img className="logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="logo"/>
                <Link to="/login" className="link">
                <button className="login-btn">Sign In</button>
                </Link>
                </div> 
            </div> 
          <div className="container">
              { !email || !password ? (<>
                <h1>Unlimited movies, TV shows, and more.</h1>
                  <h2>Watch anywhere. Cancel anytime</h2>
                  <p>
                      Ready to watch? Enter your email to create or restart your membership.
                  </p>
              {
                !email ? (
                  <>
                  <div className="input">                  
                  <input type="email" placeholder="email address" ref={emailRef} />
                  <button className="register-btn" onClick={handleStart}>Get Start</button>
                  </div>
                  </>
                ) : (
                  <form className="input">
                  <input type="password" placeholder="password" ref={passwordRef} />
                  <button className="register-btn" onClick={handleFinish}>Next</button>
                  </form>     
                )
            }
            </>
              ) : (
                <>
                <form className="input-profile">
                  <div className="input-img">
                      <img src={profilePic} className="file-preview" />
                      <form className="file-btn">
                      <input name="img" type='file' onChange={onChangeHandle} />
                      <button type="button" className="register-btn" onClick={handleUpload}>
                        {uploaded === 1 ? 'Done' : 'Upload'}
                        </button>
                      </form>
                  </div>
                                    

                  <div className="input-username">  
                    <input type="username" placeholder="put username" ref={usernameRef} className="user-name" />
                    <button type="button" className="register-btn" onClick={submit}>Submit</button>
                  </div>
                </form>
                </>
              ) }
          </div>
          </div>
        </>
    )
}

export default Register
