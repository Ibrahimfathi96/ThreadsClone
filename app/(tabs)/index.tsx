import React, { useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  Platform,
  RefreshControl
} from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import Lottie from "lottie-react-native";
import { ThreadsContext } from "../../context/threads-context";
import { Text } from "../../components/Themed";
import ThreadsItem from "../../components/threadsItem";
export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);
  const threads = React.useContext(ThreadsContext)
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30 })
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => {
              animationRef.current?.play();
            }}
          />
        }
      >
        <Lottie
          ref={animationRef}
          source={require("../../assets/threads.json")}
          loop={false}
          style={{
            width: 90,
            height: 90,
            alignSelf: "center"
          }}
          autoPlay
        />
        {threads.map((thread) => (
          <ThreadsItem key={thread.id}  {...thread}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
