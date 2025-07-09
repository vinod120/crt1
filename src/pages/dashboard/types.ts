export interface DashboardCardsProps {
  counts: any;
  countsLoading: boolean;
  selectedCard: number;
  setSelectedCard: (id: number) => void;
}
