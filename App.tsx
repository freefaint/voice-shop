import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import Voice, {
  SpeechResultsEvent,
} from '@react-native-community/voice';

type Props = {};
type State = {
  results?: string[];
  partialResults?: string[];
};

const products: Array<{ name: string; names: string[], img: string }> = [
  {
    name: "Грибы",
    names: [ "грибы", "мухомор" ],
    img: "https://lh3.googleusercontent.com/proxy/wu0CSM-BCN0VsxxSTwBQxX_2E2TSGAJVTDmBgG8j0cSeKVskF3L_RqQ8zHejxSn4GaFVDXOZWDbDnv7Wx9uXD2qhS91PIFve3LZvbT1zccAv46R-_S_X1Cw",
  },
  {
    name: "Оливье",
    names: [ "оливье", "салат" ],
    img: "https://www.wholesomeyum.com/wp-content/uploads/2018/05/wholesomeyum-healthy-olivie-russian-olivier-salad-recipe-3.jpg",
  },
  {
    name: "Пельмени",
    names: [ "пельмени", "пельмешки" ],
    img: "https://www.koolinar.ru/all_image/recipes/140/140158/recipe_889546db-8fcb-4d31-85c3-8e276495fa70_large.jpg",
  },
  {
    name: "Рыба",
    names: [ "рыба", "акула", "треска" ],
    img: "https://fishingday.org/wp-content/uploads/2019/02/1-18.jpg",
  },
  {
    name: "Свинина",
    names: [ "свинья", "свинина", "поросенок", "кабан" ],
    img: "https://zelenyjmir.ru/wp-content/uploads/2017/06/Svinya-9-3.jpg",
  },
  {
    name: "Курица",
    names: [ "курочка", "курица" ],
    img: "https://lh3.googleusercontent.com/proxy/MoouNj-rWC_S771y4wiqvJV5PT-5PTUFHYOv6hPpfTXScNWTIhMtT4nDWMjlwSPGpJagO6VdV4a0gJJrImsYYRnsvsiT4FiJh5KmXQ",
  },
];

class App extends Component<Props, State> {
  state = {
    results: [],
    partialResults: [],
  };

  constructor(props: Props) {
    super(props);
    
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
  }

  getProducts = () => {
    return products.filter(i => !!i.names.find(j => (this.state.results.join(", ") + ", " + this.state.partialResults.join(", ")).toLowerCase().indexOf(j) !== -1))
  }

  componentDidMount() {
    this._startRecognizing();
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  retry = () => {
    setTimeout(this._startRecognizing, 1000);
  }

  onSpeechEnd = (e: any) => {
    console.log('end', e);
    this.retry();
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    this.setState(state => ({
      results: [ ...(state.results || []), ...(e.value || []) ],
    }));
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      partialResults: [],
    });

    try {
      await Voice.start('ru-RU');
    } catch (e) {
      this.retry();
    }
  };

  _cancelRecognizing = async () => {
    this.setState({
      results: []
    });

    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const prods = this.getProducts();
    
    

    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {prods.map((i, j) => (
            <View style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: '#ccc' }} key={j}>
              <Image onError={e => console.log(e)} source={{ uri: i.img }} style={{ width: 100, height: 100 }} />
              <Text style={{ alignSelf: "center" }}>{i.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        
        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('./button.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default App;