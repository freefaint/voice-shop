import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  StatusBar,
} from 'react-native';

import Voice, {
  SpeechResultsEvent,
} from '@react-native-community/voice';
import CheckBox from '@react-native-community/checkbox';

type Props = {};
type State = {
  results?: string[];
  showText: boolean;
  partialResults?: string[];
};

interface IProduct { name: string; names: string[], img: string, pos?: number };

const products: Array<IProduct> = [
  {
 name: "Жаренные хинкали",
    names: [ " Жаренные хинкали", " Жаренные хинкалики", " поджаренные хинкали", " обжаренные хинкали", " поджарка хинкали", " обжарка хинкали", " обжарьте хинкали", " пожарьте хинкали", " жарите хинкали" ],
    img: "https://be-at.ru/voice-shop/1.png",
  },
 
  {
    name: "Хинкали",
    names: [ "хинкали", "хинкальная", "хинкалики", "классические хинкали", "хинкали со свининой"    , "хинкали с говядиной", "хинкали со свининой", "хинкали со свининой и говядиной", "хинкали с говядиной  и свининой"],
    img: "https://be-at.ru/voice-shop/2.png",
  },
 
  {
    name: "хинкали из баранины",
    names: [ "хинкали из баранины", "хинкали с бараниной", "хинкали из барана", "хинкали с бараном","хинкали из барашка", "хинкали с барашком" ],
    img: "https://be-at.ru/voice-shop/3.png",
  },
 
  {
    name: "хинкали с сыром",
    names: [ "хинкали с сыром", "сырные хинкали", "хинкали с сулугуни"],
    img: "https://be-at.ru/voice-shop/4.png",
  },
 
  {
    name: "шашлык из свиных ребер",
    names: [ "шашлык из ребер", "шашлык из свиных ребер" ],
    img: "https://be-at.ru/voice-shop/5.png",
  },
 
  {
    name: "шашлык из курицы",
    names: [ "шашлык из курицы", "куриный шашлык" ],
    img: "https://be-at.ru/voice-shop/6.png",
  },
 
  {
    name: "шашлык из свинины",
    names: [ "шашлык из свинины", "свиной шашлык", "шашлык из шейки", "шашлык из свиной шейки", "свиной шашлык из шейки", "шашлык"],
    img: "https://be-at.ru/voice-shop/7.png",
  },
 
  {
    name: "овощной шашлык",
    names: [ "шашлык из овощей", "шашлык для веганов", "овощи гриль"],
    img: "https://be-at.ru/voice-shop/8.png",
  },
 
  {
    name: "цыпленок табака",
    names: [ "цыпленок табака", "цыпленок", "жареный цыпленок", "обжареный цыпленок"  ],
    img: "https://be-at.ru/voice-shop/9.png",
  },
 
  {
    name: "цыпленок по чкмерски",
    names: [ "цыпленок почкмерски", "цыпленок по чкмерски", "цыпленок по-чкмерски", "цыпленок со сметаной", "цыпленок по-кмерски"  ],
    img: "https://be-at.ru/voice-shop/10.png",
  },
 
  {
    name: "чахохбили из курицы",
    names: [ "чахохбили из курицы", "чахохбили", "чахохбили куриный", "чахохбили курица", "чахохбили", "чахохбили с курицей"  ],
    img: "https://be-at.ru/voice-shop/11.png",
  },
 
  {
    name: "оджахури",
    names: [ "оджахури", "оджахури со свининой", "свинина с овощами" ],
    img: "https://be-at.ru/voice-shop/12.png",
  },
 
  {
    name: "долма",
    names: [ "долма", "виноградные листья", "листья винограда" ],
    img: "https://be-at.ru/voice-shop/13.png",
  },
  
{
    name: "лобио по-имеретенски",
    names: [ "лобио по-имеретенски", "фасоль" ],
    img: "https://be-at.ru/voice-shop/14.png",
  },
 
  {
    name: "чашушули из говядины",
    names: [ "чашушули из говядины", "тушеная говядина", "тушенка говяжья" ],
    img: "https://be-at.ru/voice-shop/15.png",
  },
 
  {
    name: "чакапули",
    names: [ "чакапули", "чакапули из баранины" ],
    img: "https://be-at.ru/voice-shop/16.png",
  },
 
  {
    name: "Шампиньоны с сыром",
    names: [ "шампиньоны с сыром", "шампиньоны с сулугуни", "грибы с сулугуни", "грибы по имеритински", "шампиньоны по имеритински" ],
    img: "https://be-at.ru/voice-shop/17.png",
  },
 
  {
    name: "Жареный сулугуни",
    names: [ "жареный сулугуни", " сулугуни с помидорами", "обжаренный сулугуни" ],
    img: "https://be-at.ru/voice-shop/18.png",
  },
 
  {
    name: "чанахи из говядины",
    names: [ "чанахи из говядины", " чанахи", "чанахи с говядиной" ],
    img: "https://be-at.ru/voice-shop/19.png",
  },
 
  {
    name: "кучмачи",
    names: [ "кучмачи", "говяжьи потроха", "тушеные говяжьи потроха" ],
    img: "https://be-at.ru/voice-shop/20.png",
  },

  {
    name: "картофель фри",
    names: [ "картофель фри", "картофель во фритюре" ],
    img: "https://be-at.ru/voice-shop/21.png",
  },

  {
    name: "Картофель по-деревенски",
    names: [ "картофель по-деревенски", "по-деревенски", "картофель на гарнир"],
    img: "https://be-at.ru/voice-shop/21.png",
  },
 
  {
    name: "рис с овощами",
    names: [ "рис", "рис с овощами", "рис на гарнир" ],
    img: "https://be-at.ru/voice-shop/23.png",
  },
 
  {
    name: "Пюре с куриной котлетой",
    names: [ "пюре с куриной котлетой", "пюре с котлетой", "картошка  с котлетой", "картошка  с котлеткой"  ],
    img: "https://be-at.ru/voice-shop/24.png",
  },

  {
    name: "Куриные нагетсы",
    names: [ "куриные наггетсы", "наггетсы", "нагетсы" ],
    img: "https://be-at.ru/voice-shop/25.png",
  },
 
  {
    name: "Хачапури по-мегрельски",
    names: [ "хачапури", "хачапури по-мегрельски", "по-мегрельски", "хачапури с сыром" ],
    img: "https://be-at.ru/voice-shop/26.png",
  },
 
  {
    name: "Хачапури по-имеретински",
    names: [ "хачапури по-имеретински", "по-имеретински" ],
    img: "https://be-at.ru/voice-shop/27.png",
  },

  {
    name: "хачапури со шпинатом",
    names: [ "хачапури со шпинатом", "хачапури шпинат" ],
    img: "https://be-at.ru/voice-shop/28.png",
  },

  {
    name: "Хачапури по-аджарски",
    names: ["хачапури по-аджарски", "хачапури по-аджарски", "хачапури с яйцом", "хачапури с желтком" ],
    img: "https://be-at.ru/voice-shop/29.png",
  },
 
  {
    name: "Хачапури Пеновани",
    names: [ "Хачапури Пеновани", "хачапури из слоеного теста", "маленький хачапури" ],
    img: "https://be-at.ru/voice-shop/30.png",
  },
 
  {
    name: "Лаваш",
    names: [ "лаваш", "грузинский лаваш" ],
    img: "https://be-at.ru/voice-shop/31.png",
  },
 
  {
    name: "кубдари с мясом",
    names: [ "кубдари с мясом", "кубдари", "пирог с мясом" ],
    img: "https://be-at.ru/voice-shop/32.png",
  },
 
  {
    name: "Ачма с мациони",
    names: [ "ачма с мациони", "ачма" ],
    img: "https://be-at.ru/voice-shop/33.png",
  },
 
  {
    name: "Coca-cola",
    names: [ "Coca-cola", "кока-кола", "кока", "кока", "коки" ],
    img: "https://be-at.ru/voice-shop/34.png",
  },
 
  {
    name: "Borjomi",
    names: [ "Borjomi", "боржоми" ],
    img: "https://be-at.ru/voice-shop/35.png",
  },

  {
    name: "Джемрук",
    names: [ "Джемрук"],
    img: "https://be-at.ru/voice-shop/36.png",
  },
 
  {
    name: "Bon Aqua",
    names: [ "Bon Aqua", "бон аква", "вода", "водичка", "попить", "без газа" ],
    img: "https://be-at.ru/voice-shop/37.png",
  },
 
  {
    name: "Лимонад Натахари",
    names: [ "Лимонад Натахари", "Натахари", "лимонад", "газировка" ],
    img: "https://be-at.ru/voice-shop/38.png",
  },
 
  {
    name: "Аджика",
    names: [ "аджика", "соус аджика" ],
    img: "https://be-at.ru/voice-shop/39.png",
  },
  
  {
    name: "Соус Ткемали",
    names: [ "Соус Ткемали", "ткемали" ],
    img: "https://be-at.ru/voice-shop/40.png",
  },
 
  {
    name: "Соус Сацебели",
    names: [ "Сацебели", "Соус Сацебели" ],
    img: "https://be-at.ru/voice-shop/41.png",
  },
 
  {
    name: "Соус Цахтон",
    names: [ "Соус Цахтон", "Цахтон" ],
    img: "https://be-at.ru/voice-shop/42.png",
  },
 
  {
    name: "Майонез",
    names: [ "майонез" ],
    img: "https://be-at.ru/voice-shop/43.png",
  },
 
  {
    name: "Сметана",
    names: [ "Сметана"],
    img: "https://be-at.ru/voice-shop/44.png",
  },

  {
    name: "Соус Наршараб",
    names: [ "Соус Наршараб", "Наршараб" ],
    img: "https://be-at.ru/voice-shop/45.png",
  },
];

class App extends Component<Props, State> {
  state = {
    results: [],
    showText: false,
    partialResults: [],
  };

  constructor(props: Props) {
    super(props);
    
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
  }

  getProducts = () => {
    const text = (this.state.results.join(", ") + ", " + this.state.partialResults.join(", ")).toLowerCase();
    const prods = products.filter(i => !!i.names.find(j => text.indexOf(j) !== -1));

    const order = prods.map(i => ({ ...i, pos: Math.max(...i.names.map(j => text.lastIndexOf(j)).filter(k => k !== -1)) }) );

    return order.sort((a, b) => a.pos > b.pos ? 1 : a.pos < b.pos ? -1 : 0);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
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
    
    let prod: IProduct | undefined = prods[prods.length - 1] || products[products.length - 2];

    return (
      // <ScrollView>
      <View style={styles.container}>
        <View style={{ display: 'flex', position: 'absolute', backgroundColor: '#ccc', height: '100%', width: '100%' }}>
          {prod && (
            <>
              <Image style={{ display: 'flex', width: '100%', height: '100%' }} onError={e => console.log(e)} source={{ uri: prod.img }} />
              <Text style={{ display: 'flex', position: 'absolute', alignSelf: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, color: '#fff' }}>{prod.name}</Text>
            </>
          )}
        </View>
        {this.state.showText && (
          <>
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
          </>
        )}
        
        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('./button.png')} />
        </TouchableHighlight>

        <View style={{ display: "none", flexDirection: "row", alignItems: "center" }}>
          <CheckBox value={this.state.showText} onChange={() => this.setState(state => ({ showText: !state.showText}))} /><Text>Показывать текст</Text>
        </View>

        <TouchableHighlight style={{ display: 'none' }} onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
      </View>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
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