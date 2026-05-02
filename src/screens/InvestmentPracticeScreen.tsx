import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Quote = {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
};

type Position = {
  symbol: string;
  shares: number;
  avgCost: number;
};

type Trade = {
  id: string;
  action: "BUY" | "SELL";
  symbol: string;
  shares: number;
  price: number;
  timestamp: string;
};

const WATCHLIST = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "TSLA", "SPY", "QQQ"];
const STARTING_CASH = 100000;

const InvestmentPracticeScreen = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [cash, setCash] = useState(STARTING_CASH);
  const [positions, setPositions] = useState<Position[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [symbol, setSymbol] = useState("AAPL");
  const [shares, setShares] = useState("1");
  const [chatInput, setChatInput] = useState("What should I do next?");
  const [chatLog, setChatLog] = useState<string[]>([
    "AI Coach: Welcome. I use your current positions, cash, and trend data to suggest your next move.",
  ]);

  const quoteMap = useMemo(() => Object.fromEntries(quotes.map((q) => [q.symbol, q])), [quotes]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${WATCHLIST.join(",")}`
      );
      const data = await response.json();
      const nextQuotes: Quote[] = data?.quoteResponse?.result?.map((q: any) => ({
        symbol: q.symbol,
        regularMarketPrice: q.regularMarketPrice,
        regularMarketChangePercent: q.regularMarketChangePercent,
      })) ?? [];
      setQuotes(nextQuotes);
    } catch (error) {
      console.error("Quote fetch failed", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 15000);
    return () => clearInterval(interval);
  }, []);

  const portfolioValue = useMemo(() => {
    const holdingsValue = positions.reduce((sum, pos) => {
      const current = quoteMap[pos.symbol]?.regularMarketPrice ?? pos.avgCost;
      return sum + pos.shares * current;
    }, 0);
    return cash + holdingsValue;
  }, [cash, positions, quoteMap]);

  const executeTrade = (action: "BUY" | "SELL") => {
    const ticker = symbol.trim().toUpperCase();
    const qty = Number(shares);
    const price = quoteMap[ticker]?.regularMarketPrice;

    if (!ticker || !qty || qty <= 0 || !price) return;

    if (action === "BUY") {
      const totalCost = qty * price;
      if (totalCost > cash) return;
      setCash((prev) => prev - totalCost);
      setPositions((prev) => {
        const existing = prev.find((p) => p.symbol === ticker);
        if (!existing) return [...prev, { symbol: ticker, shares: qty, avgCost: price }];
        const newShares = existing.shares + qty;
        const newAvgCost = (existing.avgCost * existing.shares + totalCost) / newShares;
        return prev.map((p) =>
          p.symbol === ticker ? { ...p, shares: newShares, avgCost: newAvgCost } : p
        );
      });
    }

    if (action === "SELL") {
      const existing = positions.find((p) => p.symbol === ticker);
      if (!existing || existing.shares < qty) return;
      setCash((prev) => prev + qty * price);
      setPositions((prev) =>
        prev
          .map((p) =>
            p.symbol === ticker ? { ...p, shares: p.shares - qty } : p
          )
          .filter((p) => p.shares > 0)
      );
    }

    setTrades((prev) => [
      {
        id: `${Date.now()}`,
        action,
        symbol: ticker,
        shares: qty,
        price,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const generateCoachSuggestion = () => {
    const riskiest = positions
      .map((p) => {
        const quote = quoteMap[p.symbol];
        const pnl = quote ? (quote.regularMarketPrice - p.avgCost) / p.avgCost : 0;
        return { ...p, pnl, quote };
      })
      .sort((a, b) => a.pnl - b.pnl)[0];

    const bestMomentum = quotes.sort(
      (a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent
    )[0];

    const message = riskiest && riskiest.pnl < -0.04
      ? `AI Coach: ${riskiest.symbol} is down ${(riskiest.pnl * 100).toFixed(2)}% vs avg cost. Consider trimming risk or setting a stop in paper trading.`
      : bestMomentum
      ? `AI Coach: ${bestMomentum.symbol} has strongest momentum today (${bestMomentum.regularMarketChangePercent.toFixed(
          2
        )}%). If your strategy allows trend-following, consider a small starter position.`
      : "AI Coach: Keep a watchlist and only trade names with a clear thesis and risk limit.";

    setChatLog((prev) => [
      ...prev,
      `You: ${chatInput}`,
      message,
    ]);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Investment Practice Simulator</Text>
        <Text style={styles.subtitle}>Paper trading with live quotes, portfolio tracking, and AI coaching.</Text>

        <View style={styles.card}>
          <Text style={styles.metric}>Cash: ${cash.toFixed(2)}</Text>
          <Text style={styles.metric}>Portfolio Value: ${portfolioValue.toFixed(2)}</Text>
        </View>

        <Text style={styles.section}>Market Watch</Text>
        <FlatList
          data={quotes}
          horizontal
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <View style={styles.quoteChip}>
              <Text style={styles.quoteSymbol}>{item.symbol}</Text>
              <Text style={styles.quotePrice}>${item.regularMarketPrice?.toFixed(2)}</Text>
              <Text style={[styles.quoteChange, { color: item.regularMarketChangePercent >= 0 ? "#38d66b" : "#ff5a5a" }]}>
                {item.regularMarketChangePercent?.toFixed(2)}%
              </Text>
            </View>
          )}
        />

        <Text style={styles.section}>Place Paper Trade</Text>
        <View style={styles.tradeRow}>
          <TextInput value={symbol} onChangeText={setSymbol} style={styles.input} placeholder="Ticker" placeholderTextColor="#777" />
          <TextInput value={shares} onChangeText={setShares} style={styles.input} keyboardType="numeric" placeholder="Shares" placeholderTextColor="#777" />
        </View>
        <View style={styles.tradeRow}>
          <TouchableOpacity style={styles.buyButton} onPress={() => executeTrade("BUY")}><Text style={styles.buttonText}>Buy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.sellButton} onPress={() => executeTrade("SELL")}><Text style={styles.buttonText}>Sell</Text></TouchableOpacity>
        </View>

        <Text style={styles.section}>AI Coach Chat</Text>
        <View style={styles.chatBox}>
          {chatLog.slice(-6).map((line, idx) => (
            <Text key={`${line}-${idx}`} style={styles.chatText}>{line}</Text>
          ))}
        </View>
        <TextInput value={chatInput} onChangeText={setChatInput} style={styles.chatInput} placeholder="Ask for your next best move..." placeholderTextColor="#777" />
        <TouchableOpacity style={styles.askButton} onPress={generateCoachSuggestion}><Text style={styles.buttonText}>Get Suggestion</Text></TouchableOpacity>

        <Text style={styles.section}>Recent Trades</Text>
        {trades.slice(0, 8).map((t) => (
          <Text key={t.id} style={styles.tradeItem}>{t.action} {t.shares} {t.symbol} @ ${t.price.toFixed(2)} ({new Date(t.timestamp).toLocaleTimeString()})</Text>
        ))}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, paddingHorizontal: 16 },
  title: { color: "#fff", fontSize: 24, fontWeight: "700", marginTop: 6 },
  subtitle: { color: "#bbb", marginTop: 6, marginBottom: 14 },
  card: { backgroundColor: "#121212", padding: 14, borderRadius: 10, marginBottom: 12 },
  metric: { color: "#fff", fontSize: 16, marginBottom: 4 },
  section: { color: "#fff", fontSize: 18, fontWeight: "600", marginTop: 14, marginBottom: 10 },
  quoteChip: { backgroundColor: "#171717", padding: 10, borderRadius: 8, marginRight: 8, minWidth: 95 },
  quoteSymbol: { color: "#fff", fontWeight: "700" },
  quotePrice: { color: "#ddd" },
  quoteChange: { fontWeight: "700" },
  tradeRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  input: { flex: 1, backgroundColor: "#151515", color: "#fff", borderWidth: 1, borderColor: "#333", borderRadius: 8, padding: 10 },
  buyButton: { flex: 1, backgroundColor: "#22a046", padding: 12, borderRadius: 8, alignItems: "center" },
  sellButton: { flex: 1, backgroundColor: "#b83a3a", padding: 12, borderRadius: 8, alignItems: "center" },
  askButton: { backgroundColor: "#2e72ff", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "700" },
  chatBox: { backgroundColor: "#101010", borderRadius: 8, padding: 10, borderWidth: 1, borderColor: "#2c2c2c" },
  chatText: { color: "#d9d9d9", marginBottom: 6 },
  chatInput: { backgroundColor: "#151515", color: "#fff", borderWidth: 1, borderColor: "#333", borderRadius: 8, padding: 10, marginTop: 8 },
  tradeItem: { color: "#ddd", marginBottom: 6 },
});

export default InvestmentPracticeScreen;
