import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../../constants";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

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
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: navigation.getParam("email")
    }
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("틀린 비밀코드 입니다.");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("틀린 비밀코드 입니다.");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("비밀코드 입력 오류");
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
          placeholder="비밀코드"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
          {...confirmInput}
        />
        <AuthButton text="확인" onPress={handleConfirm} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
