import { Text, View, Image } from "react-native";
import LoginPage from "../components/LoginPage";

// const Logo = ()=>{
//   return <Image source={require('@/assets/images/slate.png')} style={{ width: 100, height: 100}} />
// }
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-black p-2">
        <LoginPage/>
    </View>
  );
}