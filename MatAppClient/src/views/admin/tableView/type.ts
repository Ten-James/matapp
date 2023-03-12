export interface TableViewProps<T> {
  data: T[];
  getData: VoidFunction;
  displayName: string;
  showButtons?: boolean;
  additionalButtons?: React.ReactNode;
}
