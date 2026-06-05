import { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  title?: string;
  icon?: ReactNode;
  onPress: () => void;
}

export function Button({ icon, title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
      }}
    >
      {icon || <Text>{title}</Text>}
    </TouchableOpacity>
  );
}