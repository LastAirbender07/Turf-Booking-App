import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Icon key={`star-${i}`} name="star" size={17} color="gold" />);
  }

  if (halfStar) {
    stars.push(<Icon key="half-star" name="star-half" size={17} color="gold" />);
  }

  return stars;
};

const RatingStars = ({ rating }) => (
  <View className="flex-row w-[90]">
    {renderStars(rating)}
  </View>
);

export default RatingStars
