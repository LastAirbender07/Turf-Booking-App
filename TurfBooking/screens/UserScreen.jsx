import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';

const UserScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'User Details',
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

  const handleNavigation = () => {
    if (!firstName || !lastName || !email || !phone) {
      Alert.alert(
        'Invalid details',
        'Please fill all the fields',
        [
          {
            text: 'OK',
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    navigation.navigate('Confirmation', {
      name: route?.params?.name,
      rating: route?.params?.rating,
      address: route?.params?.address,
      oldPrice: route?.params?.oldPrice,
      price: route?.params?.price,
      totalAmount: route?.params?.totalAmount,
      discount: route?.params?.discount,
      logo: route?.params?.logo,
      slots: route?.params?.slots,
      date: route?.params?.date,
      people: route?.params?.people,
      savedAmount:
        route?.params?.oldPrice * route?.params?.slots.length -
        route?.params?.totalAmount,
      firstName,
      lastName,
      email,
      phone,
    });
  };

  return (
    <View className="w-full h-full overflow-hidden">
      <View className="mx-5 p-1">
        <View className="mt-3">
          <Text>First Name</Text>
          <TextInput
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View className="mt-3">
          <Text>Last Name</Text>
          <TextInput
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>
        <View className="mt-3">
          <Text>Email</Text>
          <TextInput
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View className="mt-3">
          <Text>Phone no</Text>
          <TextInput
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <Text className="border-[#E0E0E0] border h-[1]" />
        <View className="mx-5">
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-slate-800 text-xl font-bold">
                {route?.params?.name}
              </Text>
              <Text className="text-black text-md font-semibold">
                {route?.params?.date}
              </Text>
            </View>
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
            <Text className="text-gray-600 text-base font-bold ">
              You saved ₹
              {route?.params?.oldPrice * route?.params?.slots.length -
                route?.params?.totalAmount}{' '}
              for {route?.params?.slots.length} hrs and {route?.params?.people}{' '}
              adults
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="py-4 bg-[#003580]"
          onPress={() => handleNavigation()}>
          <Text className="text-center text-white font-bold text-2xl">
            Final Step
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserScreen;
