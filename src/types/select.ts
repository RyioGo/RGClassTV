/* eslint-disable @typescript-eslint/no-explicit-any */
export interface selectDataType<T> {
  flowName: string;
  data: Array<T>;
  serviceObj: string;
  isOneForm: string;
  formId: string | (string | null)[];
}

export interface selectDataItemType<T> {
  items: Array<T>;
  must: string;
  num: string;
  order: number;
  statusId: string;
  statusMode: string;
  statusName: string;
  select?: string | Array<string>;
}

export interface itemsType {
  itemCase: string;
  itemCode: string;
  itemId: string;
  itemName: string;
  itemType: string;
  orgCode: string;
  orgName: string;
  pushUrl: string;
  resultName: string;
}

export interface detailType {
  flowId: string;
  flowName: string;
  formId: string;
  itemArray: Array<itemArrayType>;
  serviceObj: string;
}

export interface itemArrayType {
  condition: Array<conditionType>;
  resourceArray: Array<resourceArrayType>;
  itemCode: string;
  itemId: string;
  itemName: string;
  itemServiceType: string;
  limitTime: number;
  limitType: string;
  orgCode: string;
  orgName: string;
  passType: string;
  resultName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AuthCath?: any;
}

export interface conditionType {
  name: string;
}

export interface resourceArrayType {
  must: string;
  resourceCode: string;
  resourceName: string;
  resourceType: string;
  typeValue: string;
  uploadFile?: Array<uploadFileType>;
  licenceCode: string;
  licenceName: string;
}

export interface uploadFileType {
  content?: string;
  status: string;
  message: string;
  data: any;
  file?: File;
}
