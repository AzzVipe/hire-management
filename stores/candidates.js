import { defineStore } from "pinia";

export const useCandidatesStore = defineStore("counter", {
	state: () => ({
		candidatesData: null,
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
			let temp = this.candidatesData.find((item) => item._id === id);
			console.log(temp);
			return temp;
		},

		addCandidate(data) {
			const { addCandidateToDB } = useRealmApp();
			this.candidatesData.push(data);
			addCandidateToDB(data);
			this.selectedCandidates = [];
		},

		updateCandidate(data) {
			const { updateCandidateFromDB } = useRealmApp();
			const index = this.candidatesData.findIndex(
				(element) => data._id.toString() === element._id.toString()
			);
			console.log(data, this.selectedCandidates, index);
			this.candidatesData[index] = data;
			this.selectedCandidates = [];
			updateCandidateFromDB(data);
		},

		deleteCandidate() {
			const { deleteCandidateFromDB } = useRealmApp();

			this.selectedCandidates.forEach((id) => {
				const index = this.candidatesData.findIndex(
					(element) => id === element._id
				);
				this.candidatesData.splice(index - 1, 1);
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
	},
});
