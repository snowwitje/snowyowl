export type TagVariant = 'read-only' | 'dismissible' | 'selectable' | 'operational';

export type TagColor =
  | 'neutral'
  | 'mauve'
  | 'sand'
  | 'green'
  | 'red'
  | 'orange'
  | 'teal'
  | 'blue'
  | 'purple'
  | 'custom';

export type TagDismissDetail = {
  label: string;
};

export type TagSelectDetail = {
  selected: boolean;
  label: string;
};

export type TagClickDetail = {
  label: string;
};
