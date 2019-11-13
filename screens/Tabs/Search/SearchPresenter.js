import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const SearchPresenter = () => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

SearchPresenter.propTypes = {};

export default SearchPresenter;
