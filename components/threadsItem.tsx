import * as React from "react";
import { Thread } from "../types/threads";
import { Text, View } from "./Themed";
import { useColorScheme, StyleSheet } from "react-native";
import {
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { TimeAgo } from "../utils/time-ago";
import { Image } from "expo-image";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export default function ThreadsItem(thread: Thread): JSX.Element {
  return (
    <View style={styles.container}>
      {/* <Text>
        {thread.author.userName}
      </Text> */}
      <PostLiftSide {...thread} />
      <View style={{ gap: 6,flexShrink: 1 }}>
        <PostHeader
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.verified}
        />
        <Text>
          {thread.content}
        </Text>
        {thread.image &&
          <Image
            source={thread.image}
            style={{ width: "100%", minHeight: 300, borderRadius: 10 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={200}
          />}
        <BottomIcons />
        <PostFooter replies={thread.repliesCount} likes={thread.likesCount} />
      </View>
    </View>
  );
}

function PostHeader({
  name,
  createdAt,
  verified
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) {
  return (
    <View style={styles.postHeaderView}>
      <View style={styles.rowView}>
        <Text style={{ fontWeight: "500" }}>
          {name}
        </Text>
        {verified &&
          <MaterialIcons name="verified" size={16} color="#60a5fa" />}
      </View>
      <View style={styles.rowView}>
        <Text style={{ color: "gray" }}>
          {TimeAgo(createdAt)}
        </Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
}

function PostFooter({ replies, likes }: { replies: number; likes: number }) {
  return (
    <Text style={{ color: "gray" }}>
      {replies} replies . {likes} likes
    </Text>
  );
}

function BottomIcons() {
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";
  return (
    <View style={styles.rowView}>
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
    </View>
  );
}

function PostLiftSide(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "dark" ? "#00000020" : "#ffffff20";
  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={200}
      />
      <View
        style={{
          borderColor,
          borderWidth: 1,
          alignSelf: "center",
          flexGrow: 1
        }}
      />
      <View
        style={{ width: 20, alignItems: "center", alignSelf: "center", gap: 3 }}
      >
        {[1, 2, 3].map(item => <Image 
        key={item} 
        // @ts-ignore
        source={thread.replies[item - 1]?.author.photo}
        style={{width: item * 9, height: item * 9, borderRadius:15}}
        placeholder={blurhash}
        contentFit="cover"
        transition={200}
         />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
    color:"transparent"
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  postHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
