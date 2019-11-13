import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Profile = () => {
  const { loading, data } = useQuery(ME, { fetchPolicy: "network-only" });
  console.log(data, loading);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};

export default Profile;
