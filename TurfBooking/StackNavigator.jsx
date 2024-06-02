import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import PlacesScreen from './screens/PlacesScreen';
import MapScreen from './screens/MapScreen';
import PropertyInfoScreen from './screens/PropertyInfoScreen';
import UserScreen from './screens/UserScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EditProfile from './screens/EditProfile';
import QuestionScreen from './screens/QuestionScreen';
import GetAPIKey from './components/GetAPIKey';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon2 name="home-sharp" size={30} color="#003580" />
              ) : (
                <Icon2 name="home-outline" size={30} />
              ),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarLabel: 'Bookings',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon2 name="notifications" size={30} color="#003580" />
              ) : (
                <Icon2 name="notifications-outline" size={30} />
              ),
          }}
        />
        <Tab.Screen
          name="ChatBot"
          component={QuestionScreen}
          options={{
            tabBarLabel: 'ChatBot',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon2 name="chatbubbles" size={30} color="#003580" />
              ) : (
                <Icon2 name="chatbubbles-outline" size={30} />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon1 name="account" size={30} color="#003580" />
              ) : (
                <Icon1 name="account-outline" size={30} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Places" component={PlacesScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="PropertyInfo" component={PropertyInfoScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="GetAPI" component={GetAPIKey} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
