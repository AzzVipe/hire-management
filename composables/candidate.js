import p1 from "@/assets/images/pp-1.jpg";
import p2 from "@/assets/images/pp-2.jpg";
import p3 from "@/assets/images/pp-3.jpg";
import p4 from "@/assets/images/pp-4.jpg";
import p5 from "@/assets/images/pp-5.jpg";

export const useTableData = () => {
	const TABLE_DUMMY_DATA = ref(null);
	const DUMMY_DATA = useState("candidate", () => {});

	// IGNORE THIS
	const setData = (data) => {
		TABLE_DUMMY_DATA.value = JSON.parse(JSON.stringify(data));
		DUMMY_DATA.value = JSON.parse(JSON.stringify(data));
		console.log(DUMMY_DATA.value, data);
	};

	return {
		setData,
		DUMMY_DATA,
	};
};

export const useCandidate = () => {
	const currCandidate = useState("candidate", () => {});

	const getCurrentCandInfo = (info) => {
		currCandidate.value = info;
	};

	return { currCandidate, getCurrentCandInfo };
};

export const useHideDropDown = () => {
	const tableTdVisible = useState("tableTdVisible", () => {
		const isVisible = {
			isRatingVisible: true,
			isStagesVisible: true,
			isTeamVisible: true,
			isDateVisible: true,
			isOwnerVisible: true,
		};

		return isVisible;
	});

	const tdToggle = (state) => {
		tableTdVisible.value.isRatingVisible = state;
		tableTdVisible.value.isStagesVisible = state;
		tableTdVisible.value.isTeamVisible = state;
		tableTdVisible.value.isDateVisible = state;
		tableTdVisible.value.isOwnerVisible = state;
	};

	const showAllTableTd = () => {
		tdToggle(true);
	};

	const hideAllTableTd = () => {
		tdToggle(false);
	};

	return { tableTdVisible, showAllTableTd, hideAllTableTd };
};
