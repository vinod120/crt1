export interface DashboardCardsProps {
  counts?: Record<string, number>;
  countsLoading: boolean;
  selectedCard?: string | null;
  setSelectedCard?: (key: string) => void;
}