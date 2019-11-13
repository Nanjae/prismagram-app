import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextInput } from "react-native-gesture-handler";
import constants from "../constants";
import styles from "../styles";

const Container = styled.View`
  padding: 0px 10px;
`;

const SearchBar = ({ onChange, value, onSubmit }) => (
  <Container>
    <TextInput
      style={{
        width: constants.width - 20,
        height: 36,
        backgroundColor: styles.lightGreyColor,
        padding: 10,
        borderRadius: 4,
        textAlign: "center"
      }}
      returnKeyType="search"
      onEndEditing={onSubmit}
      onChangeText={onChange}
      value={value}
      placeholder={"검색"}
    />
  </Container>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
