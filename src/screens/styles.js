import { StyleSheet, Dimensions } from "react-native";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    width: Dimensions.get("window").width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  formHeading: {
    textAlignVertical: "center",
    textAlign: "center"
  },
  form: {
    width: "50%",
    justifyContent: "center"
  },
  fonts: {
    fontSize: 50,
    fontWeight: 'bold',
  }
});
