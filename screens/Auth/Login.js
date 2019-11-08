import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../../constants";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

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

const Text = styled.Text``;

export default () => {
  const emailInput = useInput("");
  const handleLogin = () => {};
  return (
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
      <AuthInput
        placeholder="이메일 주소"
        keyboardType="email-address"
        {...emailInput}
      />
      <AuthButton text="로그인" onPress={() => null} />
    </View>
  );
};
