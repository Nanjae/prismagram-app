import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";

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

const SignUpBtn = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px 0px;
  width: ${constants.width / 1.2};
  border-radius: 4px;
  margin-bottom: 20px;
`;
const SignUpBtnText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
`;

export default ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <Touchable onPress={() => navigation.navigate("SignUp")}>
      <SignUpBtn>
        <SignUpBtnText>새 계정 만들기</SignUpBtnText>
      </SignUpBtn>
    </Touchable>
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>로그인</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
