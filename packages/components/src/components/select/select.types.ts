export type SelectChangeDetail = {
  value: string | string[];
  selectedOptions: { value: string; label: string }[];
};

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
