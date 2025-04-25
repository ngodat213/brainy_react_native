import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2196F3',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    alignSelf: 'center',
  },
  statusListContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F7',
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTotal: {
    fontSize: 11,
    fontWeight: '600',
  },
  wordList: {
    flex: 1,
    width: '100%',
  },
  wordItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    borderRadius: 8,
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    gap: 8,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wordPos: {  
    fontSize: 11,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  wordDefinition: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 8,
    color: '#B1B1B1',
  },
});