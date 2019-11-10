import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../../constants";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from "expo-facebook";

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

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.lightGreyColor};
`;

export default ({ navigation }) => {
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const usernameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      username: usernameInput.value,
      email: emailInput.value
    }
  });
  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const { value: lastName } = lastNameInput;
    const { value: firstName } = firstNameInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (firstName === "") {
      return Alert.alert("성을 입력해주세요.");
    }
    if (lastName === "") {
      return Alert.alert("이름을 입력해주세요.");
    }
    if (email === "") {
      return Alert.alert("이메일을 입력해주세요.");
    } else if (!emailRegex.test(email)) {
      return Alert.alert("이메일 형식으로 입력해주세요.");
    }
    if (username === "") {
      return Alert.alert("사용자 이름을 입력해주세요.");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("계정이 생성되었습니다.", "로그인 해주세요.");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      if (e.message.includes("사용자")) {
        Alert.alert("이미 등록된 사용자입니다.");
      } else if (e.message.includes("이메일")) {
        Alert.alert("이미 등록된 이메일입니다.");
        navigation.navigate("Login", { email });
      }
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async () => {
    try {
      setLoading(true);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "574895476590324",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        emailInput.setValue(email);
        firstNameInput.setValue(first_name);
        lastNameInput.setValue(last_name);
        const [username] = email.split("@");
        usernameInput.setValue(username);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
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
          placeholder="성"
          returnKeyType="send"
          autoCapitalize="words"
          {...firstNameInput}
        />
        <AuthInput
          placeholder="이름"
          returnKeyType="send"
          autoCapitalize="words"
          {...lastNameInput}
        />
        <AuthInput
          placeholder="이메일 주소"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
          {...emailInput}
        />
        <AuthInput
          placeholder="사용자 이름"
          returnKeyType="send"
          autoCorrect={false}
          {...usernameInput}
        />
        <AuthButton text="가입" onPress={handleSignUp} loading={loading} />
        <FBContainer>
          <AuthButton
            text="페이스북 연동"
            onPress={fbLogin}
            loading={loading}
            bgColor="#2D4DA6"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
