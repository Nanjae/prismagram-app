import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5};
  height: ${constants.width / 5};
  margin-bottom: 20px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View`
  margin-top: 20px;
`;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
`;

export default ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <AuthButton
      text={"새 계정 만들기"}
      onPress={() => navigation.navigate("SignUp")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>로그인</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
