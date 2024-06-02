import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import NetInfo from '@react-native-community/netinfo';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (!authUser) return;
        if (authUser) {
          navigation.replace('Main');
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // console.log('user credential', userCredential);
        const user = userCredential.user;
        // console.log('user details', user);
      })
      .catch(error => {
        Alert.alert('Invalid Credentials', 'Please enter valid credentials', [
          {text: 'Ok'},
        ]);
      });
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      <KeyboardAvoidingView>
        <View className="items-center justify-center mt-24">
          <Text className="text-[#003580] text-xl font-bold">Sign In</Text>
          <Text className="text-black mt-3 text-lg font-medium">
            Sign In to your Account
          </Text>
        </View>
        <View className="mt-12 mx-5">
          <View className="">
            <Text className="text-[#003580] text-lg font-semibold">Email</Text>
            <TextInput
              className="w-full py-0 px-1 text-black border-gray-400 border-b text-base font-semibold"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View className="mt-5">
            <Text className="text-[#003580] text-lg font-semibold">
              Password
            </Text>
            <TextInput
              className="w-full py-0 px-1 text-black border-gray-400 border-b text-base font-semibold"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          className="mt-5 mx-5 bg-[#003580] py-3 items-center justify-center rounded-lg"
          onPress={() => handleLogin()}>
          <Text className="text-white text-lg font-semibold">Login In</Text>
        </TouchableOpacity>
        <View className="mt-5 items-center justify-center flex-row">
          <Text className="text-black text-lg font-medium">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-[#003580] text-lg font-semibold ml-2">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
