import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  LogBox,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../firebase';
import {doc, setDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  LogBox.ignoreLogs([
    '@firebase/auth: Auth (10.12.2):',
    'Warning: useEffect must not return anything besides a function, which is used for clean-up.',
  ]);

  useEffect(() => {      
    const checkInternetConnectivity = async () => {
      try {
        const state = await NetInfo.fetch();
        if(!state.isConnected){
          Alert.alert('No Internet Connection', 'Please check your internet connection and try again', [
            { text: 'Ok' },
          ]);
        } 
        return;
      } catch (error) {
        Alert.alert('Error', 'An error occurred while checking internet connectivity', [
          { text: 'Ok' },
        ]);
        return false;
      }
    };
    checkInternetConnectivity();
    return;
  }, []);

  const handleClick = () => {
    if (email === '' || password === '' || phone === '' || phone.length < 10 || password.length < 6 || email.indexOf('@') === -1 || email.indexOf('.') === -1){
      Alert.alert('Invalid Details', 'Please fill all fields', [
        {text: 'OK'},
        {text: 'Cancel', style: 'cancel'},
      ]);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      userCredentials => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;
        setDoc(doc(db, 'users', `${uid}`), {
          email: user,
          phone: phone,
        });
      },
    );
    navigation.replace('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      <KeyboardAvoidingView>
        <View className="items-center justify-center mt-24">
          <Text className="text-[#003580] text-xl font-bold">Resgister</Text>
          <Text className="text-black mt-3 text-lg font-medium">
            Create an Account
          </Text>
        </View>
        <View className="mt-12 mx-5">
          <View className="">
            <Text className="text-[#003580] text-lg font-semibold">Email</Text>
            <TextInput
              className="w-full py-0 text-black border-gray-400 border-b text-base font-semibold"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View className="mt-5">
            <Text className="text-[#003580] text-lg font-semibold">
              Password
            </Text>
            <TextInput
              className="w-full py-0 text-black border-gray-400 border-b text-base font-semibold"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View className="mt-5">
            <Text className="text-[#003580] text-lg font-semibold">Phone</Text>
            <TextInput
              className="w-full py-0 text-black border-gray-400 border-b text-base font-semibold"
              value={phone}
              onChangeText={text => setPhone(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          className="mt-5 mx-5 bg-[#003580] py-3 items-center justify-center rounded-lg"
          onPress={() => handleClick()}>
          <Text className="text-white text-lg font-semibold">Register</Text>
        </TouchableOpacity>
        <View className="mt-5 items-center justify-center flex-row">
          <Text className="text-black text-lg font-medium">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-[#003580] text-lg font-semibold ml-2">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
