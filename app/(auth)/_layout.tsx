import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {

    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen 
                name='index'
                options={{animation:'slide_from_right'}}
                
            />
            <Stack.Screen 
                name='registration'
                options={{animation:'slide_from_left'}}
            />
        </Stack>
            
    /*<Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="registration"
        options={{
          title: 'Registration',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>*/
  );
}
