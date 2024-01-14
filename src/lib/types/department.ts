enum Department {
	'CHUYEN MON' = 1,
	'VAN HOA' = 2,
	'DOI NGOAI' = 3,
	'TRUYEN THONG' = 4,
	'NOI DUNG' = 5,
}

export const getAllDepartmentName = () => {
	return Object.keys(Department).filter((k) => isNaN(Number(k)));
};

export default Department;
  