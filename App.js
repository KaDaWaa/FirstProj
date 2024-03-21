import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  UsersProvider,
  useUsersContext,
  useSetUsersContext,
} from "./usersContext.js";
import { faker } from "@faker-js/faker";
import TextAvatar from "react-native-text-avatar";
import { colorHash } from "./colorHash.js";
import { Views } from "./styles/index.js";
function CreateUser() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
  });
  const setUsers = useSetUsersContext();
  const users = useUsersContext();

  const handleCreateUser = () => {
    setUsers([...users, userData]);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
    });
  };

  const handleSetRandomUser = () => {
    setUserData({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: String(Math.floor(Math.random() * 100)),
      gender: faker.person.sex(),
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextAvatar
        backgroundColor={colorHash(userData.email).rgb}
        textColor={"#0000ff"}
        size={60}
        type={"circle"} // optional
      >
        {userData.firstName + " " + userData.lastName}
      </TextAvatar>
      <TextInput
        value={userData.firstName}
        style={styles.input}
        placeholder="First Name"
        onChangeText={(firstName) => setUserData({ ...userData, firstName })}
      ></TextInput>
      <TextInput
        value={userData.lastName}
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(lastName) => setUserData({ ...userData, lastName })}
      ></TextInput>
      <TextInput
        value={userData.email}
        style={styles.input}
        placeholder="email"
        onChangeText={(email) => setUserData({ ...userData, email })}
      ></TextInput>
      <TextInput
        value={userData.age}
        style={styles.input}
        placeholder="age"
        onChangeText={(age) => setUserData({ ...userData, age })}
      ></TextInput>
      <TextInput
        value={userData.gender}
        style={styles.input}
        placeholder="gender"
        onChangeText={(gender) => setUserData({ ...userData, gender })}
      ></TextInput>
      <Button title="Create User" onPress={handleCreateUser}></Button>
      <Button title="Random User" onPress={handleSetRandomUser}></Button>
    </View>
  );
}

const User = ({ user, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        padding: 10,
        margin: 10,
        borderColor: "black",
        borderWidth: 1,
      }}
    >
      <View style={styles.rowView}>
        <TextAvatar
          backgroundColor={colorHash(user.email).rgb}
          textColor={"#0000ff"}
          size={60}
          type={"circle"}
        >
          {user.firstName + " " + user.lastName}
        </TextAvatar>
        <View style={styles.columnView}>
          <Text>{user.firstName + " " + user.lastName}</Text>
          <Text>{user.email}</Text>
        </View>
        <Button
          onPress={() => navigation.navigate("Profile", { user })}
          title="More"
        ></Button>
      </View>
    </View>
  );
};
function Profile({ route, navigation }) {
  const { user } = route.params;
  return (
    <View
      style={{
        paddingTop: 50,
        margin: 10,
        display: "flex",

        alignItems: "center",
      }}
    >
      <TextAvatar
        backgroundColor={colorHash(user.email).rgb}
        textColor={"#0000ff"}
        size={60}
        type={"circle"}
      >
        {user.firstName + " " + user.lastName}
      </TextAvatar>
      <Text>{user.firstName}</Text>
      <Text>{user.lastName}</Text>
      <Text>{user.email}</Text>
      <Text>{user.age}</Text>
    </View>
  );
}
function Users({ navigation }) {
  const users = useUsersContext();
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <User user={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UsersList" component={Users} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Create User" component={CreateUser} />
      <Tab.Screen name="Users" component={MyStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UsersProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </UsersProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    display: "flex",
  },
  input: {
    height: 40,
    width: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  rowView: { ...Views.rowView },
  columnView: { ...Views.columnView },
  mainView: { ...Views.mainView },
  UserTab: { ...Views.UserTab },
});
