import React, { useState, useEffect } from "react";
import { Image, ScrollView, StatusBar, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;
export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          type={cameraType}
          style={{
            width: constants.width,
            height: constants.width,
            justifyContent: "flex-end",
            padding: 10
          }}
        >
          <TouchableOpacity onPress={toggleType}>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-repeat" : "md-repeat"}
              size={32}
              color={"white"}
            />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
