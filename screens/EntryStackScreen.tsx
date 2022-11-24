import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AuthStackScreen } from "./AuthStack/AuthStackScreen";
import { RootStackScreen } from "./RootStack/RootStackScreen";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";


export function EntryStackScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
        if (initializing) setInitializing(false);
      });
    return unsubscribe;
  }, [setUser]);

  if (initializing) {
    return <View />;
  } else if (!user) {
    return (
      <NavigationContainer>
        <AuthStackScreen />
      </NavigationContainer>
    );
  } else {
    return <RootStackScreen />;
  }
}

