import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleSignInButton from './GoogleSignInButton';

GoogleSignin.configure({
  webClientId: '46173601315-jbjno2gmo29co8qpqgvqi0fru34qv0ud.apps.googleusercontent.com', // Replace with your web client ID
});

async function onGoogleButtonPress() {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

export function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    try {
      await onGoogleButtonPress();
      console.log('Signed in with Google!');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle error as needed
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoogleSignIn}>
      <GoogleSignInButton/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set background color as per your requirement
  },
  centeredContent: {
    alignItems: 'center',
  },
});

