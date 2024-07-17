const Models = require('../../../schema/main/models');

exports.uploadFile = async (data) => {
  let file = await Models.file.create(data);
  return { file_id: file.id };
}
exports.createContacts = async (id, data) => {
  if (data?.length > 0) {
    let contacts = [];
    for (let i = 0; i < data.length; i++) {
      data[i].client_id = id;
      if (data[i].file_id) {
        let file = await Models.file.findByPk(data[i].file_id);
        let contact = await Models.contact.findByPk(data[i].id);
        if (!contact) {
          contact = await Models.contact.create(data[i]);
        } else {
          await contact.update(data[i]);
        }
        if (file) {
          await contact.addFile(file);
        }
      } else {
        contacts.push(data[i]);
      }
    }
    await Models.contact.bulkCreate(contacts, { ignoreDuplicates: true, include: [] });

  }
  return { message: "success" }

}

exports.createChats = async (id, data) => {
  if (data?.length > 0) {
    let chats = [];
    for (let i = 0; i < data.length; i++) {
      data[i].client_id = id;
      if (data[i].file_id) {
        let file = await Models.file.findByPk(data[i].file_id);
        let chat = await Models.chat.findByPk(data[i].id);
        if (!chat) {
          chat = await Models.chat.create(data[i]);
        } else {
          await chat.update(data[i]);
        }
        if (file) {
          await chat.addFile(file);
        }
      } else {
        chats.push(data[i]);
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

exports.createMessages = async (id, data)=>{
  let client = await getClient(id);
  let chat_id = data.chat_id;
  let messages = data.messages;
  if(messages?.length > 0){
    for(let i=0; i < messages.length; i++){
      let message = messages[i];
      messages[i].chat_id = chat_id;
      messages[i].client_id = client.id;
      messages[i].date = new Date(messages[i].date)
      if(message.writer){
        let writer = await Models.chat.findByPk(message.writer.id);
        if(!writer){
           writer = await Models.chat.create(message.writer);
        }
        messages[i].writer_id = writer.id;
      }
      
    }
   await Models.message.bulkCreate(messages,{ignoreDuplicates: true});

  }

  return {message: "success"}
}


async function getClient(id){
  let client = await Models.client.findByPk(id);
  if (!client) {
    let err = new Error('client not found');
    throw (err);
  }
  return client;
}