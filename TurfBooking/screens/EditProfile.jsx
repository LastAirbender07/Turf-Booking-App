import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setDoc, getDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(
    'https://cdn-icons-png.freepik.com/512/7718/7718888.png',
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleImageSelection = async () => {
    try {
      const options = {
        mediaType: 'image',
        quality: 1,
      };
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setPhoto(response.assets[0].uri);
        }
      });
    } catch (e) {
      Alert.alert('An Error occurred', 'Please try again', [{text: 'OK'}]);
    }
  };

  useEffect(() => {
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
    getUserInfo();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Edit Profile',
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

  const handleChanges = async () => {
    const uid = auth.currentUser.uid;
    await setDoc(
      doc(db, 'users', `${uid}`),
      {
        name: name,
        address: address,
        dob: dob,
        photo: photo,
        phone: phone,
      },
      {merge: true},
    );
    Alert.alert('Profile Updated', 'Your profile has been updated, Restart the app to apply changes', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  return (
    <SafeAreaView className="w-full bg-white flex-1">
      <StatusBar barStyle={'light-content'} backgroundColor={'#003580'} />
      <ScrollView className="px-5">
        <View className="items-center my-[22]">
            <TouchableOpacity
              style={{
                height: 160,
                width: 160,
                backgroundColor: 'white',
                borderRadius: 999,
                elevation: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#242760',
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

            <View className="absolute bottom-[0] right-[0] z-[9999] bg-gray-600 rounded-full p-2 shadow-lg">
              <MaterialIcons
                name="photo-camera"
                size={32}
                color="white"
                onPress={() => handleImageSelection()}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View className="flex-col mb-4">
            <Text className="font-semibold text-base">Name</Text>
            <View className="h-12 w-full border mt-1 border-gray-400 rounded-md justify-center">
              <TextInput
                className="px-1 py-0 text-base font-medium"
                value={name}
                onChangeText={value => setName(value)}
                editable={true}
              />
            </View>
          </View>

          <View className="flex-col mb-1">
            <Text className="font-semibold text-base">Email</Text>
            <View className="h-12 w-full border mt-1 border-gray-400 rounded-md justify-center">
              <TextInput className="px-1 py-0" value={email} editable={false} />
            </View>
          </View>

          <View className="flex-col mb-1">
            <Text className="font-semibold text-base">Phone no</Text>
            <View className="h-12 w-full border mt-1 border-gray-400 rounded-md justify-center">
              <TextInput
                className="px-1 py-0 text-base font-medium"
                value={phone}
                onChangeText={value => setPhone(value)}
              />
            </View>
          </View>

          <View className="flex-col mb-1">
            <Text className="font-semibold text-base">Date of Birth</Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              className="h-12 w-full border mt-1 border-gray-400 rounded-md justify-center">
              <Text className="px-1 py-0 text-black text-base font-medium">{dob}</Text>
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  setDob(date.toDateString());
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-col mb-1">
          <Text className="font-semibold text-base">Address</Text>
          <View className="h-12 w-full border mt-1 border-gray-400 rounded-md justify-center">
            <TextInput
              className="px-1 py-0 text-base font-medium"
              value={address}
              onChangeText={value => setAddress(value)}
              editable={true}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="w-full py-4 bg-[#003580] bottom-[0] absolute"
        onPress={() => handleChanges()}>
        <Text className="text-center text-white font-bold text-2xl">
          Save Changes
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;