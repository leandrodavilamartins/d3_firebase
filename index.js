const data = [];

db.collection('countries').get().then(res => {
    res.docs.forEach(doc => {
        console.log(doc.data());
    })
}) 