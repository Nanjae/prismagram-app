import React from "react";
import styled from "styled-components";
import Loader from "../components/Loader";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => (
  <View>
    <Loader />
  </View>
);
