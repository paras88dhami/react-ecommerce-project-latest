import { View, TextInput, Pressable, Text } from "react-native";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  onSubmit: () => void;
  submitLabel: string;
};

export default function UserForm({ control, onSubmit, submitLabel }: Props) {
  return (
    <View className="space-y-4">
      {/* NAME */}
      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View>
            <Text className="text-sm text-gray-600 mb-1">Name</Text>
            <TextInput
              placeholder="Full name"
              value={value}
              onChangeText={onChange}
              className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
            />
          </View>
        )}
      />

      {/* USERNAME */}
      <Controller
        control={control}
        name="username"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View>
            <Text className="text-sm text-gray-600 mb-1">Username</Text>
            <TextInput
              placeholder="Username"
              value={value}
              onChangeText={onChange}
              className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
            />
          </View>
        )}
      />

      {/* EMAIL */}
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View>
            <Text className="text-sm text-gray-600 mb-1">Email</Text>
            <TextInput
              placeholder="Email address"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
            />
          </View>
        )}
      />

      {/* SUBMIT BUTTON */}
      <Pressable
        onPress={onSubmit}
        className="bg-blue-600 rounded-xl py-3 mt-2"
      >
        <Text className="text-white text-center font-semibold text-base">
          {submitLabel}
        </Text>
      </Pressable>
    </View>
  );
}
