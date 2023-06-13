import { defineStore } from "pinia";

export const useCandidatesStore = defineStore("counter", {
	state: () => ({
		candidatesData: null,
		candidatesDataBackup: null,
		selectedCandidates: [],
	}),

	getters: {
		data: (state) => state.candidatesData,
	},

	actions: {
		async initData() {
			const { getCandidates } = useRealmApp();
			this.candidatesData = await getCandidates();
		},

		selectCandidate(id) {
			this.selectedCandidates.push(id);
		},

		unselectCandidate(id) {
			const index = this.selectedCandidates.indexOf(id);
			this.selectedCandidates.splice(index, 1);
		},

		findById(id) {
			let temp = this.candidatesData.find(
				(item) => item._id.toString() === id.toString()
			);
			console.log(temp);
			return temp;
		},

		async addCandidate(data) {
			const { addCandidateToDB } = useRealmApp();
			const { insertedId } = await addCandidateToDB(data);
			data._id = insertedId;
			this.candidatesData.push(data);
			this.selectedCandidates = [];
		},

		updateCandidate(data) {
			const { updateCandidateFromDB } = useRealmApp();
			const index = this.candidatesData.findIndex(
				(element) => data._id.toString() === element._id.toString()
			);
			console.log(data, this.selectedCandidates, index);
			this.candidatesData[index] = data;
			updateCandidateFromDB(data);
			this.selectedCandidates = [];
		},

		deleteCandidate() {
			const { deleteCandidateFromDB } = useRealmApp();

			this.selectedCandidates.forEach((id) => {
				const index = this.candidatesData.findIndex(
					(element) => id === element._id
				);
				this.candidatesData.splice(index, 1);
				deleteCandidateFromDB(id);
			});
			this.selectedCandidates = [];
		},

		sortByNameAtoZ() {
			this.candidatesData.sort((a, b) =>
				a.candidate.name.localeCompare(b.candidate.name)
			);
		},

		sortByNameZtoA() {
			this.candidatesData.sort((a, b) =>
				b.candidate.name.localeCompare(a.candidate.name)
			);
		},

		sortByRating1to5() {
			this.candidatesData.sort((a, b) => a.rating - b.rating);
		},

		sortByRating5to1() {
			this.candidatesData.sort((a, b) => b.rating - a.rating);
		},

		sortByDate1to12() {
			this.candidatesData.sort((a, b) => a.appliedDate - b.appliedDate);
		},

		sortByDate12to1() {
			this.candidatesData.sort((a, b) => b.appliedDate - a.appliedDate);
		},

		filterDataByField(cb) {
			this.candidatesData = this.candidatesData.filter(cb);
		},

		filterDataByText(keyword, operator, field) {
			const nestedKeys = field.split(".");

			this.filterDataByField((item) => {
				let fieldValue = item;
				// Traverse the nested keys to access the final value
				for (const key of nestedKeys) {
					if (fieldValue && fieldValue.hasOwnProperty(key)) {
						fieldValue = fieldValue[key];
					} else {
						fieldValue = undefined;
						break;
					}
				}

				// Perform the filtering based on the operator and keyword
				switch (operator) {
					case "is":
						return (
							fieldValue &&
							fieldValue.toLowerCase().includes(keyword.toLowerCase())
						);
					case "is-not":
						return (
							!fieldValue ||
							!fieldValue.toLowerCase().includes(keyword.toLowerCase())
						);
					default:
						return true; // No operator specified, return all data
				}
			});
		},

		filterDataByNum(inputNum, operator, field) {
			switch (operator) {
				case "eq":
					this.filterDataByField((item) => item[field] === inputNum);
					break;
				case "nt-eq":
					this.filterDataByField((item) => item[field] !== inputNum);
					break;
				case "lt":
					this.filterDataByField((item) => item[field] < inputNum);
					break;
				case "gt":
					this.filterDataByField((item) => item[field] > inputNum);
					break;
				case "le":
					this.filterDataByField((item) => item[field] <= inputNum);
					break;
				case "ge":
					this.filterDataByField((item) => item[field] >= inputNum);
					break;
			}
		},

		filterDataByDate(targetDate, operator, field) {
			switch (operator) {
				case "is":
					this.filterDataByField(
						(item) => item[field].getTime() === new Date(targetDate).getTime()
					);
					break;
				case "is-before":
					this.filterDataByField(
						(item) => item[field].getTime() < new Date(targetDate).getTime()
					);
					break;
				case "is-after":
					this.filterDataByField(
						(item) => item[field].getTime() > new Date(targetDate).getTime()
					);
					break;
				case "is-on-before":
					this.filterDataByField(
						(item) => item[field].getTime() <= new Date(targetDate).getTime()
					);
					break;
				case "is-on-after":
					this.filterDataByField(
						(item) => item[field].getTime() >= new Date(targetDate).getTime()
					);
					break;
			}
		},

		resetFilterFields() {
			this.initData();
		},
	},
});
