import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'

import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

const initialState = {
  login: '',
  email: '',
  password: '',
}

const loadApplication = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  })
}

export default function LoginScreen() {
  console.log(Platform.OS) // для того, щоб бачити візуально де Android, а де IOS
  const [showPass, setShowPass] = useState(false)
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [state, setState] = useState(initialState)
  const [iasReady, setIasReady] = useState(false)

  const [dimensions, setdimensions] = useState(
    Dimensions.get('window').width - 20 * 2,
  )

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 20 * 2

      setdimensions(width)
    }
    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  const keyboardHide = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
    console.log(state)
    setState(initialState)
  }

  const toglePass = () => {
    setShowPass(!showPass)
  }

  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('../assets/images/screenBg.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 78,
                width: dimensions + 20 * 2,
              }}
            >
              <View style={styles.avatarPosition}>
                <ImageBackground />
                <TouchableOpacity activeOpacity={0.7} style={styles.avatarBtn}>
                  <Text style={styles.avatarTitle}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>

              <View style={{ marginBottom: 16 }}>
                {/* <Text style={styles.inputTitle}>EMAIL ADDRES</Text> */}
                <TextInput
                  placeholder="Логин"
                  style={styles.input}
                  textAlign={'left'}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>

              <View style={{ marginBottom: 16 }}>
                {/* <Text style={styles.inputTitle}>EMAIL ADDRES</Text> */}
                <TextInput
                  placeholder="Адрес электронной почты"
                  style={styles.input}
                  value={state.email}
                  textAlign={'left'}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>

              <View
                style={{
                  ...styles.passPosition,
                  marginBottom: !isShowKeyboard ? 43 : 0,
                }}
              >
                <View style={styles.showPassPosition}>
                  <TouchableOpacity activeOpacity={0.7} onPress={toglePass}>
                    <Text style={styles.showPass}>
                      {!showPass ? 'Показать' : 'Скрыть'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Пароль"
                  style={styles.input}
                  value={state.password}
                  textAlign={'left'}
                  secureTextEntry={!showPass ? true : false}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>

              {!isShowKeyboard && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btn}
                    onPress={keyboardHide}
                  >
                    <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <Text style={styles.registrTitle}>
                    Уже есть аккаунт? Войти
                  </Text>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    alineItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 30,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    alineItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    height: 50,
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',

    color: '#212121',
  },
  form: {
    position: 'relative',
    paddingTop: 92,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  avatarPosition: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  avatarBtn: {
    position: 'absolute',
    right: -10,
    bottom: 14,
    width: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF6C00',
  },
  avatarTitle: {
    color: '#FF6C00',
    fontSize: 13,
  },
  passPosition: {
    position: 'relative',
  },
  showPassPosition: {
    zIndex: 99,
    top: 14,
    right: 16,
    position: 'absolute',
  },
  showPass: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,

    color: '#1B4371',
  },
  inputTitle: {
    color: '#f0f8ff',
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  btn: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        borderColor: '#ff6c00',
      },
      andriod: {
        backgroundColor: '#ff6c00',
        borderColor: 'transparent',
      },
      default: {
        backgroundColor: '#ff6c00',
        borderColor: 'transparent',
      },
    }),
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        color: '#1B4371',
      },
      android: {
        color: '#ffffff',
      },
      default: {
        color: '#ffffff',
      },
    }),
  },
  registrTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#1B4371',
  },
})
