import { StyleSheet, RefreshControl } from "react-native";
import { w, h } from "../../utils/Dimensions";



export default StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'
  },
  main_Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090'
  },
  titleText: {
    fontSize: 32, color: "#2C87D7"
  },
  width: {
    width: '100%',
  },
  textStyle: {
    marginVertical: 10, lineHeight: 23, fontWeight: '500',
  },
  margin: {
    marginHorizontal: 5
  }
});
