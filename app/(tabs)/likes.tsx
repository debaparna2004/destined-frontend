import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const SPACING = 12;
const CARD_WIDTH = (width - 40 - SPACING) / 2;

const Colors = {
  primary: '#FE3C72',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
};

const LIKES_DATA = [
  {
    id: '1',
    name: 'Emma',
    age: 26,
    location: '2 miles away',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    isSuperLike: true,
    isActive: true,
  },
  {
    id: '2',
    name: 'Alexander',
    age: 29,
    location: '5 miles away',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    isSuperLike: false,
    isActive: false,
  },
  {
    id: '3',
    name: 'Sophia',
    age: 24,
    location: '1 mile away',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    isSuperLike: true,
    isActive: true,
  },
  {
    id: '4',
    name: 'Daniel',
    age: 31,
    location: '8 miles away',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    isSuperLike: false,
    isActive: false,
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    location: '3 miles away',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    isSuperLike: false,
    isActive: true,
  },
  {
    id: '6',
    name: 'James',
    age: 28,
    location: '4 miles away',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    isSuperLike: false,
    isActive: false,
  },
];

const ProfileCard = ({ item, index, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 80,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          style={styles.gradient}
        />

        {item.isSuperLike && (
          <View style={styles.superLikeBadge}>
            <Ionicons name="star" size={10} color="#FFF" />
          </View>
        )}

        {item.isActive && (
          <View style={styles.activeDot} />
        )}

        <View style={styles.info}>
          <Text style={styles.name}>
            {item.name}, {item.age}
          </Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function LikesScreen() {
  const [filter, setFilter] = useState('all');

  const filters = ['All', 'New', 'Super Likes'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Likes You</Text>
          <View style={styles.freeBadge}>
            <Text style={styles.freeText}>FREE</Text>
          </View>
        </View>
        
        <View style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={LIKES_DATA}
        renderItem={({ item, index }) => (
          <ProfileCard item={item} index={index} onPress={() => {}} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 16,
  },
  
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -1,
  },
  
  freeBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  
  freeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  
  filterBtnActive: {
    backgroundColor: Colors.primary,
  },
  
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  
  filterTextActive: {
    color: Colors.background,
    fontWeight: '600',
  },
  
  list: {
    padding: 20,
    paddingTop: 0,
  },
  
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: SPACING,
    marginBottom: SPACING,
  },
  
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: SPACING,
  },
  
  card: {
    width: '100%',
    height: CARD_WIDTH * 1.25,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  
  image: {
    width: '100%',
    height: '100%',
  },
  
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  
  superLikeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  activeDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.background,
    marginBottom: 2,
  },
  
  location: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
});