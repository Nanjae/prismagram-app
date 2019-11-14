import React, { useState, useEffect } from "react";
import { Image, ScrollView, StatusBar } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
`;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      console.log(assets);
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <StatusBar hidden={true} />
          {hasPermission ? (
            <>
              <Image
                style={{
                  width: constants.width,
                  height: constants.width
                }}
                source={{ uri: selected.uri }}
              />
              <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                {allPhotos.map(photo => (
                  <Image
                    key={photo.id}
                    style={{
                      width: constants.width / 4,
                      height: constants.width / 4
                    }}
                    source={{ uri: photo.uri }}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};
