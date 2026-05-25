// so-grid emits no custom events — this file holds prop union types for
// consumers who want to reference them in TypeScript.

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type GridMinColumnWidth = 'sm' | 'md' | 'lg';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'stretch';
