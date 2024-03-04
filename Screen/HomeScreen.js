import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { addNotes } from '../redux/action/index'

function HomeScreen() {
    const [Text, setText] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleScreen = () => {
        const notes = {
            id: Math.random() + 1,
            name: name,
            text: Text,
        }
        dispatch(addNotes(notes))

        console.log("data", notes)

        navigation.navigate('Detail');
        setName('')
        setText('')

    }

    const handlenavigat = () => {
        navigation.navigate('Detail')
    }




    return (
        <View style={{ flex: 1, gap: 20, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder='Enter Your Name:'
                style={styles.input}

                onChangeText={setName}
                value={name}
            />
            <TextInput placeholder='Enter Your Dec:'
                style={styles.input}

                onChangeText={setText}
                value={Text}
            />
            <Button title='Save' onPress={handleScreen} />
            <Button title='Detail' onPress={handlenavigat} />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        borderColor: "black",
        borderWidth: 2,
        width: "80%",
        borderRadius: 20,
        padding: 20
    }
})




export default HomeScreen
