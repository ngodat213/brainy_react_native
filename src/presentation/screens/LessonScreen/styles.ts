import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
  },
  backButton: {
    marginRight: 16,
    position: 'absolute',
    left: 16,
    top: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 32,
    textAlign: 'center',
  },
  list: {
    marginTop: 48,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  lessonTitleContainer: {
    marginHorizontal: 16,
    borderRadius: 10,
  },
  lessonOrderIndex: {
    fontSize: 13,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 11,
    fontWeight: '400',
    overflow: 'hidden',
    maxWidth: '100%',
  },
});
