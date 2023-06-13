<template>
	<div
		v-if="candidateData"
		id="updateCandidate"
		tabindex="-1"
		aria-hidden="true"
		class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<!-- Modal content -->
			<div
				class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
				<!-- Modal header -->
				<div
					class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						Edit Candidate
					</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="updateCandidate">
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"></path>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<form
					id="update-candidate-form"
					action="#"
					@submit.prevent="updateCandidateHandler()">
					<div class="grid gap-4 mb-8 sm:grid-cols-2">
						<div>
							<label
								for="add-first-name"
								class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
								>First name</label
							>
							<input
								v-model="candidateData.candidate.firstName"
								type="text"
								name="add-first-name"
								id="add-first-name"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="First name"
								required />
						</div>
						<div>
							<label
								for="add-last-name"
								class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
								>Last name</label
							>
							<input
								v-model="candidateData.candidate.lastName"
								type="text"
								name="add-last-name"
								id="add-last-name"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Last name"
								required />
						</div>
						<div>
							<label
								for="add-applied-date"
								class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
								>Date applied</label
							>
							<input
								v-model="candidateData.appliedDate"
								type="date"
								name="add-applied-date"
								id="add-applied-date"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								required />
						</div>

						<div>
							<label
								for="add-designation"
								class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
								>Designation</label
							>
							<select
								v-model="candidateData.team.self"
								required
								id="add-designation"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
								<option value="" disabled>Select designation</option>
								<option value="Junior UI Designer">Junior UI Designer</option>
								<option value="Junior UX Designer">Junior UX Designer</option>
								<option value="UX Researcher">UX Researcher</option>
							</select>
						</div>
						<div>
							<label
								for="add-team"
								class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
								>Team</label
							>
							<select
								v-model="candidateData.team.name"
								required
								id="add-team"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
								<option value="" disabled>Select team</option>
								<option value="Design Team">Design Team</option>
								<option value="Developer Team">Developer Team</option>
								<option value="Development Team">Development Team</option>
							</select>
						</div>
						<div>
							<label
								for="add-owner"
								class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
								>Owner</label
							>
							<select
								v-model="candidateData.owner.name"
								required
								id="add-owner"
								placeholder="Select owner"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
								<option value="" disabled>Select owner</option>
								<option value="Kristin Watson">Kristin Watson</option>
								<option value="Albert Flores">Albert Flores</option>
								<option value="Dianne Russell">Dianne Russell</option>
							</select>
						</div>
					</div>
					<button
						@click="updateCandidateHandler()"
						type="submit"
						data-modal-toggle="updateCandidate"
						class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
						Update candidate
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { initModals } from "flowbite";
	import { BSON } from "realm-web";

	const { data } = defineProps(["data"]);
	const candidateData = ref(null);

	const emit = defineEmits(["updateCandidate"]);

	onBeforeMount(() => {
		candidateData.value = JSON.parse(JSON.stringify(data));
		let name = data.candidate.name.split(" ");
		candidateData.value.candidate.firstName = name[0];
		candidateData.value.candidate.lastName = name[1];
		candidateData.value._id = BSON.ObjectID(candidateData.value._id);
		// candidateData.value.appliedDate = new Date(candidateData.value.appliedDate);
		let tempDate = new Date(candidateData.value.appliedDate);

		let date = tempDate.getDate();
		if (date < 10) {
			date = date.toString().padStart(2, "0");
		}

		let month = tempDate.getMonth() + 1;
		if (month < 10) {
			month = month.toString().padStart(2, "0");
		}

		let year = tempDate.getFullYear();

		candidateData.value.appliedDate = [year, month, date].join("-");
	});

	onMounted(() => {
		initModals();
	});

	const updateCandidateHandler = () => {
		// @TODO: Check if data is empty
		candidateData.value.candidate.name = `${candidateData.value.candidate.firstName} ${candidateData.value.candidate.lastName}`;

		console.log("test", candidateData.value);
		emit("updateCandidate", candidateData.value);
	};
</script>

<style lang="scss" scoped></style>
