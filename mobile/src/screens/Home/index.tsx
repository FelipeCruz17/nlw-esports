import { useEffect, useState } from "react"
import { Image, FlatList } from "react-native"
import { Background } from "../../components/Background"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

import { Heading } from "../../components/Heading"
import { GameCard, GameCardProps } from "../../components/GameCard"

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles' 
import { GAMES } from "../../utils/games"

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGameScreen({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {
      id,
      title,
      bannerUrl
    })
  }

  useEffect(() => {
    fetch('http://172.23.93.22:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  }, [])
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />
        <Heading 
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
          renderItem={({ item }) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGameScreen(item)}
            />
          )}
        />
      </SafeAreaView>
    </Background>
  )
}