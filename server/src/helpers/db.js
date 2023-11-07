const db = {
    buildOrQuery (fieldsToUpdate) {
        let orQuery = [];

        for (const key in fieldsToUpdate) {
            const obj = { 
                [key]: {
                    $ne: fieldsToUpdate[key]
                }
            };

            orQuery.push(obj);
        }

        return orQuery;
    }
};

export default db;
