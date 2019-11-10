import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../../constants";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

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

export default ({ navigation }) => {
  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: emailInput.value }
  });
  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("이메일을 입력해주세요.");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("이메일 형식으로 입력해주세요.");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert("이메일을 확인해주세요.");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("계정을 등록해주세요.");
        navigation.navigate("SignUp", { email: value });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("로그인 오류");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image
          resizeMode={"contain"}
          source={require("../../assets/logo.png")}
        />
        <AuthInput
          placeholder="이메일 주소"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
          {...emailInput}
        />
        <AuthButton text="로그인" onPress={handleLogin} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
