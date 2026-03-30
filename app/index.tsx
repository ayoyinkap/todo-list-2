import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type ToDoType = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Index() {
  // ---------------- STATE ----------------
  const [todos, setTodos] = useState<ToDoType[]>([]); // All todos
  const [todoText, setTodoText] = useState<string>(''); // Input for new todo
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search filter

  // Load todos from AsyncStorage on app start
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem('my-todos');
        if (todos !== null) {
          setTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log('Error loading todos:', error);
      }
    };
    getTodos();
  }, []);

  // Delete todo by id and save updated list to AsyncStorage
  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id); // remove todo by id
      await AsyncStorage.setItem('my-todos', JSON.stringify(newTodos)); // save updated list
      setTodos(newTodos); // update state
    } catch (error) {
      console.log('Error deleting todo: ', error);
    }
  };

  // Add new todo and save to AsyncStorage
  const addTodo = async () => {
    if (todoText.trim() === '') return;
    try {
      const newTodo = {
        id: Math.random(), // unique id
        title: todoText,
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos); // update state
      await AsyncStorage.setItem('my-todos', JSON.stringify(updatedTodos)); // save
      setTodoText(''); // clear input
      Keyboard.dismiss();
    } catch (error) {
      console.log('Error saving todo:', error);
    }
  };

  // Toggle completed state of a todo and save the updated list
  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed; // toggle completed state
        }
        return todo;
      });
      await AsyncStorage.setItem('my-todos', JSON.stringify(newTodos)); // save
      setTodos(newTodos); // update state
    } catch (error) {
      console.log('Error updating todo: ', error);
    }
  };

  // Filter todos using search query
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => alert('Clicked')}>
            <Ionicons name="menu" size={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={{
                uri: 'https://xsgames.co/randomusers/avatar.php?g=male',
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={34} color={'black'} />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            clearButtonMode="always"
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Todo list */}
        <FlatList
          data={[...filteredTodos].reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ToDoItem
              todo={item}
              deleteTodo={deleteTodo}
              handleTodo={handleDone}
            />
          )}
        />

        {/* Footer - Add Todo */}
        <KeyboardAvoidingView
          style={styles.footer}
          behavior="padding"
          keyboardVerticalOffset={10}
        >
          <TextInput
            placeholder="Add new Todo"
            style={styles.newTodoInput}
            onChangeText={setTodoText}
            value={todoText}
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Ionicons name="add" size={24} color={'blue'} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
//Todo item component

const ToDoItem = ({
  todo,
  deleteTodo,
  handleTodo,
}: {
  todo: ToDoType;
  deleteTodo: (id: number) => void;
  handleTodo: (id: number) => void;
}) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      {/* Checkbox toggles completed state */}
      <Checkbox
        value={todo.completed}
        onValueChange={() => handleTodo(todo.id)}
        color={todo.completed ? '#4630EB' : undefined}
      />
      <Text
        style={[
          styles.todoText,
          todo.completed && { textDecorationLine: 'line-through' },
        ]}
      >
        {todo.title}
      </Text>
    </View>

    {/* Delete button */}
    <TouchableOpacity
      onPress={() => {
        deleteTodo(todo.id);
        alert('Deleted ' + todo.id);
      }}
    >
      <Ionicons name="trash" size={24} color={'red'} />
    </TouchableOpacity>
  </View>
);

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'transparent',
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
  todoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newTodoInput: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#4630EB',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});