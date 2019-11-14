import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => (
  <View>
    <StatusBar hidden={false} />
    <Text>Upload Photo</Text>
  </View>
);
