We create a friendly function of the Firebase Admin SDK that allows us to freely navigate between databases and service accounts. Since the imports are modular, the global namespace allows us to freely access the object that is our various apps and databases. 

EXAMPLES:

var ProfileDoc = await FDB({db:'abc',path:`${path}/profiles/account`}).get()

var AuthCollection = FDB({db:'xyz',path:'firewall'})

var Query = await FDB({})
.where('userId','==',userId)
.get()

Note the FDB is synchronous, so the await applies to the get(), since we have a document or collection reference.
Note that passing no parameters to FDB returns the default firestore.
