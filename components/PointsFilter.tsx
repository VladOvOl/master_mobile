import Slider from "@react-native-community/slider";
import React, { FC, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export type IQuery = {
  name: string;
  locationTypeId: number;
  range: number;
  search: boolean;
};

type Props = {
  value: IQuery;
  onChange: (query: IQuery) => void;
};

export const PointsFilter: FC<Props> = ({
   value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const update = (patch: Partial<IQuery>) => {
    onChange({ ...value, ...patch, search: false });
  };

  return (
    <View style={styles.wrapper}>
      {/* Toggle */}
      <Pressable
        style={styles.header}
        onPress={() => setOpen((v) => !v)}
      >
        <Text style={styles.headerText}>
          {open ? "Hide filters ▲" : "Show filters ▼"}
        </Text>
      </Pressable>

      {/* Content */}
      {open && (
        <View style={styles.content}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={value.name}
            onChangeText={(text) => update({ name: text })}
            placeholder="Enter name"
            style={styles.input}
          />

          <Text style={styles.label}>Location type</Text>
          <View style={styles.row}>
            {[1, 2, 3].map((id) => (
              <Pressable
                key={id}
                onPress={() => update({ locationTypeId: id })}
                style={[
                  styles.typeButton,
                  value.locationTypeId === id &&
                    styles.typeButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.typeText,
                    value.locationTypeId === id &&
                      styles.typeTextActive,
                  ]}
                >
                  Type {id}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>
            Range: <Text style={styles.range}>{value.range} km</Text>
          </Text>

          <Slider
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={value.range}
            onSlidingComplete={(v) => update({ range: v })}
          />

          <Pressable
            style={styles.searchButton}
            onPress={() => {
              onChange({ ...value, search: true });
              setOpen(false); // свернуть после поиска
            }}
          >
            <Text style={styles.searchText}>Search</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  content: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  typeButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  typeText: {
    color: "#333",
  },
  typeTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  range: {
    color: "#007AFF",
    fontWeight: "700",
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  searchText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});