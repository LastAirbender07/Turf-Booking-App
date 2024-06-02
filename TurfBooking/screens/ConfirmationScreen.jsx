import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingStars from '../components/RatingStars';
import {useDispatch} from 'react-redux';
import {savedPlaces} from '../SavedReducer';
import {setDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Confirmation',
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

  const dispatch = useDispatch();
  const uid = auth.currentUser.uid;
  const confirmBooking = async () => {
    dispatch(savedPlaces(route?.params));

    await setDoc(
      doc(db, 'users', `${uid}`),
      {
        bookingDetails: {...route?.params},
      },
      {merge: true},
    );
    navigation.replace('Main');
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          elevation: 5,
          marginHorizontal: 10,
          marginTop: 12,
        }}>
        <View className="p-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-800 text-2xl font-black">
              {route?.params?.name}
            </Text>
            <Text className="text-black text-md font-semibold">
              {route?.params?.date}
            </Text>
          </View>
          <View className="flex-row items-center justify-between mt-1">
            <RatingStars rating={route?.params?.rating} />
            <View className="bg-[#003580] px-2 py-1 flex-row items-center justify-between rounded-md">
              <Text className="text-white text-sm mr-3">Genius</Text>
              <Text className="text-white text-sm mr-1">
                {route?.params?.rating}
              </Text>
              <Icon1 name="star-circle" size={17} color="gold" />
            </View>
          </View>
          <Text className="text-gray-800 text-base font-bold mt-1">
            {route?.params?.address}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-2 items-center justify-start">
              <Text className="text-red-500 text-xl line-through">
                ₹{route?.params?.oldPrice * route?.params?.slots.length}
              </Text>
              <Text className="text-black text-3xl font-bold">
                ₹{route?.params?.totalAmount.toFixed(0)}
              </Text>
            </View>
            <View className="w-[100] bg-green-500 px-2 py-1 rounded-lg">
              <Text className="text-white text-base font-bold text-center">
                {route?.params?.discount}% OFF
              </Text>
            </View>
          </View>
          <Text className="text-blue-700 text-base font-bold ">
            You saved ₹
            {route?.params?.oldPrice * route?.params?.slots.length -
              route?.params?.totalAmount}{' '}
            for {route?.params?.slots.length} hrs and {route?.params?.people}{' '}
            adults
          </Text>
          <Text className="border-[#E0E0E0] border h-[1] mt-2" />
          <Text className="text-gray-800 text-xl mt-1 font-bold">
            Selecetd Slots:
          </Text>
          <View className="flex-row flex-wrap gap-2 mt-1 items-center justify-center">
            {route?.params?.slots.map((slot, index) => (
              <View key={index}>
                <TouchableOpacity className="p-3 bg-[#003580] rounded-lg">
                  <Text className="text-white text-base font-bold text-center">
                    {slot}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className=" mt-2 mx-3 bg-blue-700 rounded-xl px-4 py-3 items-center"
        onPress={() => confirmBooking()}>
        <Text className="text-white font-semibold text-2xl">Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;
