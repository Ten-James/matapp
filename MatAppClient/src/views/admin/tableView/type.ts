export interface TableViewProps<T> {
  data: T[];
  getData: (...args: any[]) => void;
  displayName: string;
  showButtons?: boolean;
  additionalButtons?: React.ReactNode;
}
