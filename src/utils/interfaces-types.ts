interface BaseBlob {
  id: string;

  data?: Blob;
}

export interface videoBlob extends BaseBlob {
  type: 'screen' | 'camera' | 'none';
  isDisabled?: boolean;
}
