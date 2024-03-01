"use client";
import useRentModal from "@/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../Input/CategoryInput";
import CountrySelect from "../Input/CountrySelect";
import { categories } from "../navbar/Categories";
import { useForm } from "react-hook-form";
import formatedCountries from "@/hooks/useCountries";
import Counter from "../Input/Counter";
import dynamic from "next/dynamic";
import Input from "../Input";
import { useRouter } from "next/navigation";
import ImageUpload from "../Input/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
const STEPS = {
	CATEGORY: 0,
	LOCATION: 1,
	INFO: 2,
	IMAGES: 3,
	DESCRIPTION: 4,
	PRICE: 5,
};

function RentModal() {
	const country = formatedCountries;
	const [ isLoading, setIsLoading] = useState(false);
	const rentModal = useRentModal();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc")

	//we need to import Map in a different way

	const Mapv = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[location]
	);

	// react-hook setValue  doesn't rerender
	const setCustomValue = (id, value) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};
	const [step, setStep] = useState(STEPS.CATEGORY);

	const onBack = () => {
		setStep((prev) => prev - 1);
	};

	const onNext = () => {
		setStep((prev) => prev + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}

		return "Next";
	}, [step]);

	const SecondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return "Back";
	}, [step]);
const onSubmit = (data) => {
	if(step !== STEPS.PRICE) {
		return onNext()
	}

	setIsLoading(true);

	axios.post("/api/listings", data).then(() => {
		toast.success("Listing is created");

		router.refresh();
		//reset the entire form
		reset();
		setStep(STEPS.CATEGORY);
		rentModal.onClose()

	}).catch(() => {
		toast.error("Something went wrong in the rentModal while sending an axios post request")
	}).finally(() => {
		setIsLoading(false)
	})
}


	let bodyContent = (
		<div className=" flex flex-col gap-8 ">
			<Heading
				title="Which of these best describes your place? "
				subtitle="Pick a category"
			/>
			<div
				className=" grid grid-cols-1 
          md:grid-cols-2 
          gap-3
		  max-h-[30vh]
          md:max-h-[50vh]
          overflow-y-auto"
			>
				{categories.map((item) => (
					<div key={item.label} className=" ">
						<CategoryInput
							onClick={(category) => {
								setCustomValue("category", category);
							}}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		console.log(location?.latlang);
		bodyContent = (
			<div className=" flex flex-col gap-8">
				<Heading title="Where is your place?" subtitle="Help guests find you" />
				<CountrySelect
					value={location}
					onChange={(value) => setCustomValue("location", value)}
				/>
				<Mapv center={location?.latlang} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className=" flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenitis do you have?"
				/>

				<div className="md:max-h-max max-h-[30vh] grid col-span-1 gap-8 overflow-y-auto">
					<Counter
						onChange={(value) => setCustomValue("guestCount", value)}
						value={guestCount}
						title="Guests"
						subtitle="How many guests do you allow?"
					/>
					<hr />
					<Counter
						onChange={(value) => setCustomValue("roomCount", value)}
						value={roomCount}
						title="Rooms"
						subtitle="How many rooms do you have?"
					/>
					<hr />
					<Counter
						onChange={(value) => setCustomValue("bathroomCount", value)}
						value={bathroomCount}
						title="Bathrooms"
						subtitle="How many bathrooms do you have?"
					/>
				</div>
			</div>
		);
	}


	if(step === STEPS.IMAGES)  {
		bodyContent = (
			<div className=" flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subtitle="Show guests what your place looks like!"
				/>
				<ImageUpload value={imageSrc} onChange={(value) => setCustomValue("imageSrc", value)}/>
			</div>
		);
	}

	if(step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className=" flex flex-col gap-8">
				<Heading
					title="How would you describe your place?"
					subtitle="Short and sweet works best!"
				/>
				<Input
					id="title"
					label="Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Description"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	if(step === STEPS.PRICE) {
		 bodyContent = (
				<div className="flex flex-col gap-8">
					<Heading
						title="Now, set your price"
						subtitle="How much do you charge per night?"
					/>
					<Input
						id="price"
						label="Price"
						formatPrice
						type="number"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
					/>
				</div>
			);
	}

	return (
		<Modal
			title="Airbnb your home!"
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			actionLabel={actionLabel}
			SecondaryActionLabel={SecondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	);
}

export default RentModal;
