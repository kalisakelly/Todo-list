import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== '') {
      setTaskItems([...taskItems, { text: task, completed: false }]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks.splice(index, 1);
    setTaskItems(updatedTasks);
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTaskItems(updatedTasks);
  };

  const handleEditTask = (index, newText) => {
    const updatedTasks = [...taskItems];
    updatedTasks[index].text = newText;
    setTaskItems(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <View key={index} style={styles.taskContainer}>
                <TouchableOpacity onPress={() => handleToggleTask(index)}>
                  <View
                    style={[
                      styles.taskCheckbox,
                      item.completed && styles.taskCheckboxCompleted,
                    ]}
                  />
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.taskText,
                    item.completed && styles.taskTextCompleted,
                  ]}
                  value={item.text}
                  onChangeText={(newText) => handleEditTask(index, newText)}
                  editable={!item.completed}
                />
                <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                  <View style={styles.taskDeleteButton}>
                    <Text style={styles.taskDeleteButtonText}>X</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  taskCheckboxCompleted: {
    backgroundColor: '#000',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDeleteButton: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#FF0000',
  },
  taskDeleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
