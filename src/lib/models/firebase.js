// Importar o pacote do Firebase
const firebase = require('firebase');

// Configurar as informações de configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
};

// Inicializar o aplicativo do Firebase
firebase.initializeApp(firebaseConfig);

// Obter uma referência para o banco de dados do Firebase
const database = firebase.firestore();

// Função para obter todos os documentos em uma coleção
async function obterTodosDocumentos() {
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

// Função para criar um novo documento
async function criarDocumento(documento) {
  try {
    const docRef = await database.collection(collectionName).add(documento);
    console.log('Documento criado com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    throw error;
  }
}

// Função para obter um documento pelo ID
async function obterDocumento(documentoId) {
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

// Função para atualizar um documento existente
async function atualizarDocumento(documentoId, atualizacoes) {
  try {
    await database.collection(collectionName).doc(documentoId).update(atualizacoes);
    console.log('Documento atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    throw error;
  }
}

// Função para excluir um documento existente
async function excluirDocumento(documentoId) {
  try {
    await database.collection(collectionName).doc(documentoId).delete();
    console.log('Documento excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    throw error;
  }
}

module.exports = {
  criarDocumento,
  obterDocumento,
  atualizarDocumento,
  excluirDocumento,
  obterTodosDocumentos
};