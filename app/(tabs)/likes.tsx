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
<<<<<<< HEAD
    backgroundColor: "#0F0F0F",
    paddingHorizontal: 14,
    paddingTop: 55,
=======
    backgroundColor: colors.background,
>>>>>>> 757e9aee849a3d1ae6d7b631d22da2eceb6a8fa4
  },

  header: {
<<<<<<< HEAD
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
=======
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: colors.primary + "15",
  },
  freeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50" + "20",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  freeBadgeText: {
    color: "#4CAF50",
    fontSize: 12,
    fontFamily: "Manrope-Bold",
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Manrope-Bold",
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    fontFamily: "Manrope",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 15,
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "Manrope-Bold",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  likeCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  newLikeCard: {
    borderWidth: 2,
    borderColor: colors.primary + "50",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  newBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newBadgeText: {
    color: "white",
    fontSize: 10,
    fontFamily: "Manrope-Bold",
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    color: colors.textPrimary,
    marginRight: 8,
  },
  distance: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  userBio: {
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 5,
    fontFamily: "Manrope",
    marginLeft: 4,
  },
  profileInfo: {
    padding: 20,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontFamily: "Manrope-Bold",
    color: "#333",
    marginRight: 8,
  },
  distance: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  bio: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
>>>>>>> 757e9aee849a3d1ae6d7b631d22da2eceb6a8fa4
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
<<<<<<< HEAD

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
=======
  likedTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  likedTime: {
    fontSize: 12,
    color: colors.textTertiary,
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  passButton: {
    alignItems: "center",
    marginRight: 15,
  },
  passButtonText: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 3,
  },
  likeButton: {
    alignItems: "center",
  },
  likeButtonText: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 3,
    fontFamily: "Manrope-SemiBold",
  },
  freeInfoCard: {
    backgroundColor: colors.primary + "10",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  freeInfoTitle: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    color: colors.textPrimary,
    marginTop: 10,
  },
  freeInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
>>>>>>> 757e9aee849a3d1ae6d7b631d22da2eceb6a8fa4
  },
});
