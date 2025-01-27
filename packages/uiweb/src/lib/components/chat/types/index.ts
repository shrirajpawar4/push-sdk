import { DropdownValueType } from '../reusables';

export interface GrouInfoType{
  groupName: string;
  groupDescription:string;
  groupImage:string;
  isPublic: boolean;
  members: string[];
  admins: string[];
}

export const TYPE = {
  PUSH: 'PUSH',
  GUILD: 'GUILD',
} as const;

export type TypeKeys = (typeof TYPE)[keyof typeof TYPE];

export const CATEGORY = {
  ERC20: 'ERC20',
  ERC721: 'ERC721',
  INVITE: 'INVITE',
  CustomEndpoint: 'CustomEndpoint',
  ROLES: 'ROLES',
} as const;

export const UNIT = {
  ERC20: 'TOKEN',
  ERC721: 'NFT',
} as const;
export type UnitKeys = (typeof UNIT)[keyof typeof UNIT];
export const SUBCATEGORY = {
  HOLDER: 'holder',
  OWENER: 'owner',
  //   INVITE: 'INVITE',
  GET: 'GET',
  DEFAULT: 'DEFAULT',
} as const;

export type ReadonlyInputType = {
    value: string;
    title: string;
  };
export type InputType =
  | DropdownValueType[]
  | ReadonlyInputType;
export type SubCategoryKeys = (typeof CATEGORY)[keyof typeof CATEGORY];

export type DropdownCategoryValuesType = {
  [key in TypeKeys]: InputType;
};

export type DropdownSubCategoryValuesType = {
  [key in SubCategoryKeys]: InputType;
};

export const TOKEN_NFT_COMPARISION = {
'>':'more than',
'>=': 'equal or more than',
'<': 'less than',
'<=': 'equal or less than',
'==': 'equal to',
'!=':'not equal to'
} as const;

export type TokenNftComparision = keyof typeof TOKEN_NFT_COMPARISION;

export const CRITERIA_TYPE = {
  ERC20:'Token',
  ERC721: 'NFT',
  INVITE: 'Invite',
  CustomEndpoint: 'URL',
  ROLES: 'Guild ID',
  } as const;
  
  export type CriteriaType = keyof typeof CRITERIA_TYPE;

export * from './tokenGatedGroupCreationType'