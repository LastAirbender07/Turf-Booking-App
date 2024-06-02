import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {getDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingStars from '../components/RatingStars';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Your Name');
  const [address, setAddress] = useState('Your Address');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('Your DOB');
  const [photo, setPhoto] = useState(
    'https://cdn-icons-png.freepik.com/512/7718/7718888.png',
  );
  const bookings = useSelector(state => state.booking.booking);

  const getUserInfo = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().name) setName(docSnap.data().name);
      if (docSnap.data().address) setAddress(docSnap.data().address);
      if (docSnap.data().email) setEmail(docSnap.data().email);
      if (docSnap.data().phone) setPhone(docSnap.data().phone);
      if (docSnap.data().photo) setPhoto(docSnap.data().photo);
      if (docSnap.data().dob) setDob(docSnap.data().dob);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Profile',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 25,
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
    <SafeAreaView className="w-full h-full flex-1 bg-white">
      <StatusBar barStyle={'light-content'} backgroundColor={'#003580'} />
      <View className="flex-1">
        <View className="h-[114] w-full bg-[#003580]" />
        <View className="items-center">
          <TouchableOpacity
            style={{
              height: 160,
              width: 160,
              backgroundColor: 'white',
              borderRadius: 999,
              elevation: 5,
              marginTop: -90,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: photo}}
              resizeMode="contain"
              style={{
                height: 155,
                width: 155,
                borderRadius: 999,
              }}
            />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-[#242760] my-2">{name}</Text>
          <Text className="text-black text-base">Software Developer</Text>
          <View className="flex-row items-center">
            <MaterialIcons name="location-on" size={24} color="black" />
            <Text className="text-sm ml-2">{address}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between  mx-5 mt-2">
          <View className="flex-col gap-1">
            <View className="flex-row items-center">
              <MaterialIcons name="email" size={24} color="black" />
              <Text className="text-sm text-[#003580] ml-2">{email}</Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="phone" size={24} color="black" />
              <Text className="text-sm text-[#003580] ml-2">{phone}</Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="cake" size={24} color="black" />
              <Text className="text-sm text-[#003580] ml-2">{dob}</Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-[#003580] w-24 h-8 rounded-md items-center justify-center mx-2"
            onPress={() => navigation.navigate('EditProfile')}>
            <Text className="text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Text className="border-[#E0E0E0] border-2 h-[1] mt-2" />
        <Text className="text-black font-semibold text-base mx-5 mt-1">
          Recent Activity
        </Text>
        <View className="items-center justify-center w-full h-full">
          <ScrollView
            className="flex-row flex-wrap"
            horizontal
            showsHorizontalScrollIndicator={false}>
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
                    marginBottom: 12,
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
                          <Text className="text-white text-sm mr-3">
                            Genius
                          </Text>
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
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
