import React, { useState, useEffect } from "react";
import { Image, ScrollView, StatusBar, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
`;

const Button = styled.View`
  position: absolute;
  right: 10px;
  top: 5px;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [canUploadPhoto, setCanUploadPhoto] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = photo => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: [MediaLibrary.SortBy.modificationTime]
      });
      const [firstPhoto] = assets;
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
  const handleSelected = () => {
    if (!canUploadPhoto) {
      return;
    }
    try {
      setCanUploadPhoto(false);
      navigation.navigate("Upload", { photo: selected });
    } catch (e) {
      console.log(e);
      setCanUploadPhoto(true);
    } finally {
      setCanUploadPhoto(true);
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
              <Button>
                <TouchableOpacity onPress={handleSelected}>
                  <Ionicons
                    color={"white"}
                    size={32}
                    name={
                      Platform.OS === "ios"
                        ? "ios-arrow-forward"
                        : "md-arrow-forward"
                    }
                  />
                </TouchableOpacity>
              </Button>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {allPhotos.map(photo => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      style={{
                        width: constants.width / 4,
                        height: constants.width / 4,
                        opacity: photo.id === selected.id ? 0.5 : 1
                      }}
                      source={{ uri: photo.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};
