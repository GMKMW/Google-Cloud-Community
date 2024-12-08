import admin from 'firebase-admin';
import SERVICEACCOUNT from '../../../../GLOBALS/globals/google/_credentials/admin.mjs';
import FIRESDK from './index.mjs';

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export function START(data){

const {account=SERVICEACCOUNT,app='GBL',force} = data

try {

/////////////////////////////////////////////////////////////////////////////

//CHECK

try{

let hasApp = FIRESDK.APP[app]

if (hasApp){
console.warn(`APP ALREADY EXISTS: NAME ${app}`)

if (admin.app(app) && !force){
console.warn(`NO FORCE APPLIED`)
return
}

//FORCE
admin.app(app).delete().then(()=>{
console.log(`PREVIOUS APP RESET`)
})

}

} catch(error){}

/////////////////////////////////////////////////////////////////////////////

//INITIALIZE

admin.initializeApp({
credential: admin.credential.cert(account)
},app);

const ACCOUNT = account.client_email

console.log(`FIREBASE ADMIN SDK: NEW APP - NAME ${app}, ACCOUNT: ${ACCOUNT}`);

/////////////////////////////////////////////////////////////////////////////

//DATA

const APP = admin.app(app)
const AUTH = admin.auth(APP)
const DB = admin.firestore(APP)
const STORAGE = admin.storage(APP)

/////////////////////////////////////////////////////////////////////////////

//SETTINGS

DB.settings({ignoreUndefinedProperties:true})

/////////////////////////////////////////////////////////////////////////////

const APPDATA = {
APP,AUTH,STORAGE,ACCOUNT,
DB:{GBL:DB}
}

FIRESDK.APP[app] = APPDATA

console.log({app})

/////////////////////////////////////////////////////////////////////////////

} catch (error) {
console.error('FIREBASE ADMIN SDK ERROR:', error)
throw error;
}

}