import {
    FlatList,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { Task } from "@/types/Task";
import { Ionicons } from "@expo/vector-icons";

interface ListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

export function List({
    tasks,
    onDelete,
    onEdit,
}: ListProps) {
    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [editedTitle, setEditedTitle] =
        useState("");

    const flatListRef = useRef<FlatList>(null);

    function handleStartEdit(task: Task) {
        setEditingId(task.id);
        setEditedTitle(task.title);

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({
                animated: true,
            });
        }, 300);
    }

    return (
        <View
            style={{
                flex: 1,
                marginTop: 20,
            }}
        >
            <FlatList
                ref={flatListRef}
                data={tasks}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive"
                contentContainerStyle={{
                    paddingBottom: 600,
                }}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 18,

                            backgroundColor:
                                editingId === item.id
                                    ? "#b5b4d1"
                                    : "#4A4970",

                            borderRadius: 20,
                            marginBottom: 16,

                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 8,

                            elevation: 5,
                        }}
                    >
                        {editingId === item.id ? (
                            <>
                                <TextInput
                                    value={editedTitle}
                                    onChangeText={
                                        setEditedTitle
                                    }
                                    autoFocus
                                    onFocus={() => {
                                        setTimeout(() => {
                                            flatListRef.current?.scrollToIndex({
                                                index,
                                                animated: true,
                                                viewPosition: 0,
                                            });
                                        }, 300);
                                    }}
                                    style={{
                                        flex: 1,
                                        color: "#000000",
                                        fontSize: 18,
                                        fontWeight: "500",
                                        padding: 0,
                                        margin: 0,
                                    }}
                                />

                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 16,
                                        alignItems: "center",
                                        marginLeft: 12,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            onEdit({
                                                ...item,
                                                title:
                                                    editedTitle,
                                            });

                                            setEditingId(
                                                null
                                            );
                                            setEditedTitle(
                                                ""
                                            );
                                        }}
                                    >
                                        <Ionicons
                                            name="checkmark-outline"
                                            size={24}
                                            color="#0a963b"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setEditingId(
                                                null
                                            );

                                            setEditedTitle(
                                                ""
                                            );
                                        }}
                                    >
                                        <Ionicons
                                            name="close-outline"
                                            size={24}
                                            color="#ad1e5f"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: "#FFFFFF",
                                        fontSize: 18,
                                        fontWeight: "500",
                                    }}
                                >
                                    {item.title}
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 16,
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleStartEdit(
                                                item
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="create-outline"
                                            size={24}
                                            color="#67C2FF"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() =>
                                            onDelete(
                                                item.id
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={24}
                                            color="#FF4D9D"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                )}
            />
        </View>
    );
}