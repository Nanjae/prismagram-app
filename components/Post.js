import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View``;
const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 600;
`;
const Location = styled.Text`
  font-size: 12px;
`;

const Post = ({ user, location }) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ width: 40, height: 40, borderRadius: 25 }}
            resizeMode="cover"
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <HeaderUserContainer>
          <Touchable>
            <Bold>{user.username}</Bold>
          </Touchable>
          <Touchable>
            <Location>{location}</Location>
          </Touchable>
        </HeaderUserContainer>
      </Header>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default Post;
