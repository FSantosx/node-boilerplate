const
firebase = require('firebase')
, firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

async function createDocument(collectionName, documento) {
    try {
        const docRef = await database.collection(collectionName).add(documento);
        console.log('Documento criado com ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao criar documento:', error);
        throw error;
    }
}

async function getDocument(collectionName, documentoId) {
    try {
        const docRef = await database.collection(collectionName).doc(documentoId).get();
        if (docRef.exists) {
            console.log('Documento encontrado:', docRef.data());
            return docRef.data();
        } else {
            console.log('Documento não encontrado!');
            return null;
        }
    } catch (error) {
        console.error('Erro ao obter documento:', error);
        throw error;
    }
}

async function getAllDocuments(collectionName) {
    try {
        const querySnapshot = await database.collection(collectionName).get();
        const documentos = [];

        querySnapshot.forEach((doc) => {
            documentos.push({ id: doc.id, ...doc.data() });
        });

        console.log('Documentos encontrados:', documentos);
        return documentos;
    } catch (error) {
        console.error('Erro ao obter documentos:', error);
        throw error;
    }
}

async function updateDocument(collectionName, documentoId, atualizacoes) {
    try {
        await database.collection(collectionName).doc(documentoId).update(atualizacoes);
        console.log('Documento atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar documento:', error);
        throw error;
    }
}

async function deleteDocument(collectionName, documentoId) {
    try {
        await database.collection(collectionName).doc(documentoId).delete();
        console.log('Documento excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir documento:', error);
        throw error;
    }
}

module.exports = {
    createDocument,
    getDocument,
    getAllDocuments, 
    updateDocument,
    deleteDocument,
};