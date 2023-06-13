import * as Realm from "realm-web";

export const useRealmApp = () => {
	const appId = useRuntimeConfig().public.APP_ID;

	const app = new Realm.App({
		id: appId,
	});

	let currentUser = app.currentUser;

	const loginApiKey = async () => {
		const apiKey = useRuntimeConfig().public.USER_API_KEY;
		const credentials = Realm.Credentials.apiKey(apiKey);

		return await app.logIn(credentials);
	};

	if (currentUser === null) {
		currentUser = loginApiKey();
	}

	async function getCandidates() {
		if (currentUser === null) return null;

		const mongo = currentUser.mongoClient("mongodb-atlas");
		const collection = mongo.db("db1").collection("candidates");

		let result;

		await collection.find({}).then((data) => {
			console.log(data);
			result = data;
		});

		return result;
	}

	async function addCandidateToDB(candidate) {
		if (currentUser === null) return null;

		const mongo = currentUser.mongoClient("mongodb-atlas");
		const collection = mongo.db("db1").collection("candidates");

		let result;

		await collection.insertOne(candidate).then((data) => {
			console.log(data);
			result = data;
		});

		return result;
	}

	async function updateCandidateFromDB(candidate) {
		if (currentUser === null) return null;

		const mongo = currentUser.mongoClient("mongodb-atlas");
		const collection = mongo.db("db1").collection("candidates");

		let result;

		await collection
			.updateOne({ _id: candidate._id }, candidate)
			.then((data) => {
				console.log(data);
				result = data;
			});

		return result;
	}

	async function deleteCandidateFromDB(id) {
		if (currentUser === null) return null;

		const mongo = currentUser.mongoClient("mongodb-atlas");
		const collection = mongo.db("db1").collection("candidates");

		let result;

		await collection.deleteOne({ _id: id }).then((data) => {
			console.log(data);
			result = data;
		});

		return result;
	}

	return {
		app,
		Realm,
		currentUser,
		loginApiKey,
		getCandidates,
		addCandidateToDB,
		updateCandidateFromDB,
		deleteCandidateFromDB,
	};
};
