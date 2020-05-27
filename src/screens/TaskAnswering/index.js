import React, { Component } from "react";
import { StyleSheet, TextInput, Image, View, ImageBackground } from 'react-native';
import { Layout, Text, Button, Input} from '@ui-kitten/components'
import { Survey } from '../../components/Survey';
import * as firebase from "firebase";
import api from '../../api'


const makeJsonInfo = (questions, description) =>{

  completeData = []

  completeData.push({ 
    questionType: 'Info', 
    questionText: description
  })

  // console.log(questions)
  for (j = 0; j < questions.length; j++) {
    question = {}  
    if(questions[j].type.localeCompare('SHORT_TEXT') == 0){
      question = {
        questionType: 'TextInput', 
        questionText: questions[j].content,
        question_id: questions[j].id,
      }
      completeData.push(question)
    }

    if(questions[j].type.localeCompare('INTEGER') == 0){
      question = {
        questionType: 'NumericInput', 
        questionText: questions[j].content,
        question_id: questions[j].id,
      }
      completeData.push(question)
    }
    if(questions[j].type.localeCompare('TEXT') == 0){
      question = {
        questionType: 'TextInput', 
        questionText: questions[j].content,
        question_id: questions[j].id,
      }
      completeData.push(question)
    }
    if(questions[j].type.localeCompare('RADIO') == 0){
      options = []
      optText = []
      optText = questions[j].choices.split('@#')
      for (i = 0; i < optText.length; i++) {
        options.push({optionText: optText[i]})
        
      } 
      question = {
        questionType: 'SelectionGroup', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        questionSettings: {
            defaultSelection: 0
        },
        options
      }
      completeData.push(question)
    }
    if(questions[j].type.localeCompare('SELECT') == 0){
      options = []
      optText = []
      optText = questions[j].choices.split('@#')
      for (i = 0; i < optText.length; i++) {
        options.push({optionText: optText[i]})
      } 
      question = {
        questionType: 'MultipleSelectionGroup', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        questionSettings: {
          maxMultiSelect: options.length,
          minMultiSelect: 1,
        },
        options
      }
      completeData.push(question)
    }
  } 
  
  // completeData.push({ 
  //   questionType: 'Info', 
  //   questionText: 'Obrigado por suas respostas!!!'
  // })
  
  return completeData;
}


const getToken = async () => {
  token = await firebase.auth().currentUser.getIdToken().then(res => {
    return res
  })
  return await token
}
// const getTasks = async (id) => {
//   token = await getToken();
//   config = {
//     headers: { Authorization: `Bearer ${token}` }
//   }
//   try{
//       await api.get('/tasks/'+id, config).then( response => { 
//         console.log(JSON.stringify(response.data)) 
//     });
//   }catch ( error ) {
//     console.log(error.message)
//   }
// }


const getTasks = async (id) => {
  tasks = null;
  token = await getToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try{
    await api.get('/tasks/'+id, config).then( response => {
     tasks = response.data
  });
  }catch ( error ) {
    console.log(error.message)
  }
  return tasks
}

export class TaskAnsweringScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      answersSoFar: '',
      id:  this.props.navigation.state.params.id,
      name: '',
      points: 0 ,
      numberOfTasks: 0,
      urlImage: '',
      data: [' '], 
      loaded: false
    };
}


  async componentDidMount(){
      // console.log('carregou')
      
      await getTasks(this.state.id).then(data => {
        // console.log(data)
        this.setState({ 
          name: data.name,
          points: data.points ,
          numberOfTasks: data.questions.length,
          urlImage: data.campaign.cover,
          data: makeJsonInfo(data.questions, data.description)
        })
      })
        // console.log(data.questions)  
      //  .log(makeJsonInfo(data.questions, data.description));
        
   
  }

 

  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];
    const answersAsObj = {};
    
    for (const elem of infoQuestionsRemoved) { answersAsObj[elem.question_id] = elem.value; }
    // console.log(answers)
    // console.log(this.props)
    this.props.navigation.navigate('CompletedTask', { id: this.state.id, answers: answers, points: this.state.points, urlImage: this.state.urlImage });
  }

  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <Layout style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button disabled={!enabled} onPress={onPress} style={styles.button}>Anterior</Button>
      </Layout>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <Layout style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button disabled={!enabled} onPress={onPress} style={styles.button}>Próxima</Button>
      </Layout>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <Layout style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button status = 'success' disabled={!enabled} onPress={onPress} style={styles.button}>Concluir</Button>
      </Layout>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <Layout
          key={`selection_button_view_${index}`}
          style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}>
          <Button status = 'info' key={`button_${index}`} appearance = {isSelected ? 'filled' : 'outline'} onPress={onPress} style={styles.button}>{data.optionText}</Button>
      </Layout>
    );
  }

  renderQuestionText(questionText) {
    return (
      <Layout style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.questionText} category = 's1'>{questionText}</Text>
      </Layout>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <Layout>
        <Input
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType='done'
        />
      </Layout>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput 
        style={styles.numericInput}
        onChangeText={text => { onChange(text); }}
        underlineColorAndroid={'white'}
        placeholderTextColor={'rgba(184,184,184,1)'}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={'numeric'}
        onBlur={onBlur}
        maxLength={3}
    />
    );
  }

    //Parte textual da info
  renderInfoText(infoText, name, points, questionsNo) {
    return (
      <Layout style={styles.infoTextContainer}>
        <Text category='h4'> {name} </Text>
        <Layout style = {{display: 'flex', flexDirection: 'row'}}>
          <Button size='tiny' style = {styles.infoButton} status = 'success'> {points} pontos</Button>
          <Button size='tiny' style = {styles.infoButton} status = 'info'> {questionsNo} perguntas</Button>
        </Layout>
        <Text style = {styles.infoText} category='s1' >{infoText}</Text>
      </Layout>
    );
  }

  render() {
    return (
      <ImageBackground blurRadius={3} source={{ uri: this.state.urlImage }} style={styles.background}>
        <Layout level = '2'  style = {styles.overlay}>
          {/* <Text appearance='alternative'>{ this.state.name }</Text>
          <Text appearance='alternative'>{ this.state.id }</Text>
          <Text appearance='alternative'>{ this.state.numberOfTasks }</Text>
          <Text appearance='alternative'>{ this.state.points }</Text>
          <Text appearance='alternative'>{ this.state.urlImage }</Text>
          <Text appearance='alternative'>{ JSON.stringify(this.state.data) }</Text>
          <Text appearance='alternative'>{ this.state.loaded }</Text>
           */}
  
          { this.state && this.state.data  &&
          
          <Survey
            ref={(s) => { this.surveyRef = s; }}
            titleOfTask = { this.state.name}
            points = { this.state.points }
            questionsNo = { this.state.numberOfTasks }
            survey={this.state.data}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={styles.ButtonContainer}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />
          }
         
          </Layout> 
      </ImageBackground>  
    );
  }
}



const styles = StyleSheet.create({
  background: {
    flex: 1,
    minHeight: 800,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(122,5,200,0.2)',
    paddingVertical: 128,
    paddingHorizontal: 16,
    minHeight: 800,
    flex: 1,
  },
  surveyContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
  },
  ButtonContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    padding: 16,
    paddingTop:32,
  },
  selectionGroupContainer: {
    display: 'flex',  
    flexDirection: 'column',
    alignContent: 'flex-end',
    minHeight: 100,
    paddingHorizontal: 16,
  },
  questionText: {
    padding: 16,
    paddingVertical: 32,
  },
  textBox: {
    paddingHorizontal: 16,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  infoTextContainer: {
    minHeight: 100,
    padding: 16,
    paddingTop: 24,
  },
  infoText: {
    paddingTop: 16,
  },
  infoButton:{
    borderRadius: 16,
    marginRight: 5,
    marginTop: 10,
  }
});



//export const PaymentAccounts = withNavigation(PaymentConfig);