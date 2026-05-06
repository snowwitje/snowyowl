export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export type ModalOpenDetail = Record<string, never>;

export type ModalCloseDetail = {
  reason: 'close-button' | 'backdrop' | 'escape' | 'programmatic';
};

export type ModalRequestCloseDetail = {
  reason: 'close-button' | 'backdrop' | 'escape';
};
