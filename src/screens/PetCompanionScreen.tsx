import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

type NeedKey = "hunger" | "happiness" | "energy";

type PetState = Record<NeedKey, number> & {
  name: string;
};

type CareAction = {
  label: string;
  helperText: string;
  apply: (pet: PetState) => PetState;
};

const clampNeed = (value: number) => Math.max(0, Math.min(100, value));

const careActions: CareAction[] = [
  {
    label: "Feed",
    helperText: "A healthy snack boosts hunger and gives a small mood lift.",
    apply: (pet) => ({
      ...pet,
      hunger: clampNeed(pet.hunger + 18),
      happiness: clampNeed(pet.happiness + 4),
      energy: clampNeed(pet.energy - 3),
    }),
  },
  {
    label: "Play",
    helperText: "Playtime makes your pet happier, but costs energy.",
    apply: (pet) => ({
      ...pet,
      happiness: clampNeed(pet.happiness + 20),
      hunger: clampNeed(pet.hunger - 6),
      energy: clampNeed(pet.energy - 12),
    }),
  },
  {
    label: "Rest",
    helperText: "A cozy nap restores energy and settles your pet.",
    apply: (pet) => ({
      ...pet,
      energy: clampNeed(pet.energy + 24),
      hunger: clampNeed(pet.hunger - 5),
      happiness: clampNeed(pet.happiness + 2),
    }),
  },
];

const PetCompanionScreen = () => {
  const [pet, setPet] = useState<PetState>({
    name: "Pixel",
    hunger: 72,
    happiness: 68,
    energy: 64,
  });
  const [lastCare, setLastCare] = useState("Pixel is excited to spend time with you.");

  const overallWellness = useMemo(
    () => Math.round((pet.hunger + pet.happiness + pet.energy) / 3),
    [pet.energy, pet.happiness, pet.hunger]
  );

  const mood = useMemo(() => {
    if (overallWellness >= 85) return { emoji: "🐾", label: "Thriving" };
    if (overallWellness >= 65) return { emoji: "😊", label: "Content" };
    if (overallWellness >= 45) return { emoji: "😐", label: "Needs attention" };
    return { emoji: "🥺", label: "Needs care" };
  }, [overallWellness]);

  const handleCare = (action: CareAction) => {
    setPet((currentPet) => action.apply(currentPet));
    setLastCare(action.helperText);
  };

  const renderNeed = (label: string, value: number, color: string) => (
    <View style={styles.needRow}>
      <View style={styles.needLabelRow}>
        <Text style={styles.needLabel}>{label}</Text>
        <Text style={styles.needValue}>{value}%</Text>
      </View>
      <View style={styles.needTrack}>
        <View style={[styles.needFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>Virtual Pet</Text>
        <Text style={styles.title}>Meet {pet.name}</Text>
        <Text style={styles.subtitle}>Care for your companion with simple daily check-ins.</Text>

        <View style={styles.petCard}>
          <Text style={styles.petAvatar}>🐶</Text>
          <Text style={styles.moodText}>{mood.emoji} {mood.label}</Text>
          <Text style={styles.scoreText}>Wellness score: {overallWellness}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Needs</Text>
          {renderNeed("Fullness", pet.hunger, "#43d17a")}
          {renderNeed("Happiness", pet.happiness, "#ffd166")}
          {renderNeed("Energy", pet.energy, "#66a6ff")}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Care actions</Text>
          <View style={styles.actionGrid}>
            {careActions.map((action) => (
              <TouchableOpacity
                key={action.label}
                onPress={() => handleCare(action)}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.careNote}>{lastCare}</Text>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  eyebrow: {
    color: "#43d17a",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 8,
  },
  subtitle: {
    color: "#c9c9c9",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 18,
  },
  petCard: {
    alignItems: "center",
    backgroundColor: "#151515",
    borderColor: "#2a2a2a",
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
    padding: 24,
  },
  petAvatar: {
    fontSize: 92,
    marginBottom: 8,
  },
  moodText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  scoreText: {
    color: "#bdbdbd",
    fontSize: 15,
    marginTop: 6,
  },
  card: {
    backgroundColor: "#101010",
    borderColor: "#2b2b2b",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 14,
  },
  needRow: {
    marginBottom: 14,
  },
  needLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  needLabel: {
    color: "#e6e6e6",
    fontSize: 15,
    fontWeight: "600",
  },
  needValue: {
    color: "#bdbdbd",
    fontSize: 15,
  },
  needTrack: {
    backgroundColor: "#252525",
    borderRadius: 999,
    height: 12,
    overflow: "hidden",
  },
  needFill: {
    borderRadius: 999,
    height: "100%",
  },
  actionGrid: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#2e72ff",
    borderRadius: 12,
    flex: 1,
    paddingVertical: 13,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  careNote: {
    color: "#d6d6d6",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
  },
});

export default PetCompanionScreen;
