import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import constants from "../constants";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${constants.height / 3};
`;

export default () => (
  <Container>
    <ActivityIndicator color={styles.blackColor} />
  </Container>
);
