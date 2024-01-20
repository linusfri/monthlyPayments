import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { base, typo } from '../styles/index';

export default function Header() {
  return (
      <View style={base.styles.header}>
          <Ionicons style={base.styles.headerIcon} name='wallet'/>
          <Text style={[typo.styles.h1Bold, base.styles.padding12LR]}>
                SalaryApp
          </Text>
      </View>
  );
}
