import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../core/utils/screenUtils";

export const signUpStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.05,
    marginTop: SCREEN_WIDTH * 0.3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SCREEN_WIDTH * 0.05,
  },
  footerText: {
    marginRight: SCREEN_WIDTH * 0.02,
  },
})