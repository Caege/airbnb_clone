"use client";
import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
function Search() {
	const searchModal = useSearchModal();

	const params = useSearchParams();
  const { getByValue } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue )?.label;
    }

    return 'Anywhere';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate );
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);
	return (
		<div
			className=" border-[1px] sm:w-auto w-full  py-2 rounded-full"
			onClick={searchModal.onOpen}
		>
			<div className=" flex flex-row items-center justify-between ">
				<div className="md:px-6 pl-[10px] pr-[0px] shrink"> {locationLabel}</div>
				<div className=" border-x-[1px]  text-center px-6 sm:block text-sm hidden ">
					{durationLabel}
				</div>
				<div
					className=" flex flex-row items-center gap-2  pl-6 text-sm  
            pr-2  "
				>
					<div className="hidden sm:block">{guestLabel}</div>
					<div className=" bg-rose-500 rounded-full text-white p-2 shrink-0">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
