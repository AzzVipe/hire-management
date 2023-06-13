<script setup>
	import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";

	const { data, headers, tableRowMap } = defineProps([
		"data",
		"headers",
		"tableRowMap",
	]);

	const store = useCandidatesStore();

	const isCandidateSelected = ref(false);

	// console.log(data.candidate.name);
	const rowData = {
		...data,
	};

	const { currCandidate, getCurrentCandInfo } = useCandidate();
	const { tableTdVisible } = useHideDropDown();

	const detailsHandler = (rowData) => {
		getCurrentCandInfo(rowData);
	};

	watch(isCandidateSelected, (newData, oldData) => {
		if (newData === true) store.selectCandidate(rowData._id);
		else store.unselectCandidate(rowData._id);
	});
</script>

<template>
	<td class="w-4 p-4 rounded-tl-md" scope="row">
		<div class="flex items-center">
			<input
				v-model="isCandidateSelected"
				:id="`checkbox-table-${rowData._id}`"
				type="checkbox"
				class="w-5 h-5 text-green-400 bg-gray-100 border-gray-300 focus:ring-white focus:ring-0" />
			<label :for="`checkbox-table-${rowData._id}`" class="sr-only"
				>checkbox</label
			>
		</div>
	</td>
	<td
		id="button-open"
		@click="detailsHandler(rowData)"
		scope="row"
		class="flex items-center px-3 py-5 text-gray-900 w-[170px] truncate">
		<img
			class="w-10 h-10 rounded-full object-cover"
			:src="rowData.candidate.image"
			alt="Jese image" />

		<p class="pl-3 truncate">{{ rowData.candidate.name }}</p>
	</td>
	<template v-for="(header, i) in headers" :key="i">
		<td v-if="tableTdVisible[tableRowMap.get(header.name).visilibility]">
			<component
				:is="tableRowMap.get(header.name)?.component"
				:content="rowData[tableRowMap.get(header.name).property]">
			</component>
		</td>
	</template>
	<td class="px-3 py-4 rounded-tr-md">
		<button
			:id="`candidatesMenuDropdownButton-${rowData._id}`"
			:data-dropdown-toggle="`candidatesMenuDropdown-${rowData._id}`"
			data-dropdown-placement="left"
			data-dropdown-offset-skidding="20"
			class="hover:bg-gray-300 rounded-full p-1">
			<EllipsisHorizontalIcon class="w-6 h-6" />
		</button>
		<CandidatesMenu :id="rowData._id" />
	</td>
</template>
