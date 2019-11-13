import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term
    },
    skip: !shouldFetch
  });
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
      console.log(data, loading);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  console.log(data, loading);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    ></ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
