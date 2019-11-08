import React from "react";
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

const AuthButton = ({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <Container>
      <Text>{text}</Text>
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AuthButton;
