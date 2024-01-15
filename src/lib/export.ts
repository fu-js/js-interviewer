import * as XLSX from "xlsx";
import requestBackend from "./requestBackend";

const findMetadataByKey = (metadataArr: any, key: string) => {
	const found = metadataArr.find((data: any) => data.key === key);

	return found ? found.value : "";
};

export const exportPassCanidate = async (canidates: any) => {
	// const passedCanidate = canidates.filter((interviewee: any) => interviewee.decision === "PASS");
	const passedCanidate = canidates;
	const arr: any = [];

	for (const canidate of passedCanidate) {
		const { id, fullName, department, metadata, phoneNumber, decision } = canidate;
		const metadataArr = JSON.parse(metadata);

		const out: { [key: string]: any } = {
			id,
			fullName,
			department: department.name,
			phoneNumber,
			decision
		};

		for(const meta of metadataArr) {
			out[meta.title] = meta.content;
		}

		arr.push(out);

		// get notes
		const notesRes = await requestBackend(
			`/analysis/notes`,
			{
			  candidateId: canidate.id,
			},
			{ method: "GET" }
		  );

		  const notes = await notesRes.json();
		  const noteData = notes.data;

		  // concat notes to 1 string with \r\n as delimiter
		  out["notes"] = noteData.join("\r\n-----\r\n");
	}

	const ws = XLSX.utils.json_to_sheet(arr);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "passedCanidate");
	XLSX.writeFile(wb, "passedCanidate.xlsx");
}
