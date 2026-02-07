import React, { useState, useRef, useCallback } from 'react';
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - 48) / 2;

// Clean, professional color palette
const Colors = {
  primary: '#FE3C72',
  primaryLight: '#FF6B8A',
  secondary: '#2DB9B9',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

// Professional mock data
const LIKES_DATA = [
  {
    id: '1',
    name: 'Emma',
    age: 26,
    occupation: 'Product Designer',
    location: '2 miles away',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    isVerified: true,
    isSuperLike: true,
    lastActive: 'Active now',
    compatibility: 94,
  },
  {
    id: '2',
    name: 'Alexander',
    age: 29,
    occupation: 'Architect',
    location: '5 miles away',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    isVerified: true,
    isSuperLike: false,
    lastActive: '2 min ago',
    compatibility: 88,
  },
  {
    id: '3',
    name: 'Sophia',
    age: 24,
    occupation: 'Marketing Manager',
    location: '1 mile away',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    isVerified: false,
    isSuperLike: true,
    lastActive: 'Active now',
    compatibility: 91,
  },
  {
    id: '4',
    name: 'Daniel',
    age: 31,
    occupation: 'Software Engineer',
    location: '8 miles away',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    isVerified: true,
    isSuperLike: false,
    lastActive: '15 min ago',
    compatibility: 85,
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    occupation: 'Photographer',
    location: '3 miles away',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    isVerified: true,
    isSuperLike: false,
    lastActive: 'Active now',
    compatibility: 96,
  },
  {
    id: '6',
    name: 'James',
    age: 28,
    occupation: 'Chef',
    location: '4 miles away',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    isVerified: false,
    isSuperLike: false,
    lastActive: '1 hour ago',
    compatibility: 82,
  },
];

// Individual Profile Card Component
const ProfileCard = ({ item, index, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
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
        {/* Profile Image - NOT BLURRED */}
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        
        {/* Gradient Overlay for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />

        {/* Super Like Badge */}
        {item.isSuperLike && (
          <View style={styles.superLikeBadge}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.superLikeGradient}
            >
              <Ionicons name="star" size={10} color="#FFF" />
              <Text style={styles.superLikeText}>SUPER LIKE</Text>
            </LinearGradient>
          </View>
        )}

        {/* Verified Badge */}
        {item.isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          </View>
        )}

        {/* Online Status */}
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot,
            { backgroundColor: item.lastActive.includes('now') ? Colors.success : Colors.textLight }
          ]} />
          <Text style={styles.statusText}>{item.lastActive}</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.age}>{item.age}</Text>
          </View>
          
          <Text style={styles.occupation} numberOfLines={1}>
            {item.occupation}
          </Text>
          
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color={Colors.textLight} />
            <Text style={styles.location}>{item.location}</Text>
          </View>

          {/* Compatibility Score */}
          <View style={styles.compatibilityBadge}>
            <Text style={styles.compatibilityText}>{item.compatibility}% Match</Text>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionsOverlay}>
          <TouchableOpacity style={[styles.actionBtn, styles.likeBtn]}>
            <Ionicons name="heart" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.passBtn]}>
            <Ionicons name="close" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Filter Chip Component
const FilterChip = ({ label, isActive, onPress, count }) => (
  <TouchableOpacity
    style={[styles.chip, isActive && styles.chipActive]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
      {label}
    </Text>
    {count > 0 && (
      <View style={styles.chipBadge}>
        <Text style={styles.chipBadgeText}>{count}</Text>
      </View>
    )}
  </TouchableOpacity>
);

// Main Likes Screen
export default function LikesScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const filters = [
    { id: 'all', label: 'All', count: 0 },
    { id: 'new', label: 'New', count: 3 },
    { id: 'super', label: 'Super Likes', count: 2 },
    { id: 'nearby', label: 'Nearby', count: 0 },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleProfilePress = (profile) => {
    console.log('View profile:', profile.name);
    // Navigate to profile detail screen
  };

  const renderItem = ({ item, index }) => (
    <ProfileCard
      item={item}
      index={index}
      onPress={() => handleProfilePress(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.headerTitle}>Likes You</Text>
          <Text style={styles.headerSubtitle}>
            {LIKES_DATA.length} people liked your profile
          </Text>
        </View>
        
        {/* Free Feature Badge */}
        <View style={styles.freeBadge}>
          <Ionicons name="unlock" size={14} color={Colors.primary} />
          <Text style={styles.freeBadgeText}>FREE</Text>
        </View>
      </View>

      {/* Filter Scroll */}
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FilterChip
            label={item.label}
            isActive={selectedFilter === item.id}
            onPress={() => setSelectedFilter(item.id)}
            count={item.count}
          />
        )}
        contentContainerStyle={styles.filterList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <FlatList
        data={LIKES_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* Empty State (shown when no data) */}
      {LIKES_DATA.length === 0 && (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="heart-outline" size={48} color={Colors.textLight} />
          </View>
          <Text style={styles.emptyTitle}>No likes yet</Text>
          <Text style={styles.emptyText}>
            Keep swiping to get more likes!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Header Styles
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    paddingBottom: 8,
    backgroundColor: Colors.background,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  freeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  freeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  
  // Filter Styles
  filterList: {
    paddingRight: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.background,
  },
  chipBadge: {
    backgroundColor: Colors.warning,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  chipBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.background,
  },
  
  // List Styles
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  
  // Card Styles
  cardWrapper: {
    width: CARD_WIDTH,
  },
  card: {
    width: '100%',
    height: CARD_WIDTH * 1.35,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    height: '60%',
  },
  
  // Badges
  superLikeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  superLikeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  superLikeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 2,
  },
  statusContainer: {
    position: 'absolute',
    top: 12,
    left: item => item.isSuperLike ? 85 : 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    color: Colors.background,
    fontWeight: '600',
  },
  
  // Info Section
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.background,
  },
  age: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  occupation: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  location: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  compatibilityBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  compatibilityText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.background,
  },
  
  // Action Buttons
  actionsOverlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: -25,
    opacity: 0,
  },
  actionBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  likeBtn: {
    backgroundColor: Colors.primary,
  },
  passBtn: {
    backgroundColor: Colors.textSecondary,
  },
  
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});