import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, deleteNote } from "../redux/action/index";


function Detail() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [editText, setEditText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const data = useSelector((state) => state.addNotesReducer.note);
    const handleEditPress = (item) => {
        setSelectedItem(item);
        setEditText(item.text);
        setName(item.name);
        setModalVisible(true);
    };

    const handleRemovePress = (item) => {
        const data = {
            id: item.id,

        }
        dispatch(deleteNote(data))
    };

    const handleSaveEdit = () => {
        const data = {
            id: selectedItem.id,
            name: name,
            text: editText,
        }
        dispatch(updateNote(data))

        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={(({ item }) => {
                    return (
                        <View style={styles.container}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.text}>{item.text}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(item)}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemovePress(item)}>
                                    <Text style={styles.buttonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            />
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.modalTextInput}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Edit name"
                            multiline={true}
                        />
                        <TextInput
                            style={styles.modalTextInput}
                            value={editText}
                            onChangeText={(text) => setEditText(text)}
                            placeholder="Edit text"
                            multiline={true}
                        />
                        <Button title="Save" onPress={handleSaveEdit} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    modalTextInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    removeButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
export default Detail;
