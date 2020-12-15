/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity ,
  Keyboard,
} from 'react-native';


const ShuffleArray = (tempoArray) => {
  
  const tempArray = tempoArray;
  
  for(let i = tempArray.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray;

}


const StartButton = (props) => {
  const [text, setText] = useState('');
  const [valid, setValid] = useState(true);
  return (
  <View style={{padding:10, display:'flex', flexDirection:'row', height:"20%", justifyContent:"space-between", backgroundColor:"#4aff7a"}}>
    <View style={{display:'flex', flexDirection:'column', alignSelf:'center'}}>
      <TextInput 
        style={{height:40, alignSelf: 'center', width:'auto', textAlign:'center', backgroundColor:'white'}} 
        placeholder="Insert number of button (Max 10)"
        onChangeText={text => setText(text)}
        defaultValue={text}
        keyboardType="numeric"
        >
      </TextInput>
      
      <Text style={{padding:10,height:40, alignSelf: 'center', width:'auto', textAlign:'center', color:"red"}} >
        {valid ? "" : "You have entered invalid input!" }
      </Text>

    </View>
    <View style={{alignSelf:"center"}}>
      <Button
        onPress={() => {
          if (isNaN(text) === false && (parseInt(text) <= 10 && parseInt(text) > 0)){
            props.setNumberOfButton(parseInt(text));
            setValid(true);
            props.setGameState(true);
            Keyboard.dismiss();
            
          }else{
            setValid(false);
            
          }
        } 
        }
        title={"Start game"}
        disabled={props.gameState}
      >
      </Button>
      <Button
        onPress={()=>{
          props.setGameState(false);
          Keyboard.dismiss();
        }}
        title={"Restart"}
        disabled={!props.gameState}
        >
      </Button>
    </View>
    

  </View>
  )

};


const GameButton = (props) => {
  const [clicked, setClicked] = useState(false);
  const [time, setTime] = useState(0);
  return(
    <TouchableOpacity  
      style={{borderRadius:50,  minWidth:"20%", color:"black", padding:10, backgroundColor:clicked?"grey":"#96f0fa", textAlign:"center"}}
      onPressIn = {() => {
        setTime(new Date().getTime());
        setClicked(true);
        
      }
      
    }
      disabled={clicked}
      
    >
      <Text style={{alignSelf:'center'}}>
        {clicked ? (time - props.time) + "ms" : ""}
      </Text>

    </TouchableOpacity >
  )

}

const GameRow = (props) => {
  
  const leftWidth = Math.floor(Math.random()*80);
  const rightWidth = 80 - leftWidth;
  if (props.buttonExist === true){
    return(
      <View style={{flexDirection:'row', justifyContent:'flex-start', width:"100%", height:"10%"}}>
        <View style={{width:leftWidth+"%"}}></View>
        <GameButton time={new Date().getTime()}/>
        <View style={{width:rightWidth+"%"}}></View>
      </View>
      
    )
  }else{
    return(
      <View style={{width:"100%", height:"10%"}}></View>
    )

  }
  
}


const GameArea = (props) => {
  const buttonExistArray = [];
  const intNum = props.numberOfButton;
  const combined = [];
  for (let z = 0; z < intNum; z++){
    buttonExistArray.push(true);
  }
  while(buttonExistArray.length < 10){
    buttonExistArray.push(false);
  }

  const shuffledArray = ShuffleArray(buttonExistArray);


  for (let i = 0; i < shuffledArray.length; i++){
    combined.push(<GameRow buttonExist={shuffledArray[i]} key={`id-${i}`}></GameRow>);
  }

  return (
    <View style={{height:"80%"}}>
      {combined}
    </View>
  );
}

  

const App = () => {
  const [gameState, setGameState] = useState(false);
  const [numberOfButton, setNumberOfButton] = useState(0);
  return (
    
      <View style={{display:"flex", flexDirection:'column', justifyContent:'flex-start', height:"100%"}}>
        {gameState ? <GameArea style={{flex:1, height:"80%"}} numberOfButton={numberOfButton}></GameArea> : <View style={{flex:1, height:"80%"}}></View>}     
        <StartButton style={{flex:2}} gameState={gameState} setGameState={setGameState} setNumberOfButton={setNumberOfButton}></StartButton>
      </View>
      
    
  );
};


export default App;




