import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons } from "@expo/vector-icons"
import { CheckCircle } from "phosphor-react-native"
import { Heading } from '../Heading'
import { styles } from "./styles"
import { THEME } from '../../theme'
import { useState } from 'react';

interface Props extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest}: Props) {
  const [isCopping, setIsCopping] = useState(false)
  
  async function handleCopyDiscordUserToClipBoard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert('Discord copiado!', 'Usuário/discord copiado para clipboard')
    setIsCopping(false)
  }

  return (
    <Modal 
      {...rest} 
      transparent 
      statusBarTranslucent
      animationType='fade'
    >
      <View style={styles.container}>
        <View style={styles.content}>

          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons 
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          />

          <Heading 
            title="Let's play" 
            subtitle='Aqui é só começar a jogar!'
            style={{ alignItems: 'center', marginTop: 24}}
          />

          <Text style={styles.label}>
            Adicione seu discord
          </Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordUserToClipBoard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
          

        </View>
      </View>
    </Modal>
  )
}