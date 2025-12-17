import { View, Text, Pressable } from "react-native";
import { UserItem } from "@/types/apolloTypes";

type Props = {
  user: UserItem;
  onEdit: () => void;
  onDelete: () => void;
};

export default function UserRow({ user, onEdit, onDelete }: Props) {
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <View className="flex-row items-center p-4">
      {/* AVATAR */}
      <View className="h-12 w-12 rounded-full bg-blue-600 items-center justify-center mr-4">
        <Text className="text-white font-bold text-lg">
          {initials}
        </Text>
      </View>

      {/* USER INFO */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {user.name}
        </Text>
        <Text className="text-sm text-gray-500">
          @{user.username}
        </Text>
        <Text className="text-sm text-gray-400">
          {user.email}
        </Text>
      </View>

      {/* ACTIONS */}
      <View className="flex-row items-center space-x-3">
        <Pressable
          onPress={onEdit}
          className="px-3 py-1 rounded-full bg-blue-100"
        >
          <Text className="text-blue-700 text-sm font-medium">
            Edit
          </Text>
        </Pressable>

        <Pressable
          onPress={onDelete}
          className="px-3 py-1 rounded-full bg-red-100"
        >
          <Text className="text-red-700 text-sm font-medium">
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
