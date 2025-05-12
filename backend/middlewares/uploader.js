import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const KEYFILEPATH = process.env.KEYFILEPATH; 
const SCOPES = process.env.SCOPES;
const FOLDER_ID =process.env.FOLDER_ID; // ID of your `cover_images` folder

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export const uploadToDrive = async (file) => {
  const fileMetadata = {
    name: file.originalname,
    parents: [FOLDER_ID],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });

  // Make the file public
  await drive.permissions.create({
    fileId: response.data.id,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  //const publicUrl = `https://drive.google.com/uc?id=${response.data.id}`;
  const publicUrl = `https://lh3.googleusercontent.com/d/${response.data.id}=w1000`;

  fs.unlinkSync(file.path); // delete local copy

  return publicUrl;
};
