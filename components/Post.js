import React from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";

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

const IconsContainer = styled.View`
  padding: 10px;
  padding-bottom: 0px;
  flex-direction: row;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
  padding-top: 5px;
`;

const Caption = styled.Text``;

const CaptionContainer = styled.View`
  margin-top: 5px;
  flex-direction: row;
`;

const CommentCount = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 12px;
`;

const Post = ({ user, location, files = [], likeCount, caption, comments }) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ width: 40, height: 40, borderRadius: 25 }}
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
      <Swiper
        height={constants.height / 2.5}
        width={constants.width}
        dotStyle={{ marginBottom: -80, width: 6, height: 6 }}
        activeDotStyle={{ marginBottom: -80 }}
      >
        {files.map(file => (
          <Image
            key={file.id}
            style={{ width: constants.width, height: constants.height / 2.5 }}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <IconsContainer>
        <Touchable>
          <IconContainer>
            <Ionicons
              size={28}
              name={
                Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"
              }
            />
          </IconContainer>
        </Touchable>
        <Touchable>
          <IconContainer>
            <Ionicons
              size={28}
              name={Platform.OS === "ios" ? "ios-text" : "md-text"}
            />
          </IconContainer>
        </Touchable>
      </IconsContainer>
      <InfoContainer>
        {likeCount === 0 ? null : (
          <Touchable>
            <Bold>좋아요 {likeCount}개</Bold>
          </Touchable>
        )}
        {caption === null || caption === undefined || caption === "" ? null : (
          <CaptionContainer>
            <Touchable>
              <Bold>{user.username}</Bold>
            </Touchable>
            <Caption> {caption}</Caption>
          </CaptionContainer>
        )}
        <Touchable>
          <CommentCount>댓글 {comments.length}개 모두 보기</CommentCount>
        </Touchable>
      </InfoContainer>
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
