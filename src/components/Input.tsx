import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useRef, useState } from "react";

interface InputProps {
    placeholder: string;
    onSubmit: (value: string) => void;
    initialValue?: string;
}

export function Input({
    placeholder,
    initialValue,
    onSubmit,
}: InputProps) {
    const [value, setValue] = useState(initialValue ?? "");
    const [focused, setFocused] = useState(false);

    const inputRef = useRef<TextInput>(null);

    const expanded = focused;

    function handleSubmit() {
        if (!value.trim()) {
            return;
        }

        onSubmit(value);

        setValue("");
        setFocused(false);

        inputRef.current?.blur();
    }

    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: "#FFFFFF",
                borderRadius: 25,
                paddingLeft: 18,
                paddingRight: 6,

                height: expanded ? 120 : 55,

                alignItems: expanded ? "flex-start" : "center",
                paddingTop: expanded ? 12 : 0,

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 8,

                elevation: 8,
            }}
        >
            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={setValue}
                onFocus={() => {
                    setFocused(true);
                }}

                onEndEditing={() => {
                    setFocused(false);
                }}
                multiline
                placeholder={placeholder}
                placeholderTextColor="#666"
                style={{
                    flex: 1,
                    fontSize: 18,
                    minHeight: expanded ? 100 : 40,
                    textAlignVertical: "top",
                }}
            />

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={!value.trim()}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,

                    backgroundColor:
                        value.trim()
                            ? "#67C2FF"
                            : "#B8B8B8",

                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    +
                </Text>
            </TouchableOpacity>
        </View>
    );
}