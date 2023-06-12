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

		addCandidate(data) {
			const { addCandidateToDB } = useRealmApp();
			let obj = {};
			obj.candidate = {};
			obj.stages = {};
			obj.team = {};
			obj.owner = {};
			obj.candidate.name = `${data.first_name} ${data.last_name}`;
			obj.candidate.image =
				"https://cdn-icons-png.flaticon.com/128/1144/1144709.png";
			obj.team.self = data.designation;
			obj.team.name = data.team;
			obj.stages.state = "New Applied";
			obj.stages.value = 1;
			obj.stages.color = "bg-green-400";
			obj.owner.name = data.owner;
			obj.owner.image =
				"https://cdn-icons-png.flaticon.com/128/1144/1144709.png";
			obj.rating = 0;
			obj.appliedDate = new Date(data.applied_date);
			console.log(obj);

			this.candidatesData.push(obj);
			addCandidateToDB(obj);
			this.selectedCandidates = [];
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
