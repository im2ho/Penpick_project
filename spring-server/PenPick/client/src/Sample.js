import React ,{useState} from 'react';
import '../css/Login.css';
import mainImg from '../img/메인커버사진.jpg'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
 
    const [agreement, setAgremment] = useState(true);
  
    const handleSetAgremment = () => setAgremment(!agreement);
  
    return (
      <div
        title="Welcome!"
        description="Use these awesome forms to login or create new account in your project for free."
        image={mainImg}
      >
        <Card>
          <div p={3} mb={1} textAlign="center">
            <div variant="h5" fontWeight="medium">
              Register with
            </div>
          </div>
          <div mb={2}>
            <div />
          </div>
          <div />
          <div pt={2} pb={3} px={3}>
            <div component="form" role="form">
              <div mb={2}>
                <div placeholder="Name" />
              </div>
              <div mb={2}>
                <div type="email" placeholder="Email" />
              </div>
              <div mb={2}>
                <div type="password" placeholder="Password" />
              </div>
  
              <div display="flex" alignItems="center">
                <div checked={agreement} onChange={handleSetAgremment} />
                <div
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgremment}
                  sx={{ cursor: "poiner", userSelect: "none" }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </div>
                <div
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  textGradient
                >
                  Terms and Conditions
                </div>
              </div>
              <div mt={4} mb={1}>
                <div variant="gradient" color="dark" fullWidth>
                  sign up
                </div>
              </div>
              <div mt={3} textAlign="center">
                <div variant="button" color="text" fontWeight="regular">
                  Already have an account?&nbsp;
                  <div
                    // component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="dark"
                    fontWeight="bold"
                    textGradient
                  >
                    Sign in
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
  export default SignUp;