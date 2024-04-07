

app.get('/api/data', async (req, res) => {
    const collection = client.db("StudentManagementSystem").collection("Students");
    const data = await collection.find({}).toArray();
    res.json(data);
});
