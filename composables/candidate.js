import p1 from "@/assets/images/pp-1.jpg";
import p2 from "@/assets/images/pp-2.jpg";
import p3 from "@/assets/images/pp-3.jpg";
import p4 from "@/assets/images/pp-4.jpg";
import p5 from "@/assets/images/pp-5.jpg";

export const useTableData = () => {
	const TABLE_DUMMY_DATA = ref(null);
	const DUMMY_DATA = useState("candidate", () => {});

	const setData = (data) => {
		TABLE_DUMMY_DATA.value = JSON.parse(JSON.stringify(data));
		DUMMY_DATA.value = JSON.parse(JSON.stringify(data));
		console.log(DUMMY_DATA.value, data);
	};

	// FILTERING
	const filterDataByField = (DUMMY_DATA, cb) => {
		DUMMY_DATA.value = TABLE_DUMMY_DATA.value.filter(cb);
	};

	const filterDataByText = (keyword, operator, field) => {
		const nestedKeys = field.split(".");

		filterDataByField((item) => {
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
	};

	// const filterDataByText = (keyword, operator, field) => {
	//   const [key, nestedKey] = field.split('.');

	//   switch (operator) {
	//     case 'is':
	//       filterDataByField((item) =>
	//         item[key][nestedKey].toLowerCase().includes(keyword.toLowerCase())
	//       );
	//       break;
	//     case 'is-not':
	//       filterDataByField(
	//         (item) =>
	//           !item[key][nestedKey].toLowerCase().includes(keyword.toLowerCase())
	//       );
	//       break;
	//   }
	// };

	const filterDataByNum = (inputNum, operator, field) => {
		switch (operator) {
			case "eq":
				filterDataByField((item) => item[field] === inputNum);
				break;
			case "nt-eq":
				filterDataByField((item) => item[field] !== inputNum);
				break;
			case "lt":
				filterDataByField((item) => item[field] < inputNum);
				break;
			case "gt":
				filterDataByField((item) => item[field] > inputNum);
				break;
			case "le":
				filterDataByField((item) => item[field] <= inputNum);
				break;
			case "ge":
				filterDataByField((item) => item[field] >= inputNum);
				break;
		}
	};

	const filterDataByDate = (targetDate, operator, field) => {
		switch (operator) {
			case "is":
				filterDataByField(
					(item) => item[field].getTime() === new Date(targetDate).getTime()
				);
				break;
			case "is-before":
				filterDataByField(
					(item) => item[field].getTime() < new Date(targetDate).getTime()
				);
				break;
			case "is-after":
				filterDataByField(
					(item) => item[field].getTime() > new Date(targetDate).getTime()
				);
				break;
			case "is-on-before":
				filterDataByField(
					(item) => item[field].getTime() <= new Date(targetDate).getTime()
				);
				break;
			case "is-on-after":
				filterDataByField(
					(item) => item[field].getTime() >= new Date(targetDate).getTime()
				);
				break;
		}
	};

	const resetFilterFields = () => {
		DUMMY_DATA.value = TABLE_DUMMY_DATA.value;
	};

	return {
		setData,
		DUMMY_DATA,
		filterDataByText,
		filterDataByNum,
		filterDataByDate,
		resetFilterFields,
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
