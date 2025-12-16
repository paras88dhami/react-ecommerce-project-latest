import { View, TextInput, Pressable, Text } from "react-native";
import { Controller } from "react-hook-form";

export default function UserForm({
  control,
  onSubmit,
  submitLabel,
  defaultValues,
}: any) {
  return (
    <View>
      {["name", "username", "email"].map((field) => (
        <Controller
          key={field}
          control={control}
          name={field}
          defaultValue={defaultValues?.[field] ?? ""}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder={field}
              value={value}
              onChangeText={onChange}
              style={inputStyle}
            />
          )}
        />
      ))}

      <Pressable onPress={onSubmit}>
        <Text style={{ color: "green" }}>{submitLabel}</Text>
      </Pressable>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  borderRadius: 8,
  marginBottom: 8,
};
