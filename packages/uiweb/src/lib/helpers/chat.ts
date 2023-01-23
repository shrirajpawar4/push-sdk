import * as PushAPI from '@pushprotocol/restapi';
import { Constants } from '../config';
import { AccountEnvOptionsType, IMessageIPFS } from '../types';
import { IConnectedUser } from '@pushprotocol/restapi';

type HandleOnChatIconClickProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

type GetChatsType = {
  pgpPrivateKey: string;
  supportAddress: string;
  limit: number;
  threadHash?: string;
} & AccountEnvOptionsType;

type GetSendMessageEventDataType = {
  connectedUser: IConnectedUser;
  supportAddress: string;
  message: string;
  messageType: string;
  env: string;
};

type GetSendMessageEventDataReturnType = {
  eventName: string;
  body: PushAPI.chat.ISendMessagePayload;
};
export const handleOnChatIconClick = ({
  isModalOpen,
  setIsModalOpen,
}: HandleOnChatIconClickProps) => {
  setIsModalOpen(!isModalOpen);
};

export const createUserIfNecessary = async (
  options: AccountEnvOptionsType
): Promise<IConnectedUser> => {
  const { account, env = Constants.ENV.PROD } = options || {};
  let connectedUser = await PushAPI.user.get({ account: account, env });
  if (!connectedUser?.encryptedPrivateKey) {
    connectedUser = await PushAPI.user.create({ account: account, env });
  }
  const decryptedPrivateKey = await PushAPI.chat.decryptWithWalletRPCMethod(
    connectedUser.encryptedPrivateKey,
    account
  );
  return { ...connectedUser, privateKey: decryptedPrivateKey };
};

type GetChatsResponseType = {
  chatsResponse: IMessageIPFS[];
  lastThreadHash: string | null;
  lastListPresent: boolean;
};

export const getChats = async (
  options: GetChatsType
): Promise<GetChatsResponseType> => {
  const {
    account,
    pgpPrivateKey,
    supportAddress,
    threadHash = null,
    limit = 40,
    env = Constants.ENV.PROD,
  } = options || {};
  let threadhash: any = threadHash;
  if (!threadhash) {
    threadhash = await PushAPI.chat.conversationHash({
      account: account,
      conversationId: supportAddress,
      env,
    });
    threadhash = threadhash.threadHash;
  }
  if (threadhash) {
    const chats = await PushAPI.chat.history({
      account: account,
      pgpPrivateKey: pgpPrivateKey,
      threadhash: threadhash,
      limit: limit,
      env,
    });

    const lastThreadHash = chats[chats.length - 1]?.link;
    const lastListPresent = chats.length > 0 ? true : false;
    return { chatsResponse: chats, lastThreadHash, lastListPresent };
  }
  return { chatsResponse: [], lastThreadHash: null, lastListPresent: false };
};

type DecrypteChatType = {
  message: IMessageIPFS,
  connectedUser: IConnectedUser,
  env: string
}
export const decryptChat = async (
  options: DecrypteChatType
):Promise<IMessageIPFS> => {
  const {
    message,
    connectedUser,
    env = Constants.ENV.PROD,
  } = options || {};
  const decryptedChat:IMessageIPFS[] = await PushAPI.chat.decryptConversation({
    messages: [message],
    connectedUser,
    toDecrypt: true,
    pgpPrivateKey: connectedUser.privateKey!,
    env,
  });
  return decryptedChat[0];
};

export const copyToClipboard = (address: string): void => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(address);
  } else {
    const el = document.createElement('textarea');
    el.value = address;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
};

export const getSendMessageEventData = async (
  options: GetSendMessageEventDataType
): Promise<GetSendMessageEventDataReturnType> => {
  const { connectedUser, supportAddress, message, messageType, env } =
    options || {};

  const body: PushAPI.chat.ISendMessagePayload =
    (await PushAPI.chat.sendMessagePayload(
      supportAddress,
      connectedUser,
      message,
      'Text',
      env
    )) || {};
  const conversationResponse: any = await PushAPI.chat.conversationHash({
    conversationId: supportAddress,
    account: connectedUser.wallets.split(',')[0],
    env,
  });
  if (!conversationResponse?.threadHash) {
    return { eventName: 'CREATE_INTENT', body: body };
  } else {
    return { eventName: 'CHAT_SEND', body: body };
  }
};