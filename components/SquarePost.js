import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";

const SquarePost = ({ navigation, files = [], id }) => (
  <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { id })}>
    <Image
      style={{ width: constants.width / 3, height: constants.width / 3 }}
      source={{ uri: files[0].url }}
    />
  </TouchableOpacity>
);

SquarePost.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired
};

export default withNavigation(SquarePost);
