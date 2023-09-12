db = db.getSiblingDB("dbtask");

db.createUser({
    user: "userTask",
    pwd: "T4sk1234",
    roles: [{
        role: "readWrite",
        db: "dbtask"
    }]
});