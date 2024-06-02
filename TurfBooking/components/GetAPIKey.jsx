import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, Alert, View } from 'react-native';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const GetAPIKey = () => {
  const navigation = useNavigation();
  const [apiKey, setApiKey] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Set API Key',
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

  const handleSaveApiKey = async () => {
    if (!apiKey) {
      Alert.alert('Error', 'Please enter your API Key');
      return;
    }
    try {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, 'users', `${uid}`);
      await setDoc(docRef, { apiKey }, { merge: true });
      Alert.alert('Success', 'API Key saved successfully, Restart the app to apply changes');
      navigation.navigate('ChatBot');
    } catch (error) {
      console.error('Error saving API Key:', error);
      Alert.alert('Error', 'Failed to save API Key');
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white p-5">
        <View className="flex justify-start mt-24 mb-5">
            <Text className="text-lg font-semibold">Instructions:</Text>
            <Text>Enter the API key for gemini which can be obtained from google for free</Text>
        </View>
      <TextInput
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="Enter your API Key"
        style={{
          width: '100%',
          padding: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        onPress={handleSaveApiKey}
        style={{
          backgroundColor: '#003580',
          padding: 15,
          borderRadius: 5,
          width: '100%',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Save API Key</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GetAPIKey;
