import { useEffect, useState } from "react"
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, useNavigation } from "@react-navigation/native"
import { Entypo } from "@expo/vector-icons"
import { GameParams } from "../../@types/navigation"

import { Heading } from "../../components/Heading"
import { Background } from "../../components/Background"
import { DuoCard, DuoCardProps } from "../../components/DuoCard"
import { DuoMatch } from "../../components/DuoMatch"
import { styles } from "./styles"
import { THEME } from "../../theme"

import logoImg from '../../assets/logo-nlw-esports.png'


export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const navigation = useNavigation()

  const route = useRoute()
  const game = route.params as GameParams

  function handleGoBackToScreenHome(){
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://172.23.93.22:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://172.23.93.22:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, [])
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBackToScreenHome}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}/>
        </View>
        {/* hackzinho para centralizar o logo -> criar uma view apenas para ocupar o espaço na tela */}

        <Image 
          source={{ uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar"
        />

        <FlatList 
          data={duos}
          keyExtractor={ item => item.id}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText} >
              Não há anúncios ainda.
            </Text>
          )}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>
          )}
        />
        <DuoMatch 
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  )
}