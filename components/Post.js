import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "react-navigation";

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

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
  padding-left: 5px;
  padding-bottom: 0px;
  flex-direction: row;
`;

const IconContainer = styled.View`
  padding: 0px 5px;
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

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments,
  isLiked: isLikedProp,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const handleLike = async () => {
    if (isLiked) {
      setLikeCount(p => p - 1);
    } else {
      setLikeCount(p => p + 1);
    }
    setIsLiked(p => !p);
    try {
      await toggleLikeMutation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 40 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <HeaderUserContainer>
          <Touchable
            onPress={() =>
              navigation.navigate("UserDetail", { username: user.username })
            }
          >
            <Bold>{user.username}</Bold>
          </Touchable>
          <Touchable>
            <Location>{location}</Location>
          </Touchable>
        </HeaderUserContainer>
      </Header>
      <Swiper
        autoplay={true}
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
        <Touchable onPress={handleLike}>
          <IconContainer>
            <Ionicons
              size={28}
              color={isLiked ? styles.redColor : styles.blackColor}
              name={
                Platform.OS === "ios"
                  ? isLiked
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : isLiked
                  ? "md-heart"
                  : "md-heart-empty"
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

export default withNavigation(Post);
