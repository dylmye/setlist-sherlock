import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * @see https://stackoverflow.com/a/72805382
 */
export const useKeyboardVisible = () => {
  const isAndroid = Platform.OS === "android";
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      // WillShow/Hide events not available on Android
      // @see https://reactnative.dev/docs/keyboard.html#addlistener
      !isAndroid ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardWillHideListener = Keyboard.addListener(
      !isAndroid ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

