import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { useSubscriptionStore } from "@/lib/subscriptionStore";
import { formatCurrency } from "@/lib/utils";

const SafeAreaView = styled(RNSafeAreaView);

const Insights = () => {
    const { subscriptions } = useSubscriptionStore();

    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
    const pausedSubscriptions = subscriptions.filter(sub => sub.status === 'paused');
    const cancelledSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled');
    const totalSubscriptions = subscriptions.length;

    const monthlySpending = activeSubscriptions.reduce((total, sub) => {
        let monthlyPrice = sub.price;
        if (sub.billing?.toLowerCase() === 'yearly') {
            monthlyPrice = sub.price / 12;
        }
        return total + monthlyPrice;
    }, 0);

    const annualSpending = activeSubscriptions.reduce((total, sub) => {
        if (sub.billing?.toLowerCase() === 'yearly') {
            return total + sub.price;
        }
        return total + (sub.price * 12);
    }, 0);

    const categorySpending = activeSubscriptions.reduce((acc, sub) => {
        const category = sub.category || 'Other';
        let monthlyPrice = sub.price;
        if (sub.billing?.toLowerCase() === 'yearly') {
            monthlyPrice = sub.price / 12;
        }
        acc[category] = (acc[category] || 0) + monthlyPrice;
        return acc;
    }, {} as Record<string, number>);

    const sortedCategories = Object.entries(categorySpending).sort(([, a], [, b]) => b - a);

    const maxCategorySpend = sortedCategories.length > 0 
        ? Math.max(...sortedCategories.map(([, spend]) => spend)) 
        : 1;

    const getCategoryColor = (category: string): string => {
        switch (category) {
            case 'Design':
                return '#f5c542';
            case 'Developer Tools':
                return '#e8def8';
            case 'AI Tools':
                return '#b8d4e3';
            default:
                return '#3b82f6';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView 
                className="flex-1 p-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Text className="text-3xl font-sans-bold text-primary mb-6">Insights</Text>

                <View className="flex-row gap-4 mb-8">
                    <View className="flex-1 auth-card p-6">
                        <Text className="text-sm font-sans-medium text-muted-foreground">Monthly Spending</Text>
                        <Text className="text-3xl font-sans-bold text-primary mt-1">
                            {formatCurrency(monthlySpending)}
                        </Text>
                        <Text className="text-xs font-sans-medium text-muted-foreground mt-1">
                            ≈ {formatCurrency(annualSpending)} yearly
                        </Text>
                    </View>

                    <View className="flex-1 auth-card p-6">
                        <Text className="text-sm font-sans-medium text-muted-foreground">Active Subscriptions</Text>
                        <Text className="text-3xl font-sans-bold text-primary mt-1">
                            {activeSubscriptions.length}
                        </Text>
                        
                        <View className="mt-5 flex-row justify-between">
                            <View>
                                <Text className="text-xs font-sans-medium text-muted-foreground">Paused</Text>
                                <Text className="text-xl font-sans-semibold text-primary">
                                    {pausedSubscriptions.length}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-xs font-sans-medium text-muted-foreground">Cancelled</Text>
                                <Text className="text-xl font-sans-semibold text-primary">
                                    {cancelledSubscriptions.length}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-xs font-sans-medium text-muted-foreground">Total</Text>
                                <Text className="text-xl font-sans-semibold text-primary">
                                    {totalSubscriptions}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="auth-card p-6 mb-8">
                    <View className="flex-row justify-between items-center mb-5">
                        <Text className="text-base font-sans-semibold text-primary">Spending by Category</Text>
                        <Text className="text-sm font-sans-medium text-muted-foreground">Monthly</Text>
                    </View>

                    {sortedCategories.length > 0 ? (
                        sortedCategories.map(([category, spend]) => {
                            const percentage = Math.max(8, Math.round((spend / maxCategorySpend) * 100)); 
                            return (
                                <View key={category} className="mb-6 last:mb-0">
                                    {/* Label row */}
                                    <View className="flex-row justify-between mb-2">
                                        <Text className="font-sans-medium text-primary">{category}</Text>
                                        <Text className="font-sans-medium text-muted-foreground">
                                            {formatCurrency(spend)}
                                        </Text>
                                    </View>
                                    
                                    {/* Bar */}
                                    <View className="h-3 bg-card rounded-full overflow-hidden">
                                        <View
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: getCategoryColor(category),
                                            }}
                                            className="h-3 rounded-full"
                                        />
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <Text className="text-muted-foreground text-center py-8">
                            No active subscriptions to analyze yet.
                        </Text>
                    )}
                </View>

                {totalSubscriptions === 0 && (
                    <View className="items-center py-12">
                        <Text className="text-muted-foreground text-center text-lg">
                            Add some subscriptions to see rich insights and charts.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Insights;