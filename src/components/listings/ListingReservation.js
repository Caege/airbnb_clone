import React from "react";
import Calender from "../Input/Calender";
import Button from "../Button";
function ListingReservation({
	price,
	dateRange,
	totalPrice,
	onChangeDate,
	onSubmit,
	disabled,
	disabledDates,
}) {
	return (
		<div className=" bg-white rounded-xl border border-neutral-200 overflow-hidden w-full">
			<div className=" flex items-center gap-1 p-4 w-full">
				<div className=" text-2xl font-semibold">$ {price} </div>
				<div className=" font-light text-neutral-600">night</div>
			</div>
			<hr />

			<Calender
				value={dateRange}
				disabledDates={disabledDates}
				onChange={(value) => {
					console.log("this is the calender component", value);
					return onChangeDate(value.selection);
				}}
			/>
			<hr />
			<div className=" p-4">
				<Button disabled={disabled} label="Reserve" onClick={onSubmit} />
			</div>
            <div className=" p-4 flex items-center justify-between font-semibold text-lg">
<div>
    Total
</div> 
<div>
    $ {totalPrice}
</div>
            </div>
		</div>
	);
}

export default ListingReservation;
