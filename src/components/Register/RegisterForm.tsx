import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import PreLoginForm from "../layout/PreLoginForm";
import {
  emailErrorCodes,
  passwordErrorCodes,
} from "../../helpers/authErrorCodes";

const MESSAGE_PASSWORD_MISSING = "Password is required";
const MESSAGE_PASSWORD_CF_MISSING = "Confirm your password";
const MESSAGE_PASSWORD_TOO_SHORT =
  "Password needs to be at least 6 characters long";
const MESSAGE_PASSWORD_MISMATCH = "Passwords do not match";
const MESSAGE_EMAIL_MISSING = "Email is required";

const RegisterForm: React.FC<{}> = () => {
  let register: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;

  // Input elements
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCfRef = useRef<HTMLInputElement>(null);

  // Validity checks
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);
  const [passwordCfIsInvalid, setPasswordCfIsInvalid] =
    useState<boolean>(false);
  // Error messages
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>(
    MESSAGE_EMAIL_MISSING
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>(
    MESSAGE_PASSWORD_MISSING
  );
  const [passwordCfErrorMessage, setPasswordCfErrorMessage] = useState<string>(
    MESSAGE_PASSWORD_MISSING
  );

  register = useAuth().register;

  function handleRegister() {
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
    setPasswordCfIsInvalid(false);

    // Input elements do not exist
    if (emailRef.current == null) {
      setEmailIsInvalid(true);
      return;
    }

    if (passwordRef.current == null) {
      setPasswordIsInvalid(true);
      return;
    }

    if (passwordCfRef.current == null) {
      setPasswordCfIsInvalid(true);
      return;
    }

    const email: string = emailRef.current.value.trim();
    const password: string = passwordRef.current.value;
    const passwordcf: string = passwordCfRef.current.value;

    // Empty inputs
    if (email.length == 0) {
      setEmailIsInvalid(true);
      setEmailErrorMessage(MESSAGE_EMAIL_MISSING);
    }

    if (password.length == 0) {
      setPasswordIsInvalid(true);
      setPasswordErrorMessage(MESSAGE_PASSWORD_MISSING);
    }


    if (passwordcf.length == 0) {
      setPasswordCfIsInvalid(true);
      setPasswordCfErrorMessage(MESSAGE_PASSWORD_CF_MISSING);
    }

    if (email.length == 0 || password.length == 0 || passwordcf.length == 0) {
      return;
    }

    if (password.length < 6) {
      setPasswordIsInvalid(true);
      setPasswordErrorMessage(MESSAGE_PASSWORD_TOO_SHORT);
      return;
    }

    if (passwordcf != password) {
      setPasswordCfIsInvalid(true);
      setPasswordCfErrorMessage(MESSAGE_PASSWORD_MISMATCH);
      return;
    }

  
    register(email, password, passwordcf).catch((err) => {
      const errorCode: string = err.code;
      console.log(errorCode);
      if (emailErrorCodes[errorCode]) {
        setEmailIsInvalid(true);
        setEmailErrorMessage(emailErrorCodes[errorCode]);
      } else if (passwordErrorCodes[errorCode]) {
        setPasswordIsInvalid(true);
        setPasswordErrorMessage(passwordErrorCodes[errorCode]);
      }
    });
  }
  return (
    <PreLoginForm header="Register" text="lorem ipsum">
      <FormControl isInvalid={emailIsInvalid} isRequired>
        <FormLabel>Email: </FormLabel>
        <Input ref={emailRef} type="text" borderColor="gray" />
        <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={passwordIsInvalid} isRequired>
        <FormLabel>Password: </FormLabel>
        <Input ref={passwordRef} type="password" borderColor="gray" />
        <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={passwordCfIsInvalid} isRequired>
        <FormLabel>Confirm Password: </FormLabel>
        <Input ref={passwordCfRef} type="password" borderColor="gray" />
        <FormErrorMessage>{passwordCfErrorMessage}</FormErrorMessage>
      </FormControl>
      <Button
        onClick={handleRegister}
        color="white"
        bgColor="pink.700"
        w="100%"
      >
        Register
      </Button>
    </PreLoginForm>
  );
};

export default RegisterForm;
