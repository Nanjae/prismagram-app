import React, { useState } from "react";
import axios from "axios";
import { Image, StatusBar, Alert } from "react-native";
import styled from "styled-components";
import styles from "../../styles";
import useInput from "../../hooks/useInput";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormData from "form-data";

const View = styled.View``;

const HeaderContainer = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
  flex-direction: row;
`;

const TextInputContainer = styled.View`
  justify-content: center;
  margin-left: 12px;
  width: ${constants.width / 1.6};
`;

const CaptionTextInput = styled.TextInput`
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const LocationTextInput = styled.TextInput`
  margin-top: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const Button = styled.View`
  position: absolute;
  right: 15px;
  top: 35px;
`;

const Text = styled.Text`
  color: ${styles.blueColor};
`;

export default ({ navigation }) => {
  const [canUploadPhoto, setCanUploadPhoto] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const photo = navigation.getParam("photo");
  const captionInput = useInput("asfd");
  const locationInput = useInput("");
  const handleSubmit = async () => {
    if (!canUploadPhoto) {
      return;
    }
    setCanUploadPhoto(false);
    if (captionInput.value === "") {
      Alert.alert("문구를 입력해주세요.");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: type.toLowerCase(),
      uri: photo.uri
    });
    console.log(formData);
    try {
      await axios.post(
        "http://b2cbf171.ngrok.io/api/upload",
        {
          data: formData
        },
        { headers: { "Content-type": "multipart/form=data" } }
      );
      // console.log(data);
    } catch (e) {
      console.log(e);
      setCanUploadPhoto(true);
    } finally {
      setCanUploadPhoto(true);
    }
  };
  return (
    <View>
      <StatusBar hidden={false} />
      <HeaderContainer>
        <Image
          style={{ width: 70, height: 70 }}
          source={{
            uri: photo.uri
          }}
        />
        <TextInputContainer>
          <CaptionTextInput
            onChangeText={captionInput.onChange}
            miltiline={true}
            placeholder={"문구 입력..."}
            value={captionInput.value}
          />
          <LocationTextInput
            onChangeText={locationInput.onChange}
            miltiline={true}
            placeholder={"위치 입력..."}
            value={locationInput.value}
          />
        </TextInputContainer>
        <Button>
          <TouchableOpacity disabled={!canUploadPhoto} onPress={handleSubmit}>
            <Text>공유</Text>
          </TouchableOpacity>
        </Button>
      </HeaderContainer>
    </View>
  );
};
