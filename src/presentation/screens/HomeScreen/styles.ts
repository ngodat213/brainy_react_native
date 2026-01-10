import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderText: {
    fontSize: 14,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#A4D7A7',
    borderWidth: 1,
    borderColor: '#7AC47C',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 16,
  },
  definitionText: {
    fontSize: 18,
    alignSelf: 'center',
    lineHeight: 24,
    color: '#666',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  exampleContainer: {
    marginTop: 16,
  },
  exampleText: {
    fontSize: 13,
    paddingVertical: 4,
  },
  swipperButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  swipperButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  audioContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  audioButton: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});