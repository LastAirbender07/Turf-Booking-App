import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Question = () => {
  const navigation = useNavigation();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const checkApiKey = async () => {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, 'users', `${uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().apiKey) {
        setApiKey(docSnap.data().apiKey);
      } else {
        Alert.alert('API Key Missing', 'Please provide your API Key', [
          { text: 'OK', },
        ]);
      }
    };
    checkApiKey();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'ChatBot',
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
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.navigate('GetAPI')}>
          <Icon name="key" size={30} color="white" />
        </TouchableOpacity>
      ),
      headerTintColor: 'white',
      
    });
  }, []);

  const handleAskQuestion = async () => {
    try {
      const isConnected = await checkInternetConnectivity();
      if (!isConnected) {
        throw new Error('Internet not connected');
      }
      const newMessages = [...messages, { role: 'user', content: question }];
      setMessages(newMessages);
      setQuestion('');

      const aiResponse = await fetchAIResponse(question);
      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      // console.error('Error fetching text response:', error.message);
      handleErrorResponse(error);
    }
  };

  const checkInternetConnectivity = async () => {
    try {
      const state = await NetInfo.fetch();
      return state.isConnected;
    } catch (error) {
      // console.error('Error checking internet connectivity:', error);
      return false;
    }
  };

  const fetchAIResponse = async (query) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const generativeModel = genAI.getGenerativeModel({ model: 'gemini-1.0-pro-latest' });
      const result = await generativeModel.generateContent(query);
      const response = result.response;
      const aiResponse = response.text();
      return aiResponse || 'No response from AI';
    } catch (error) {
      // console.error('Error fetching AI response:', error);
      if (error.message.includes('API key not valid')) {
        throw new Error('API_KEY_INVALID');
      }
      throw new Error('Processing error');
    }
  };

  const handleErrorResponse = (error) => {
    let errorMessage = '';
    if (error.message === 'Internet not connected') {
      errorMessage = 'Please check your internet connection';
    } else if (error.message === 'Processing error') {
      errorMessage = 'Error processing your request';
    } else if (error.message === 'API_KEY_INVALID') {
      errorMessage = 'Invalid API Key. Please provide a valid API Key.';
      navigation.navigate('GetAPI');
    } else {
      errorMessage = 'An error occurred. Please try again later';
    }
    Alert.alert('Error', errorMessage);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-3">
      <ScrollView className="mb-[10]">
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? '#DCF8C6' : '#ECECEC',
              borderRadius: 15,
              padding: 10,
              marginVertical: 5,
              maxWidth: '80%',
            }}>
            <Text className="text-base">{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row items-center">
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Type your question..."
          className="flex-1 rounded-3xl p-3 border-[#ccc] border mr-2"
        />
        <TouchableOpacity
          className="rounded-full p-3 bg-[#003580]"
          onPress={handleAskQuestion}>
          <Icon name="send" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Question;
