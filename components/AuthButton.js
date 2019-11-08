import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px 0px;
  width: ${constants.width / 1.2};
  border-radius: 4px;
`;
const Text = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const AuthButton = ({ text, onPress, loading = true }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color="white" /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AuthButton;
