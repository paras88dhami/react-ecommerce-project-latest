import { View, Text, Pressable } from "react-native";
import { UserItem } from "@/types/apolloTypes";

export default function UserRow({
  user,
  onEdit,
  onDelete,
}: {
  user: UserItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={{ paddingVertical: 12, borderBottomWidth: 0.5 }}>
      <Text style={{ fontWeight: "600" }}>{user.name}</Text>
      <Text>@{user.username}</Text>
      <Text>{user.email}</Text>

      <View style={{ flexDirection: "row", gap: 16, marginTop: 6 }}>
        <Pressable onPress={onEdit}>
          <Text style={{ color: "blue" }}>Edit</Text>
        </Pressable>

        <Pressable onPress={onDelete}>
          <Text style={{ color: "red" }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}
