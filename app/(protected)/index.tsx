import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { Todo } from "@/utils/interfaces";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { addTodo, deleteTodo, getTodos, toggleComplete } from "@/utils/api";
import AppleStyleSwipeableRow from "@/components/AppleStyleSwipeableRow";

const ProtectedIndex = () => {
  const [todo, setTodo] = useState("");

  const queryClient = useQueryClient();
  const todosQuery = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  const todosAddMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTodo("");
    },
  });
  const todosDeleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data, id) => {
      queryClient.setQueryData(["todos"], (old: Todo[]) =>
        old.filter((t) => t.id !== id)
      );
    },
  });

  const todosToggleMutation = useMutation({
    mutationFn: toggleComplete,
    onSuccess: (data, varibale) => {
      queryClient.setQueryData(["todos"], (old: Todo[]) => {
        return old.map((t: Todo) => {
          if (t.id === varibale.id) {
            return { ...t, is_completed: !t.is_completed };
          } else {
            return t;
          }
        });
      });
    },
  });

  const renderItem: ListRenderItem<Todo> = ({ item }) => (
    <AppleStyleSwipeableRow
      todo={item}
      onToggle={() => todosToggleMutation.mutate(item)}
      onDelete={() => todosDeleteMutation.mutate(item.id)}
    >
      <View style={{ padding: 12, flexDirection: "row", gap: 10, height: 44 }}>
        <Text>{item.task}</Text>
      </View>
    </AppleStyleSwipeableRow>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: 24, paddingHorizontal: 12 }}>
        <TextInput
          style={styles.input}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="Todo"
        />
        <Button
          title="Add Todo"
          onPress={() => todosAddMutation.mutate(todo)}
          style={{ marginTop: 8 }}
          disabled={todosAddMutation.isPending}
        />
      </View>
      <View>
        {todosQuery.isSuccess && (
          <FlatList
            data={todosQuery.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        {todosQuery.isError && <Text>{JSON.stringify(todosQuery.error)}</Text>}
        {todosAddMutation.isError && (
          <Text>{JSON.stringify(todosAddMutation.error)}</Text>
        )}
      </View>
    </View>
  );
};

export default ProtectedIndex;

const styles = StyleSheet.create({
  input: {
    height: 46,
    padding: 8,
    borderWidth: 1,
    borderColor: "#2b825b",
    borderRadius: 4,
  },
});
