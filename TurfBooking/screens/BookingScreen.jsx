import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useLayoutEffect, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingStars from '../components/RatingStars';
import {getDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';
import {savedPlaces} from '../SavedReducer';

const BookingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.booking.booking);
  // get bookings from firebase
  const getBookings = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().bookingDetails){
      dispatch(savedPlaces(docSnap.data().bookingDetails))
      };
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Your Bookings',
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
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{width: '100%', paddingBottom: 70}}>
        {bookings.length > 0 &&
          bookings.map((item, index) => (
            <TouchableOpacity
              key={index}
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
                    {item.name}
                  </Text>
                  <Text className="text-black text-md font-semibold">
                    {item.date}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-1">
                  <RatingStars rating={item.rating} />
                  <View className="flex-row justify-end gap-2">
                    <View className="bg-green-500 px-2 py-1 rounded-lg">
                      <Text className="text-white text-sm font-base text-center">
                        {item.discount}% OFF
                      </Text>
                    </View>
                    <View className="bg-[#003580] px-2 py-1 flex-row items-center justify-between rounded-md">
                      <Text className="text-white text-sm mr-3">Genius</Text>
                      <Text className="text-white text-sm mr-1">
                        {item.rating}
                      </Text>
                      <Icon name="star-circle" size={17} color="gold" />
                    </View>
                  </View>
                </View>
                <Text className="text-gray-800 text-base font-bold mt-1">
                  {item.address}
                </Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row gap-2 items-center justify-start">
                    <Text className="text-red-500 text-xl line-through">
                      ₹{item.oldPrice * item.slots.length}
                    </Text>
                    <Text className="text-black text-3xl font-bold">
                      ₹{item.totalAmount}
                    </Text>
                  </View>
                  <View className="overflow-scroll">
                    <Text className="text-blue-700 text-base font-bold ">
                      {item.people} Adults
                    </Text>
                  </View>
                </View>
                <Text className="border-[#E0E0E0] border h-[1] mt-2" />
                <Text className="text-gray-800 text-xl mt-1 font-bold">
                  Selecetd Slots:
                </Text>
                <View className="flex-row flex-wrap gap-2 mt-1 items-center justify-center">
                  {item.slots.map((slot, index) => (
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
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
