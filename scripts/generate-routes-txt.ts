import * as fs from 'fs';
import * as admin from 'firebase-admin';
var serviceAccount = require('./firebase-adminsdk.json');


async function main() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  let db = admin.firestore();

  const stream = fs.createWriteStream(__dirname + '/../pre-render-routes.txt');

  const categories = await db.collection('categories').get();
  for(const categoryDoc of categories.docs) {
    const category = categoryDoc.data();
    stream.write(category.code);
    stream.write('\n');
    await genereteArticleRoute(categoryDoc.id, category.code);
  }

  async function genereteArticleRoute(categoryId: string, categoryCode: string) {
    const articles = await db.collection('articles').where('categoryId', '==', categoryId).get();
    for(const doc of articles.docs) {
      const articleId = doc.id;
      stream.write(`${categoryCode}/${articleId}\n`);
    }
  }
}

(async () => { await main() })();