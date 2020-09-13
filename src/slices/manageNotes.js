import firebase from './../develop';

export const fetchNotes = async () => {
  const db = firebase.firestore();
  const data = await db.collection('notes').orderBy('createdAt', 'desc').limit(10).get();
  const fetchedData = data.docs.map((doc) => {
    return doc.data();
  });
  return fetchedData;
};

export const fetchNoteById = async (id) => {
  const db = firebase.firestore();
  const data = await db.collection('notes').where('id', '==', id).get();
  const fetchedData = data.docs.map((doc) => {
    return doc.data();
  });
  return fetchedData;
};

export const addNote = (note) => {
  firebase
    .firestore()
    .collection('notes')
    .add({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((note) => {
      console.log('Document has been written with Id: ', note.id);
      return 'Document has been added!';
    })
    .catch((err) => {
      console.error('Error adding document: ', err);
    });
};

export const deleteNoteById = (id) => {
  firebase
    .firestore()
    .collection('notes')
    .where('id', '==', id)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
        console.log('Document successfully deleted');
      });
    })
    .catch((err) => console.error("Document couldn't be removed: ", err));
};

export const updateNoteById = (id, title, content) => {
  firebase
    .firestore()
    .collection('notes')
    .where('id', '==', id)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.update({
          title,
          content,
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        });
        console.log('Document successfully updated!');
      });
    })
    .catch((err) => console.error("Document couldn't be updated: ", err));
};
