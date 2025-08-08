export interface DashboardCardsProps {
  counts?: Record<string, number>;
  countsLoading: boolean;
  selectedCard?: number;
  setSelectedCard?: (key: number) => void;
}