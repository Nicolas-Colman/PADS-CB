import { firestore, auth } from '../../firebase';

export const buscarDadosUsuario = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado');

  const userDoc = await firestore.collection("/Perfil/ClienteDoc/Cliente").doc(uid).get();

  if (!userDoc.exists) throw new Error('Usuário não encontrado');

  return userDoc.data(); // retorna o objeto com nome, foto, etc.
};