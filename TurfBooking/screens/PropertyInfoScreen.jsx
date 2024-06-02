import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {pixelNormalize} from '../components/Normalize';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingStars from '../components/RatingStars';
import Amenities from '../components/Amenities';

const PropertyInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedSlots, setSelectedSlots] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route?.params?.name}`,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 70,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerTintColor: 'white',
    });
  }, []);

  const difference = route?.params?.oldPrice - route?.params?.newPrice;
  const offerPrice = Math.abs((difference / route?.params?.oldPrice) * 100);

  const toggleSlot = slot => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot],
    );
  };

  const calculateTotalAmount = () => {
    return selectedSlots.length * route.params.newPrice;
  };

  const handleNavigation = () => {
    if (selectedSlots.length === 0) {
      Alert.alert('Please select atleast one slot to proceed');
      return;
    }
    navigation.navigate('User', {
      name: route?.params?.name,
      rating: route?.params?.rating.toFixed(1),
      address: route?.params?.address,
      oldPrice: route?.params?.oldPrice,
      price: route?.params?.newPrice,
      totalAmount: calculateTotalAmount(),
      discount: offerPrice.toFixed(0),
      logo: route?.params?.logo,
      slots: selectedSlots,
      date: route?.params?.date,
      people: route?.params?.people
    })
  }

  return (
    <SafeAreaView className="w-full">
      <ScrollView
        className="bg-[#f5f5f5]"
        contentContainerStyle={{width: '100%', paddingBottom: 70}}>
        <ScrollView
          className="flex-row flex-wrap"
          horizontal
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              margin: 15,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 5,
            }}>
            <Image
              source={{uri: route?.params?.logo}}
              style={{
                width: pixelNormalize(200),
                height: pixelNormalize(200),
                borderRadius: pixelNormalize(4),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {route?.params?.photos?.map((photo, index) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                margin: 15,
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 5,
              }}
              key={index}>
              <Image
                source={{uri: photo.image}}
                style={{
                  width: pixelNormalize(200),
                  height: pixelNormalize(200),
                  borderRadius: pixelNormalize(4),
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="mx-5 mb-3">
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-slate-800 text-2xl font-black">
                {route?.params?.name}
              </Text>
              <Icon1 name="cards-heart-outline" size={25} color="red" />
            </View>
            <View className="flex-row items-center justify-between mt-1">
              <RatingStars rating={route?.params?.rating} />
              <View className="bg-[#003580] px-2 py-1 flex-row items-center justify-between rounded-md">
                <Text className="text-white text-sm mr-3">Genius</Text>
                <Text className="text-white text-sm mr-1">
                  {route?.params?.rating.toFixed(1)}
                </Text>
                <Icon1 name="star-circle" size={17} color="gold" />
              </View>
            </View>
            <Text className="text-gray-800 text-base font-bold mt-1">
              {route?.params?.address}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600 text-base font-bold ">
                Price for 1 hr and {route?.params?.people} adults:
              </Text>
              <View className="flex-row gap-2 items-center justify-start">
                <Text className="text-red-500 text-xl line-through">
                  ₹{route?.params?.oldPrice}
                </Text>
                <Text className="text-black text-3xl font-bold">
                  ₹{route?.params?.newPrice}
                </Text>
              </View>
            </View>
            <View className="w-[100] bg-green-500 px-2 py-1 rounded-lg">
              <Text className="text-white text-base font-bold text-center">
                {offerPrice.toFixed(0)}% OFF
              </Text>
            </View>
          </View>

          <Text className="border-[#E0E0E0] border-4 h-[1] mt-[15]" />
          <Amenities />
          <Text className="border-[#E0E0E0] border-4 h-[1] mt-[15]" />

          <View>
            <View className="mt-2 items-center justify-between flex-row">
              <Text className="text-gray-600 text-base font-bold">
                Slots Available:
              </Text>
              <Text className="text-gray-800 text-base font-bold">
                {route?.params?.date}
              </Text>
            </View>
            <View className="w-full py-1 flex-row flex-wrap items-center justify-center">
              {route?.params?.slots?.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleSlot(slot)}
                  style={[
                    styles.slotButton,
                    selectedSlots.includes(slot) && styles.selectedSlotButton,
                  ]}>
                  <Text
                    style={[
                      styles.slotButtonText,
                      selectedSlots.includes(slot) &&
                        styles.selectedSlotButtonText,
                    ]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-gray-800 text-lg font-bold mt-1">
              Total Amount: ₹{calculateTotalAmount()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
      className="w-full py-4 bg-[#003580] bottom-[0] absolute"
      onPress={() => handleNavigation()}>
        <Text className="text-center text-white font-bold text-2xl">Book</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PropertyInfoScreen;

const styles = StyleSheet.create({
  slotButton: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#003580',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSlotButton: {
    backgroundColor: '#003580',
  },
  slotButtonText: {
    color: '#003580',
    textAlign: 'center',
  },
  selectedSlotButtonText: {
    color: 'white',
  },
});
