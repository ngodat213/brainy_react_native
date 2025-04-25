import { StyleSheet } from "react-native";

export const vocabDetailStyles = StyleSheet.create({
  container: { flex: 1 },
  appBar: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  content: {
    padding: 16,
  },
  word: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#007bff',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#007bff',
    marginTop: 8,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  phoneticText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#666',
  },
  senseBlock: {
    marginTop: 10,
  },
  definition: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  examplesTitle: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  example: {
    fontSize: 12,
  }
});