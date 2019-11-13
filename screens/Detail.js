import React from "react";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>Photo {navigation.getParam("id")} Detail!</Text>
  </View>
);
