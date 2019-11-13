import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import constants from "../constants";

const ProfileHeader = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
  margin-right: 20px;
`;

const StatNumber = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.View`
  padding: 0px 15px;
`;

const FullName = styled.Text`
  font-weight: 600;
  font-size: 12px;
`;
const Bio = styled.Text`
  font-size: 12px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  border-width: 1px;
  border-color: ${styles.lightGreyColor};
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
  padding: 5px 0px;
`;

const UserProfile = ({
  avatar,
  postsCount,
  followerCount,
  followingCount,
  fullName,
  bio
}) => {
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ width: 80, height: 80, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <HeaderColumn>
          <ProfileStats>
            <Touchable>
              <Stat>
                <StatNumber>{postsCount}</StatNumber>
                <StatName>게시물</StatName>
              </Stat>
            </Touchable>
            <Touchable>
              <Stat>
                <StatNumber>{followerCount}</StatNumber>
                <StatName>팔로워</StatName>
              </Stat>
            </Touchable>
            <Touchable>
              <Stat>
                <StatNumber>{followingCount}</StatNumber>
                <StatName>팔로잉</StatName>
              </Stat>
            </Touchable>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <FullName>{fullName}</FullName>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <Touchable>
          <Button>
            <Ionicons
              size={28}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </Touchable>
        <Touchable>
          <Button>
            <Ionicons
              size={28}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </Touchable>
      </ButtonContainer>
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired
};

export default UserProfile;
