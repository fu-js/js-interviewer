interface PaginationProps {
	onNext: () => void; // Define the type of function or any specific type required
	onPrev: () => void;
	total: any; // Assuming total is a number
	page: any; // Assuming page is a number
}
  
  export default function Pagination({
	onNext,
	onPrev,
	total,
	page
  }: PaginationProps): JSX.Element {
	return (
	  <div className="flex justify-between items-center">
		{page > 1 && (
			<button
				className="px-4 py-2 rounded-lg border border-border text-border hover:bg-border hover:text-white"
				onClick={onPrev}
			>
				Prev
			</button>
		)}
		<div className="text-center">
		  {page}
		</div>
		<button
		  className="px-4 py-2 rounded-lg border border-border text-border hover:bg-border hover:text-white"
		  onClick={onNext}
		>
		  Next
		</button>
	  </div>
	)
  }
  