import logo from "../../assets/logo.png";

const Logo = ({ size = 60 }) => {
  return (
    <img
      src={logo}
      alt="Deepfake Voice Authenticator"
      width={size}
      height={size}
    />
  );
};

export default Logo;