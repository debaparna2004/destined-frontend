import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 18;

export default function LikesScreen() {
  const likes = [
    {
      id: "1",
      name: "Ariana",
      age: 24,
      distance: "1.5 km away",
      time: "Just now",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    },
    {
      id: "2",
      name: "Maya",
      age: 22,
      distance: "3 km away",
      time: "5 mins ago",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    },
    {
      id: "3",
      name: "Elena",
      age: 25,
      distance: "4 km away",
      time: "10 mins ago",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
    {
      id: "4",
      name: "Sophia",
      age: 23,
      distance: "2 km away",
      time: "20 mins ago",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    },
  ];

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {item.name}, {item.age}
          </Text>

          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color="#fff" />
            <Text style={styles.metaText}>{item.distance}</Text>
          </View>

          <Text style={styles.time}>{item.time}</Text>
        </View>
      </LinearGradient>

      {/* Liked Badge */}
      <View style={styles.badge}>
        <Ionicons name="heart" size={14} color="#fff" />
        <Text style={styles.badgeText}>Liked You</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>People Who Like You</Text>

      <FlatList
        data={likes}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    paddingHorizontal: 14,
    paddingTop: 55,
  },

  header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    width: CARD_WIDTH,
    height: 240,
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    backgroundColor: "#222",
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
  },

  infoContainer: {},

  name: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  metaText: {
    color: "#ddd",
    fontSize: 12,
    marginLeft: 4,
  },

  time: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 3,
  },

  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FF4458",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    marginLeft: 4,
    fontWeight: "600",
  },
});
