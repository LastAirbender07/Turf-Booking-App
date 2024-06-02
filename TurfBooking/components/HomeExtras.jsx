import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import NetInfo from "@react-native-community/netinfo";

const HomeExtras = () => {
    const [quote, setQuote] = useState('The greatest glory in living lies not in never falling, but in rising every time we fall.');
    const [author, setAuthor] = useState('Nelson Mandela');

    const checkInternetConnectivity = async () => {
      try {
        const state = await NetInfo.fetch();
        return state.isConnected;
      } catch (error) {
        Alert.alert('Error', 'An error occurred while checking internet connectivity', [
          { text: 'Ok' },
        ]);
        return false;
      }
    };

    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    useEffect( async () => {
      const isConnected = await checkInternetConnectivity();
      if (!isConnected) {
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again', [
          { text: 'Ok' },
        ]);
        return;
      }
      fetchQuotes();
    }, []);

  return (
      <View>
        <TouchableOpacity className="mx-5 py-1 bg-yellow-400 border-2 border-['#003580'] rounded-xl shadow-lg">
          <Text className="mx-[20] text-lg font-semibold">"{quote}"</Text>
          <View className="items-end justify-end">
            <Text className="mx-[20] text-sm font-bold text-black">- {author}</Text>
          </View>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className="w-[200] h-[150] mt-[10] mx-5 p-5 bg-[#003580] rounded-xl shadow-lg">
            <Text className="text-white text-xl font-bold">Genius</Text>
            <Text className="text-yellow-400 text-base font-medium">You are at genius level 1 in our loyalty program</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[200] h-[150] mt-[10] mx-5 p-5 bg-white border border-[#e0e0e0] rounded-xl shadow-lg">
            <Text className="text-[#003580] text-xl font-bold">10% Discount</Text>
            <Text className="text-black text-base font-medium">Invite friends to earn a 10% cashback</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[200] h-[150] mt-[10] mx-5 p-5 bg-white border border-[#e0e0e0] rounded-xl shadow-lg">
            <Text className="text-[#003580] text-xl font-bold">$299 off</Text>
            <Text className="text-black text-base font-medium">$299 off with your first booking!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
  )
}

export default HomeExtras

const styles = StyleSheet.create({})