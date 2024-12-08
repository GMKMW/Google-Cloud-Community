import { getFirestore } from 'firebase-admin/firestore';
import FIRESDK from './index.mjs';

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export function GET(data){
console.log(`FIRESDK GET`)

const {db} = data

let response

if (db){
response = GetFirestore(data)
}

return response

}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

export async function GetFirestore(data){
console.log(`GetFirestore`)

const {db='GBL',app='GBL'} = data

const hasDatabase = FIRESDK.APP[app].DB[db]
if (hasDatabase){return hasDatabase}

const newDatabase = getFirestore(FIRESDK.APP[app].APP,db)
FIRESDK.APP[app].DB[db] = newDatabase

return newDatabase

}