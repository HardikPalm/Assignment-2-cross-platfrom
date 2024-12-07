import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
// import ShareIcon from "../../assets/svgs/ShareIcon";
// import AddToQueueIcon from "../../assets/svgs/AddToQueueIcon";
// import GoToRadioIcon from "../../assets/svgs/GoToRadioIcon";
// import ViewAlbumIcon from "../../assets/svgs/ViewAlbumIcon";
// import ViewArtistIcon from "../../assets/svgs/ViewArtistIcon";
// import SongCreditIcon from "../../assets/svgs/SongCreditIcon";
import PlusIcon from "../../assets/svgs/PlusIcon";

const ModalComponent = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => props.setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.modalContent}>
                <Pressable
                  onPress={() => props.Addtoplaylistclick(props.songItem)}
                >
                  <View style={styles.modalItem}>
                    <View style={styles.modalIconContainer}>
                      <PlusIcon />
                    </View>
                    <Text style={styles.modalText}>Add to playlist</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => console.log("Share pressed")}>
                  <View style={styles.modalItem}>
                    <View style={styles.modalIconContainer}>
                      <PlusIcon />
                    </View>
                    <Text style={styles.modalText}>Share</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => console.log("Add to queue pressed")}>
                  <View style={styles.modalItem}>
                    <View style={styles.modalIconContainer}>
                      <PlusIcon />
                    </View>
                    <Text style={styles.modalText}>Add to queue</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => console.log("Go to radio pressed")}>
                  <View style={styles.modalItem}>
                    <View style={styles.modalIconContainer}>
                      <PlusIcon />
                    </View>
                    <Text style={styles.modalText}>Go to radio</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => console.log("View album pressed")}>
                  <View style={styles.modalItem}>
                    <View style={styles.modalIconContainer}>
                      <PlusIcon />
                    </View>
                    <Text style={styles.modalText}>View album</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => console.log("View artist pressed")}>
                  <View style={styles.modalItem}>
                    <View style={styles.modalIconContainer}>
                      <PlusIcon />
                    </View>
                    <Text style={styles.modalText}>View artist</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => console.log("Song credit pressed")}>
                  <View style={styles.modalItem}>
                    <View style={styles.modalIconContainer}>
                      <PlusIcon />
                    </View>
                    <Text style={styles.modalText}>Song credit</Text>
                  </View>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#505050",
    padding: 15,
    borderRadius: 10,
    maxHeight: Dimensions.get("window").height * 0.8,
  },
  scrollView: {
    maxHeight: Dimensions.get("window").height * 0.7,
  },
  modalContent: {
    paddingVertical: 10,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ModalComponent;
