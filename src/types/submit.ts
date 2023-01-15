export interface orgType {
  corname: string;
  cornumber: string;
  corporationid: string;
  corrole: string;
  cortype: string;
  corusercardid: string;
  corusername: string;
  pgname: string;
  name?: string;
  subname?: string;
}

export interface authCardType {
  division_code: string;
  expiry_date: string;
  holder_identity_num: string;
  holder_name: string;
  id_code: string;
  issue_date: string;
  issue_org_name: string;
  last_modification_time: string;
  last_modificator: string;
  license_code: string;
  license_item_code: string;
  license_status: string;
  license_type: string;
  name: string;
  subname: string;
  auth_code?: string;
}
