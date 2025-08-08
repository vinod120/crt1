export interface DashboardCardsProps {
  counts?: Record<string, number>;
  countsLoading: boolean;
  selectedCard?: string;
  setSelectedCard?: (key: string) => void;
}